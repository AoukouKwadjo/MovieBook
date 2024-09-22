from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.permissions import AllowAny
from .models import Movie, Playlist, LikedMovie, Genre, Theme
from .serializers import MovieSerializer, PlaylistSerializer, LikedMovieSerializer, GenreSerializer, ThemeSerializer
from .tmdb_service import TMDBService
import telegram
import logging

logger = logging.getLogger(__name__)



class ObtainAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key}, status=status.HTTP_200_OK)


class MovieDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):

        movie_id = request.query_params.get('movie_id')

        # Cherche le film avec l'identifiant spécifié dans la base de données
        movie = Movie.objects.filter(tmdb_id=movie_id).first()

        if not movie:
            # Si le film n'existe pas, renvoyer une erreur 404
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

        # Récupérer les détails du film depuis TMDB
        tmdb_data = TMDBService.get_movie_details(movie_id)
        if not tmdb_data:
            return Response({'error': 'Failed to fetch movie details from TMDB'}, status=status.HTTP_400_BAD_REQUEST)

        # Extraire les détails du film depuis tmdb_data
        production_list = TMDBService.get_production(movie_id)
        title = tmdb_data.get('title', '')
        tag = tmdb_data.get('tagline', '')
        duree = tmdb_data.get('runtime', 0)
        description = tmdb_data.get('overview', '')
        production = ', '.join([company['name'] for company in production_list])
        studio = production_list[0]['name'] if production_list else ''
        original_language = tmdb_data.get('original_language', '')
        original_title = tmdb_data.get('original_title', '')
        poster_path = tmdb_data.get('poster_path', '')
        backdrop_path = tmdb_data.get('backdrop_path', '')
        vote_average = tmdb_data.get('vote_average', 0)
        adult = tmdb_data.get('adult', False)
        date = tmdb_data.get('release_date', None)
        genres = tmdb_data.get('genres', [])
        themes = tmdb_data.get('genres', [])

        # Met à jour les informations du film existant
        movie.title = title
        movie.tag = tag
        movie.duree = duree
        movie.description = description
        movie.production = production
        movie.studio = studio
        movie.original_langage = original_language
        movie.original_title = original_title
        movie.poster_path = poster_path
        movie.backdrop_path = backdrop_path
        movie.vote_average = vote_average
        if (adult):
            movie.age = 18
        else:
            movie.age=7
        
        movie.date = date

        # Met à jour les genres et thèmes
        movie.genres.clear()
        for genre_data in genres:
            genre, _ = Genre.objects.get_or_create(id=genre_data['id'], defaults={'name': genre_data['name']})
            movie.genres.add(genre)

        movie.themes.clear()
        for theme_data in themes:
            theme, _ = Theme.objects.get_or_create(id=theme_data['id'], defaults={'name': theme_data['name']})
            movie.themes.add(theme)

        movie.save()

        # Sérialiser les détails du film
        serializer = MovieSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MovieCommentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        movie_id = request.query_params.get('movie_id')

        # Vérifier si l'ID du film est fourni
        if not movie_id:
            return Response({'error': 'Movie ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer les commentaires du film depuis TMDB
        tmdb_comments = TMDBService.get_movie_comment(movie_id)
        if not tmdb_comments:
            return Response({'error': 'Failed to fetch movie comments from TMDB'}, status=status.HTTP_400_BAD_REQUEST)

        # Extraire et formater les commentaires
        comments = []
        for comment in tmdb_comments['results']:
            comments.append({
                'name': comment.get('author', 'Unknown'),
                'content': comment.get('content', ''),
                'avatar': comment.get('author_details', {}).get('avatar_path', ''),
                'date': comment.get('created_at', ''),
                'url': comment.get('url', '')
            })
        
        # Retourner les commentaires formatés dans la réponse
        return Response({'comments': comments}, status=status.HTTP_200_OK)
    
    
class MovieListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Vérifie si 'sortCriteria' est présent dans la requête et s'il n'est pas vide
        page = request.query_params.get('page', 1)
        genre = request.query_params.get('genre', '')
        tmdb_data = TMDBService.get_popular_movies(page=page, genre=genre)
        
        
        if tmdb_data:
            movies = tmdb_data.get('results', [])
            added_movies = []
            

            for movie_data in movies:
                
                tmdb_id = movie_data['id']
                production_list=TMDBService.get_production(tmdb_id)

                title = movie_data['title']
                # description = movie_data['overview']

                # production = ', '.join([company['name'] for company in production_list])
                # studio = production_list[0]['name'] if production_list else ''
                # adult = movie_data.get('adult', None)
                # genres = movie_data['genre_ids']
                poster_path= movie_data['poster_path']
                backdrop_path=movie_data['backdrop_path']
                vote_average=movie_data['vote_average']
                date=movie_data['release_date']

                movie, created = Movie.objects.get_or_create(
                    tmdb_id=tmdb_id,
                    defaults={
                        'title': title,
                        # 'description': description,
                        # 'production': production,
                        # 'studio': studio,
                        # 'adult': adult,
                        'date': date,
                        'vote_average': vote_average,
                        'poster_path': poster_path,
                        'backdrop_path': backdrop_path,
                    }
                )

                # if created:
                #     for genre_id in genres:
                #         genre, _ = Genre.objects.get_or_create(id=genre_id, defaults={'name': 'Unknown'})  # Adjust according to your Genre model
                #         movie.genres.add(genre)

                added_movies.append(movie)
                
            # Print added movies for debugging
            print("Added Movies:", added_movies)  

            # Serialize the list of added movies
            serializer = MovieSerializer(added_movies, many=True)
            serialized_data = serializer.data
            
            # Print the serialized data for debugging
            print("Serialized Data:", serialized_data)

            # Return the serialized data as a response
            return Response(serialized_data, status=status.HTTP_200_OK)

        return Response({'error': 'Failed to fetch movies from TMDB'}, status=status.HTTP_400_BAD_REQUEST)

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class ThemeListView(generics.ListAPIView):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer

class LikedMovieListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikedMovieSerializer

    def get_queryset(self):
        user = self.request.user
        return LikedMovie.objects.filter(user=user)

class PlaylistListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        user = self.request.user
        return Playlist.objects.filter(user=user)

class LikeMovieView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        LikedMovie.objects.create(user=request.user, movie=movie)
        return Response(status=status.HTTP_201_CREATED)

class AddToPlaylistView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, playlist_id, movie_id):
        playlist = Playlist.objects.get(id=playlist_id, user=request.user)
        movie = Movie.objects.get(id=movie_id)
        playlist.movies.add(movie)
        return Response(status=status.HTTP_201_CREATED)

class IncrementViewCountView(APIView):
    def post(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        movie.view_count += 1
        movie.save()
        return Response(status=status.HTTP_200_OK)

class WatchMovieView(APIView):
    def get(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        tmdb_response = TMDBService.get_movie_details(movie.tmdb_id)
        if tmdb_response:
            movie_info = tmdb_response
            genres = [genre.name for genre in movie.genres.all()]
            themes = [theme.name for theme in movie.themes.all()]
            return Response({
                'title': movie.title,
                'description': movie.description,
                'production': movie.production,
                'age': movie.age,
                'studio': movie.studio,
                'tmdb_info': movie_info,
                'genres': genres,
                'themes': themes,
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Failed to fetch movie info'}, status=status.HTTP_400_BAD_REQUEST)


class DownloadMovieView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        bot = telegram.Bot(token=settings.TELEGRAM_BOT_TOKEN)
        file = bot.get_file(movie.telegram_file_id)
        file_path = file.download()
        with open(file_path, 'rb') as f:
            response = Response(f.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{movie.title}.mp4"'
            return response
        return Response({'error': 'Failed to download movie'}, status=status.HTTP_400_BAD_REQUEST)
class TopRatedMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.fetch_top_rated_movies()
        return Response(data, status=status.HTTP_200_OK)

class UpcomingMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.fetch_upcoming_movies()
        return Response(data, status=status.HTTP_200_OK)

class MoviesByGenreView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, genre_id):
        data = TMDBService.fetch_movies_by_genre(genre_id)
        return Response(data, status=status.HTTP_200_OK)

class MovieDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, movie_id):
        data = TMDBService.fetch_movie_details(movie_id)
        return Response(data, status=status.HTTP_200_OK)

class PopularTVShowsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.fetch_popular_tv_shows()
        return Response(data, status=status.HTTP_200_OK)

class TopRatedTVShowsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.fetch_top_rated_tv_shows()
        return Response(data, status=status.HTTP_200_OK)

class TVShowsByGenreView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, genre_id):
        data = TMDBService.fetch_tv_shows_by_genre(genre_id)
        return Response(data, status=status.HTTP_200_OK)

class TVShowDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, tv_id):
        data = TMDBService.fetch_tv_show_details(tv_id)
        return Response(data, status=status.HTTP_200_OK)

class PersonDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, person_id):
        data = TMDBService.fetch_person_details(person_id)
        return Response(data, status=status.HTTP_200_OK)

class SearchView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        query = request.query_params.get('query', '')
        if not query:
            return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        data = TMDBService.search(query)
        return Response(data, status=status.HTTP_200_OK)