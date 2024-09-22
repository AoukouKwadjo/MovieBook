from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=255)
    production = models.CharField(max_length=255, null=True, blank=True)
    studio = models.CharField(max_length=255, null=True, blank=True)
    original_langage = models.CharField(max_length=255, null=True, blank=True)
    original_title = models.CharField(max_length=255, null=True, blank=True)
    poster_path = models.CharField(max_length=255, null=True, blank=True)
    backdrop_path = models.CharField(max_length=255, null=True, blank=True)
    tag = models.CharField(max_length=255, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    description = models.TextField()
    is_popular = models.BooleanField(default=False)
    adult = models.BooleanField(default=False)
    video = models.BooleanField(default=False)
    view_count = models.PositiveIntegerField(default=0)
    vote_average = models.PositiveIntegerField(default=0)
    vote_count = models.PositiveIntegerField(default=0)
    duree = models.PositiveIntegerField(default=0)
    tmdb_id = models.CharField(max_length=100, unique=True)  # TMDB ID
    telegram_file_id = models.CharField(max_length=100, null=True, blank=True)  # Telegram File ID for downloading
    genres = models.ManyToManyField('Genre', related_name='movies')
    themes = models.ManyToManyField('Theme', related_name='movies')
    date = models.DateField(null=True)

class TVShow(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    tmdb_id = models.CharField(max_length=100, unique=True)
    genres = models.ManyToManyField('Genre', related_name='tvshows')

class Person(models.Model):
    name = models.CharField(max_length=255)
    tmdb_id = models.CharField(max_length=100, unique=True)
    biography = models.TextField()
    movies = models.ManyToManyField(Movie, related_name='actors')
    tv_shows = models.ManyToManyField(TVShow, related_name='actors')

class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    movies = models.ManyToManyField(Movie, related_name='playlists')

class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Theme(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class LikedMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
