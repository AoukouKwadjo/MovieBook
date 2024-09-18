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


class MovieListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        tmdb_data = TMDBService.get_popular_movies()
        
        if tmdb_data:
            movies = tmdb_data.get('results', [])
            added_movies = []
            

            for movie_data in movies:
                
                tmdb_id = movie_data['id']
                production_list=TMDBService.get_production(tmdb_id)

                title = movie_data['title']
                description = movie_data['overview']

                production = ', '.join([company['name'] for company in production_list])
                studio = production_list[0]['name'] if production_list else ''
                age = movie_data.get('age', None)
                genres = movie_data['genre_ids']
                themes = []  # Assuming themes are not available in the API response and will be assigned later

                movie, created = Movie.objects.get_or_create(
                    tmdb_id=tmdb_id,
                    defaults={
                        'title': title,
                        'description': description,
                        'production': production,
                        'studio': studio,
                        'age': age,
                    }
                )

                if created:
                    for genre_id in genres:
                        genre, _ = Genre.objects.get_or_create(id=genre_id, defaults={'name': 'Unknown'})  # Adjust according to your Genre model
                        movie.genres.add(genre)

                    # Add themes to the movie if available
                    for theme_name in themes:
                        theme, _ = Theme.objects.get_or_create(name=theme_name)
                        movie.themes.add(theme)

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


class PopularMovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]


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