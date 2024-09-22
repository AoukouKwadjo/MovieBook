from django.urls import path, include
from api.views import (
    MovieListView, LikedMovieListView,
    PlaylistListView, LikeMovieView, AddToPlaylistView, IncrementViewCountView,
    WatchMovieView, DownloadMovieView, GenreListView, ThemeListView,
    TopRatedMoviesView, UpcomingMoviesView,
    MoviesByGenreView, PopularTVShowsView,
    TopRatedTVShowsView, TVShowsByGenreView, TVShowDetailsView,
    PersonDetailsView, SearchView, MovieDetailView, MovieCommentView
)

urlpatterns = [
    path('movies/movie-list', MovieListView.as_view(), name='movie-list'),
    path('movies/', MovieDetailView.as_view(), name='movie-details'),
    path('comments/', MovieCommentView.as_view(), name='movie-comments'),
    path('movies/liked/', LikedMovieListView.as_view(), name='liked-movie-list'),
    path('playlists/', PlaylistListView.as_view(), name='playlist-list'),
    path('movies/<int:movie_id>/download/', DownloadMovieView.as_view(), name='download-movie'),
    path('movies/<int:movie_id>/watch/', WatchMovieView.as_view(), name='watch-movie'),
    path('genres/', GenreListView.as_view(), name='genre-list'),
    path('themes/', ThemeListView.as_view(), name='theme-list'),
    path('movies/<int:movie_id>/like/', LikeMovieView.as_view(), name='like-movie'),
    path('playlists/<int:playlist_id>/add/<int:movie_id>/', AddToPlaylistView.as_view(), name='add-to-playlist'),
    path('movies/<int:movie_id>/increment-view/', IncrementViewCountView.as_view(), name='increment-view-count'),
    path('movies/<int:movie_id>/watch/', WatchMovieView.as_view(), name='watch-movie'),
    path('movies/<int:movie_id>/download/', DownloadMovieView.as_view(), name='download-movie'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('movies/top-rated/', TopRatedMoviesView.as_view(), name='top-rated-movies'),
    path('movies/upcoming/', UpcomingMoviesView.as_view(), name='upcoming-movies'),
    path('movies/genre/<int:genre_id>/', MoviesByGenreView.as_view(), name='movies-by-genre'),
    path('tv-shows/popular/', PopularTVShowsView.as_view(), name='popular-tv-shows'),
    path('tv-shows/top-rated/', TopRatedTVShowsView.as_view(), name='top-rated-tv-shows'),
    path('tv-shows/genre/<int:genre_id>/', TVShowsByGenreView.as_view(), name='tv-shows-by-genre'),
    path('tv-shows/<int:tv_id>/', TVShowDetailsView.as_view(), name='tv-show-details'),
    path('person/<int:person_id>/', PersonDetailsView.as_view(), name='person-details'),
    path('search/', SearchView.as_view(), name='search'),
]
