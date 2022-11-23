from rest_framework.response import Response
from rest_framework.decorators import api_view 

from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserLikeSerializer


# Create your views here.
@api_view(['POST'])
def signup(request):
    # 요청받기
    password = request.data.get('password')
    passwordConfirmation = request.data.get('passwordConfirmation')
    # 비밀번호러 valid 한지 보기
    if password != passwordConfirmation:
        return Response({ 'error': '비밀번호 오류 생생 정보통요~.'})

    #  사용자의 데이터를 UserSerializer 를 통해 데이터 생성
    else:
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # 유저 정보 저장
            user = serializer.save()

            # 비밀번호 암호화
            user.set_password(request.data.get('password'))
            user.save()

            return Response(serializer.data)

# @api_view(['POST'])
# def my_profile(request):

#     user = get_object_or_404(get_user_model(), pk=request.data.get('user_id'))
#     serializer = UserSerializer(user)

#     return Response(serializer.data)



@api_view(['POST'])
def profile(request, username):
    # print(request.data)
    user = get_object_or_404(get_user_model(), pk=request.data.get('user_pk'))
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def users(request):
    users = get_user_model().objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def user_like_movie(request, user_pk):
    user = request.user.pk
    print(user)
    print(request.user.like_movies.all())
    like_movies = request.user.like_movies.all()
    serializer = UserLikeSerializer(like_movies)
    return Response(serializer.data)

@api_view(['POST'])
def follow(request, my_pk, user_pk):
    if request.user.is_authenticated:
        person = get_object_or_404(get_user_model(), pk=user_pk)
        me = get_object_or_404(get_user_model(), pk=my_pk)
        if person != me:
            if me.followings.filter(pk=person.pk).exists():
                me.followings.remove(person)
                following = False
            else:
                me.followings.add(person)
                following = True
            print(me.followings.filter(pk=person.pk))
            return Response(following)