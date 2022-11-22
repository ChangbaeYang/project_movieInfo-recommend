# #  창근 페이지 건들거리지마시오
import requests
import csv
import pandas as pd
# # genre table 생성

mr = pd.read_csv('movie.csv', header=None)
movie_list = []

for row_index, row in mr.iterrows():    
    movie_list.append(row.loc[0]) #row.ix[0]

movie_list.pop(0)

actor_list = []

for movie_id in movie_list:
    res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
    credits_data = res_credits.json()
    cnt = 0

    for j in credits_data['cast']:
        if cnt == 6:
            break
        elif cnt <= 5:
            actor_id = j['id']
            res_actors = requests.get(f'https://api.themoviedb.org/3/person/{actor_id}?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
            actors_data_list = res_actors.json()
            actor_list.append(actors_data_list)
            cnt += 1
            
actor_data = []
for i in actor_list:
    actor_data.append({'id': i['id'], 'name': i['name'], 'birthday': i['birthday'], 'deathday': i['deathday'], 'popularity': i['popularity'], 'known_for_department': i['known_for_department'] , 'profile_path': i['profile_path'], 'biography': i['biography']})
    
    
with open('actor.csv', 'w', newline='',encoding='utf-8') as csvfile:
    fieldnames = ['id', 'name', 'birthday', 'deathday', 'popularity', 'known_for_department', 'profile_path', 'biography']     # 데이터 컬럼 이름
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)     # 컬럼 이름들 작성

    writer.writeheader()    # csv 파일에 컬럼이름 반영  
    for obj in actor_data:       # 위의 장르들 하나하나의 obj에 대해 반복문 돌면서
        writer.writerow(obj) 
