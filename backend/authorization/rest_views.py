from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainSlidingView

from .serializers import UserSerializer, LogInSerializer
from django.http import HttpResponseRedirect

import logging

logger = logging.getLogger('testlogger')


class SignUpView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class LogInView(TokenObtainSlidingView):  # new
    serializer_class = LogInSerializer

    # Actually operating on django User auth model
    class ProfileViewset(viewsets.ViewSet):
        paginator = LimitOffsetPagination()

        def retrieve(self, request, pk=None):
            queryset = self.get_queryset()
            profile = get_object_or_404(queryset, username=pk)
            serializer = ProfileSerializer(profile, context={'request': request})
            return Response(serializer.data)

        def destroy(self, request, pk=None):
            queryset = self.get_queryset()
            profile = get_object_or_404(queryset, username=pk)
            profile.delete()
            return Response(status=HTTP_200_OK)

        def get_queryset(self):
            queryset = User.objects.all()
            return queryset
