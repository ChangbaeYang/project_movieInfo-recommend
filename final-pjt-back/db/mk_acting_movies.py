# #  창근 페이지 건들거리지마시오
import requests
import csv
import pandas as pd

# # genre table 생성

mr = pd.read_csv('movie.csv', header=None)
movie_list = []

for row_index, row in mr.iterrows():    
    movie_list.append(row.loc[0]) #row.ix[0]

mr2 = pd.read_csv('actor.csv', header=None)
actor_list = []

for row_index, row in mr2.iterrows():    
    actor_list.append(row.loc[0]) #row.ix[0]

# 영화와 배우 리스트에서 요소 'id' 삭제
actor_list.pop(0)
movie_list.pop(0)

actor_character_list = []
for actor_id in actor_list:
    for movie_id in movie_list:
        res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
        credits_data = res_credits.json()

        for k in credits_data['cast']:
            if k['id'] == int(actor_id):
                # print(actor_id)
                # print(movie_id)
                actor_character_list.append({'actor_id': actor_id, 'movie_id': movie_id})
                break
                
df_movie = pd.DataFrame(actor_character_list)
df_movie.to_csv('actingmovie.csv' ,encoding='utf-8-sig')





# for movie_id in movie_list:
#     # credit id 뽑을 그거
#     res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
#     credits_data = res_credits.json()
#     cnt = 0
#     for j in credits_data['cast']:
#         if cnt == 6:
#             break
#         elif cnt <= 5:
#             actor_id = j['id']
#             res_actors = requests.get(f'https://api.themoviedb.org/3/person/{actor_id}?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
#             actors_data_list = res_actors.json()
#             actor_list.append(actors_data_list['id'])
#             cnt += 1

# print(actor_list)
