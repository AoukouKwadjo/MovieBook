from rest_framework import serializers
from .models import Movie, Playlist, LikedMovie, Genre, Theme, TVShow, Person

class MovieSerializer(serializers.ModelSerializer):
    # genres = serializers.StringRelatedField(many=True)
    # themes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Genre
        fields = '__all__'

class ThemeSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Theme
        fields = '__all__'

class LikedMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedMovie
        fields = '__all__'


class TVShowSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = TVShow
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'
