from rest_framework import serializers
from blog.models import Blog, Category
from casestudy.models import CaseStudy
from home.models import Contact


class CategorySerializer(serializers.ModelSerializer):
    blog_count = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'blog_count']


class BlogListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.username', default='Admin', read_only=True)
    read_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'short_description',
            'views',
            'featured',
            'created_at',
            'read_time',
            'category',
            'author_name',
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.username', default='Admin', read_only=True)
    read_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'short_description',
            'content',
            'views',
            'featured',
            'created_at',
            'read_time',
            'category',
            'author_name',
        ]


class CaseStudySerializer(serializers.ModelSerializer):
    tag_list = serializers.ListField(read_only=True)

    class Meta:
        model = CaseStudy
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'image',
            'tags',
            'tag_list',
            'short_description',
            'description',
            'created_at',
            'is_featured',
        ]
