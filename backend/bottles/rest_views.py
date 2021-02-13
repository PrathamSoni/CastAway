from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import LimitOffsetPagination

from .serializers import MessageSerializer

from django.shortcuts import get_object_or_404, Http404, HttpResponse

from django.contrib.auth.models import User
from machina.apps.forum_permission.viewmixins import PermissionRequiredMixinViewset
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseRedirect, HttpResponseBadRequest
from rest_framework import viewsets

from .model import Message

import logging

logger = logging.getLogger('testlogger')

import logging

logger = logging.getLogger('testlogger')


class BottleViewset(PermissionRequiredMixinViewset):
    queryset = Message.objects.none()
    paginator = LimitOffsetPagination()

    permission_classes_by_action = {'retrieve': [IsAuthenticated],
                                    'list': [IsAuthenticated],
                                    }

    def retrieve(self, request, pk=None):
        queryset = Message.objects.all()
        topic = get_object_or_404(queryset, pk=pk)
        serializer = MessageSerializer(topic, context={'request': request})
        return Response(serializer.data)

    def list(self, request):
        page = self.paginator.paginate_queryset(self.get_queryset(), self.request)
        if page is not None:
            serializer = MessageSerializer(page, context={'request': request}, many=True)
            return self.paginator.get_paginated_response(serializer.data)

        serializer = MessageSerializer(self.get_queryset(), context={'request': request}, many=True)
        return Response(serializer.data)
