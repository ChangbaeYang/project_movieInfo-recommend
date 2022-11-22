from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('userLikeMovie/<int:user_pk>/', views.user_like_movie)
]