import logging
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSlidingSerializer  # new
from django.core.files import File

hasher = BCryptSHA256PasswordHasher()

logger = logging.getLogger('testlogger')


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'password2': 'not-match'})

        if User.objects.filter(username=str(data['username'])).exists():
            raise serializers.ValidationError({'username': 'is-taken'})

        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2',)
        }
        data['password'] = validated_data['password1']

        new_user = self.Meta.model.objects.create_user(**data)

        return new_user

    class Meta:
        model = User
        fields = (
            'id', 'username', 'password1', 'password2', 'email',
            'first_name', 'last_name',
        )
        read_only_fields = ('id',)
        extra_kwargs = {
            'username': {'validators': []},
        }


class LogInSerializer(TokenObtainSlidingSerializer):  # new
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token
