# Generated by Django 3.2.13 on 2022-11-19 12:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('community', '0002_auto_20221117_0623'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='like_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='like_articles', to=settings.AUTH_USER_MODEL),
        ),
    ]
