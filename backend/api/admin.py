from django.contrib import admin
from .models import Movie, Playlist, LikedMovie, Genre, Theme

# Register your models here.

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'production', 'studio', 'age')
    search_fields = ('title', 'description', 'production', 'studio', 'age')
    list_filter = ('production', 'studio', 'age')

@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    search_fields = ('name',)
    list_filter = ('user',)

@admin.register(LikedMovie)
class LikedMovieAdmin(admin.ModelAdmin):
    list_display = ('user', 'movie')
    search_fields = ('user', 'movie')
    list_filter = ('user',)

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_filter = ('name',)

@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_filter = ('name',)
