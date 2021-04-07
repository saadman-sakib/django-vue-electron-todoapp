from .views import RegisterView
from rest_framework.authtoken import views as token_views
from django.urls import path


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('authtoken/', token_views.obtain_auth_token),
]