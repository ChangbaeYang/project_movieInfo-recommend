# Picky - Movie Info site

#### 📆 Project Deadline

* 22/11/18 ~ 22/11/25(1week)

### ✔Index

* **Development Environment (개발 환경)**

* **Service (서비스 개요)**

* **ERD (Entity Relation Diagram)**

* **Team (팀원)**

* **Working Tool (협업 툴)**

* **API**

* **To do (프젝에 추가하고 싶은 것)**

---

### 🛠 Development Environment (개발 환경)

* **Vue & Django**

![image](https://user-images.githubusercontent.com/109326312/227716775-c4c161e3-31b6-4aec-a2de-947cda94937f.png)


* **Why Vue?**

There were two options that we could choose. React and Vue.

We choose Vue, because it is framework.

Cause this project was our team's first project, framework would be easier for us to do.

And also, Vue is more optimized for CSL pjt.



* **Why Django?**

Cause We had only 1week, we should make it fast.

And there is django admin feature, we knew it could save lots of time.

We chose Django for fast development.

---

### 🎁 Service : Picky

* **Why Picky?** **(서비스를 만든 이유)**

We made this website to help someone who had hard time selecting movies.

We Introduce all movies in TMDB stie that has lots of moives and manage them. -> API

We show moives, actor, directors and their discriptions.(We also show trailer.)

Also, we produce recommended movies for user by getting their likes info with recommendation algorithm.

Beautiful card layout makes user be happy with us.

우리, 피키 영화 사이트는 영화를 고르는데에 어려움을 겪는 사람을 위해서 서비스를 제공합니다.

세상에 나오는 거의 모든 영화를 다루는 TMDB 사이트에서 정보를 가져오기에 많은 정보들이 있습니다.

영화별, 배우별, 감독별로 세부 설명들을 확인할 수 있고, 영화의 경우 트레일러도 사이트 내에서 확인할 수 있습니다.

또한, 추천 알고리즘을 통해서 사용자는 그들의 좋아요를 기반으로 영화를 추천받을 수 있습니다.

아름다운 카드 레이아웃 형식으로, 유저는 편하게 사이트를 즐길 수 있습니다.

* **Main** **(메인 페이지 구성)**

![image](https://user-images.githubusercontent.com/109326312/227717041-719386d5-ca9d-424b-9c82-7be673417c55.png)


This is main page.

You can access other pages if you click button on nav-bar

You can search information by search on nav-bar

* **Information** (정보 제공)

![image](https://user-images.githubusercontent.com/109326312/227716487-5d915546-3db2-43bc-bec5-b1b3bf9919e6.png)

![image](https://user-images.githubusercontent.com/109326312/227716496-5252122b-1657-4c1d-b2aa-ea0807b98ed2.png)

![image](https://user-images.githubusercontent.com/109326312/227716477-9b34ea4e-7eb6-4b51-9b31-59159c6a8d84.png)

![image](https://user-images.githubusercontent.com/109326312/227716521-55bec616-6ba6-42c9-ba62-8717a0ce1bc7.png)


There are movie, actor, director page.(**we made infinite scroll!**)

They are ordered by popularity.

![image](https://user-images.githubusercontent.com/109326312/227715686-0af72748-a848-4f38-9aec-194cd3b71bfa.png)

If you click the card in page, you can see the detail information about what you click.

In detail page, you can click the heart(❤)

It is saved in our DB and recommend user movies.

* **Recommendation** **(추천기능)**

![image](https://user-images.githubusercontent.com/109326312/227715705-39d05f3a-2921-4076-86f4-ace98a212e36.png)

User can get recommended movie.

* **Community** **(포럼 기능)**


![image](https://user-images.githubusercontent.com/109326312/227715731-58639271-3397-4c7b-bb02-15a6a60e7a1a.png)

There is three forum page.

One is Free page that user can write all the things,

Second is Debate page that user can debate about movie or ect.

Last is Help page, user can request what they want managers to do.

* **User (Log In, Sign Up)**

  ![image](https://user-images.githubusercontent.com/109326312/227715713-6e640a4f-c1d1-4636-9860-3461070b9bd7.png)

This is basic feautre in site

There is some requirement to get accepted.(password requirement etc)

* **Manager (관리자 기능)**

We used django basic feature.

장고에서 제공하는 기본 관리자 기능을 이용했습니다.

---

### 🛡 ERD

* **By dbdiagram.io**


![image](https://user-images.githubusercontent.com/109326312/227716631-334464fe-9584-47b8-abbd-e5300b1602c4.png)


* **Movies ERD**


![image](https://user-images.githubusercontent.com/109326312/227716651-ef15723d-c89b-49ee-a502-7865aea9ad0e.png)


* **Community ERD**

![image](https://user-images.githubusercontent.com/109326312/227716671-2a1bc2cf-e1b3-4809-a464-8707b38e8160.png)


* **User ERD**

![image](https://user-images.githubusercontent.com/109326312/227716688-0df3e681-27ee-483b-8689-ddf9ce6b1714.png)


* **Entire ERD**

![image](https://user-images.githubusercontent.com/109326312/227716703-6a5c52bc-83ef-49a1-8da3-a396076781f2.png)

---

### 📣 Working Tool (협업 툴)

* **Notion**

for project record and milestone.

![image](https://user-images.githubusercontent.com/109326312/227716736-f21aad61-be07-4afc-811c-1412258b1b15.png)


* **Github**

To manage version of project


---

### 😀 Team

![image](https://user-images.githubusercontent.com/109326312/227716761-421c9b1c-b5f6-4d24-998d-5851ed391ab1.png)


**Chang Bae Yang (양창배)**

* design ERD
* Back-End 
  * Back-End Buisness Logic
  * API url mapping
  * Security(django)

* Front-End
  * Recommend Algorithm
  * LayOut Design
  * Reactive Web

![image](https://user-images.githubusercontent.com/109326312/227716766-9826f5dd-8239-4172-b4de-fb9a07d8c897.png)


**Chang Keun Choi (최창근)**

* DataBase
  * TMDB data to SQLite

* Back-End
  * serializer

* Front-End(CSS)

---

### 👓 API

* **TMDB API**

![image](https://user-images.githubusercontent.com/109326312/227716718-a303409f-28e1-4d40-b6fe-a1d0bc447167.png)

---

### 👍 To do(앞으로 더 추가하고 싶은 기능)

* 헬프 페이지에 다른 유저는 못보도록 하기
* 보안







