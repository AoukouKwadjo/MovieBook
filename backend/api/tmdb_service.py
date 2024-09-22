import requests
from django.conf import settings

class TMDBService:
    BASE_URL = 'https://api.themoviedb.org/3'

    @staticmethod
    def get_production(tmdb_id):
        url = f'{TMDBService.BASE_URL}/movie/{tmdb_id}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR',
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()['production_companies']

    @staticmethod
    def get_popular_movies(page=10, genre=None):
        url = f'{TMDBService.BASE_URL}/discover/movie'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR',
            'page': page,
            'per_page' : 20,
            # 'sort_by': 'vote_average.desc',
            'vote_count.gte':'200',
            'vote_average.gte': '2.0',
            'with_genres': genre,

        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_movie_details(tmdb_id):
        url = f'{TMDBService.BASE_URL}/movie/{tmdb_id}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR'
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    
    @staticmethod
    def get_movie_comment(tmdb_id,page=1):
        url = f'{TMDBService.BASE_URL}/movie/{tmdb_id}/reviews'
        params = {
            'page': page,
            'per_page' : 10,
            'api_key': settings.TMDB_API_KEY,
            'language': 'en-US'
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_popular_tv_shows(page=1):
        url = f'{TMDBService.BASE_URL}/tv/popular'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR',
            'page': page
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_tv_show_details(tmdb_id):
        url = f'{TMDBService.BASE_URL}/tv/{tmdb_id}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR'
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_person_details(tmdb_id):
        url = f'{TMDBService.BASE_URL}/person/{tmdb_id}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR'
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def search(query, category='multi', page=1):
        url = f'{TMDBService.BASE_URL}/search/{category}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR',
            'query': query,
            'page': page
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def get_list(list_id):
        url = f'{TMDBService.BASE_URL}/list/{list_id}'
        params = {
            'api_key': settings.TMDB_API_KEY,
            'language': 'fr-FR'
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
