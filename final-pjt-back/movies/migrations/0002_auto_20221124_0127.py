# Generated by Django 3.2.13 on 2022-11-23 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='actor',
            name='birthday',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='actor',
            name='deathday',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='director',
            name='birthday',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='director',
            name='deathday',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
