from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer
from .models import Article, Comment



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) # 인증된 경우만 권한을 준다.
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        # articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST': # 게시글 생성
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.save()
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        writer = article.user
        if request.user == writer: #요청유저와 글쓴 유저가 같다면
            serializer = ArticleSerializer(article)
            article.delete()
            return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)

    elif request.method == 'PUT':
        writer = article.user
        if request.user == writer: #요청유저와 글쓴 유저가 같다면
            serializer = ArticleSerializer(article, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST'])
def comment_list(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'GET':
        comments = article.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST': # 댓글
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.save()
            serializer.save(user=request.user, article_id=article.pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def comment_list_all(request):
    if request.method == 'GET':
        print('hi')
        comments = Comment.objects.all()
        print(comments)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, article_pk, comment_pk):
    # comment = Comment.objects.get(pk=comment_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        writer = comment.user
        if request.user == writer: #요청유저와 글쓴 유저가 같다면
            serializer = CommentSerializer(comment)
            comment.delete()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated]) # 인증된 경우만 권한을 준다.
# def comment_create(request, article_pk):
#     # article = Article.objects.get(pk=article_pk)
#     comment = get_object_or_404(Comment, pk=article_pk)
#     serializer = CommentSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(article=article)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

