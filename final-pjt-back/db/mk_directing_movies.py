# #  창근 페이지 건들거리지마시오
import requests
import csv
import pandas as pd
# # genre table 생성

mr = pd.read_csv('movie.csv', header=None)
movie_list = []

mr2 = pd.read_csv('director.csv', header=None)
director_list = []

for row_index, row in mr.iterrows():    
    movie_list.append(row.loc[0]) #row.ix[0]

for row_index, row in mr2.iterrows():    
    director_list.append(row.loc[0]) #row.ix[0]

movie_list.pop(0)
director_list.pop(0)

director_movie_list = []
for director_id in director_list:
    for movie_id in movie_list:
        res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
        credits_data = res_credits.json()
        if 'crew' not in credits_data:
            credits_data['crew'] = ''
        for k in credits_data['crew']:
            if k['id'] == int(director_id):
                director_movie_list.append({'director_id': director_id, 'movie_id': movie_id})
                movie_list.remove(movie_id)
                print('heelo')
                break
                
df_movie = pd.DataFrame(director_movie_list)
df_movie.to_csv('directingmovie.csv' ,encoding='utf-8-sig')
# director_list = []
# for i in data['results']:
#     # credit id 뽑을 그거
#     movie_id = i['id']
#     res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
#     credits_data = res_credits.json()
#     cnt = 0
#     # print(credits_data)
#     for j in credits_data['crew']:
#         if j['job'] == 'Director':
#             director_id = j['id']
#             res_directors = requests.get(f'https://api.themoviedb.org/3/person/{director_id}?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
#             directors_data_list = res_directors.json()
#             # print(directors_data_list)
#             director_list.append(directors_data_list['id'])
#             break

