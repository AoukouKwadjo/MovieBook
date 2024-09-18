from django.contrib import admin
from django.urls import path, include

from api.views import ObtainAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/token/', ObtainAuthToken.as_view(), name='api-token'),

]
