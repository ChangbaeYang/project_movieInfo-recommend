from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('movies/', views.movie_list),
    path('movies/page/<int:page>/', views.movie_page_list),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('movies/search/<str:search_data>/', views.movie_search),
    path('movies/<int:movie_pk>/like/', views.movie_like),
    
    path('actors/', views.actor_list),
    path('actors/page/<int:page>/', views.actor_page_list),
    path('actors/<int:actor_pk>/', views.actor_detail),
    
    path('directors/', views.director_list),
    path('directors/page/<int:page>/', views.director_page_list),
    path('directors/<int:director_pk>/', views.director_detail),
    path('directors/<int:director_pk>/like/', views.director_like),
    
    path('reviews/', views.review_list),
    path('reviews/<int:review_pk>/', views.review_detail),
    path('movies/<int:movie_pk>/reviews/', views.create_review),
    path('genres/', views.genre_list),
    path('genres/<int:genre_pk>/', views.gerne_detail),
]