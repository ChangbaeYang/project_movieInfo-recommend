# #  창근 페이지 건들거리지마시오
import requests
import csv

# # genre table 생성

for i in range(1,2):
    res=requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={i}&with_watch_monetization_types=flatrate3')
    data=res.json()

actor_list = []
for i in data['results']:
    # credit id 뽑을 그거
    movie_id = i['id']
    res_credits = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
    credits_data = res_credits.json()
    cnt = 0
    for j in credits_data['cast']:
        actor_id = j['id']
        res_actors = requests.get(f'https://api.themoviedb.org/3/person/{actor_id}?api_key=47deac5349c200ea6a8315d1f742e31d&language=en-US')
        actors_data_list = res_actors.json()

        if actors_data_list['known_for_department'] == 'Acting':
            actor_list.append(actors_data_list)
    # print(credits_data)
    # print(actors_data_list)
# print(actor_list)

# print(actor_list)
actor_data = []
for i in actor_list:
    actor_data.append({'id': i['id'], 'name': i['name'], 'popularity': i['popularity'], 'known_for_department': i['known_for_department'] , 'profile_path': i['profile_path'], 'biography': i['biography']})
    
    
with open('actor.csv', 'w', newline='',encoding='utf-8') as csvfile:
    fieldnames = ['id', 'name', 'popularity', 'known_for_department', 'profile_path', 'biography']     # 데이터 컬럼 이름
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)     # 컬럼 이름들 작성

    writer.writeheader()    # csv 파일에 컬럼이름 반영  
    for obj in actor_data:       # 위의 장르들 하나하나의 obj에 대해 반복문 돌면서
        writer.writerow(obj) 
