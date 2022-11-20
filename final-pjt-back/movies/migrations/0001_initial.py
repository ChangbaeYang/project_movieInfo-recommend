# Generated by Django 3.2.13 on 2022-11-20 05:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('poster_path', models.CharField(max_length=200)),
                ('overview', models.TextField()),
                ('vote_average', models.FloatField()),
                ('original_title', models.CharField(max_length=100)),
                ('original_language', models.CharField(max_length=200)),
                ('backdrop_path', models.CharField(max_length=200)),
                ('popularity', models.FloatField()),
                ('homepage', models.CharField(max_length=200)),
                ('revenue', models.IntegerField()),
                ('runtime', models.IntegerField()),
                ('budget', models.IntegerField()),
                ('youtube_key', models.TextField()),
                ('genres', models.ManyToManyField(related_name='movies_in_genre', to='movies.Genre')),
                ('like_users', models.ManyToManyField(related_name='like_movies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('rank', models.FloatField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('popularity', models.FloatField()),
                ('known_for_department', models.CharField(max_length=100)),
                ('profile_path', models.CharField(max_length=200)),
                ('biography', models.CharField(max_length=1000, null=True)),
                ('directing_movies', models.ManyToManyField(related_name='director_in_movie', to='movies.Movie')),
                ('like_users', models.ManyToManyField(related_name='like_directors', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('popularity', models.FloatField()),
                ('known_for_department', models.CharField(max_length=100)),
                ('profile_path', models.CharField(max_length=200)),
                ('biography', models.CharField(max_length=1000, null=True)),
                ('acting_movies', models.ManyToManyField(related_name='actors_in_movie', to='movies.Movie')),
                ('like_users', models.ManyToManyField(related_name='like_actors', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
