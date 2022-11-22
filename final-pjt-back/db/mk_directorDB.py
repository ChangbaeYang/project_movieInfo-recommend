# #  창근 페이지 건들거리지마시오
import requests
import csv
import pandas as pd


mr = pd.read_csv('movie.csv', header=None)
movie_list = []

for row_index, row in mr.iterrows():    
    movie_list.append(row.loc[0]) #row.ix[0]

# print(movie_list)
movie_list.pop(0)

director_list = []
for movie_id in movie_list:
    # credit id 뽑을 그거
    res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
    credits_data = res_credits.json()
    cnt = 0
    # print(credits_data)
    if 'crew' not in credits_data:
        credits_data['crew'] = ''

    for j in credits_data['crew']:
        if j['job'] == 'Director':
            director_id = j['id']
            res_directors = requests.get(f'https://api.themoviedb.org/3/person/{director_id}?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
            directors_data_list = res_directors.json()
            director_list.append(directors_data_list)
            break
            # print(directors_data_list['name'])
    # print(credits_data)
    # print(_data_list)

# print(director_list)
director_data = []
for i in director_list:
    director_data.append({'id': i['id'], 'name': i['name'], 'birthday': i['birthday'], 'deathday': i['deathday'], 'popularity': i['popularity'], 'known_for_department': i['known_for_department'] , 'profile_path': i['profile_path'], 'biography': i['biography']})
    
    
with open('director.csv', 'w', newline='',encoding='utf-8') as csvfile:
    fieldnames = ['id', 'name', 'birthday', 'deathday', 'popularity', 'known_for_department', 'profile_path', 'biography']     # 데이터 컬럼 이름
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)     # 컬럼 이름들 작성

    writer.writeheader()    # csv 파일에 컬럼이름 반영  
    for obj in director_data:       # 위의 장르들 하나하나의 obj에 대해 반복문 돌면서
        writer.writerow(obj) 
