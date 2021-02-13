from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import LimitOffsetPagination

from .serializers import MessageSerializer

from django.shortcuts import get_object_or_404, Http404, HttpResponse

from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseRedirect, HttpResponseBadRequest
from rest_framework import viewsets

from .models import Message

import logging

logger = logging.getLogger('testlogger')


class BottleViewset(viewsets.ModelViewSet):
    queryset = Message.objects.none()
    paginator = LimitOffsetPagination()
    serializer_class = MessageSerializer

    def retrieve(self, request, pk=None):
        queryset = Message.objects.all()
        message = get_object_or_404(queryset, pk=pk)
        if message.recipient is not None:
            if request.user != message.recipient and request.user != message.sender:
                return HttpResponseBadRequest()

        elif request.user != message.sender:
            message.opened = True
            message.recipient = request.user
            message.save()
        # opened successfully
        serializer = MessageSerializer(message, context={'request': request})

        data = serializer.data
        if not data["dm"]:
            data.pop("sender")

        return Response(data)

    def list(self, request):
        page = self.paginator.paginate_queryset(Message.objects.filter(recipient=None, opened=False), self.request)
        if page is not None:
            serializer = MessageSerializer(page, context={'request': request}, many=True)
            data = serializer.data
            for datum in data:
                datum.pop("content")
                datum.pop("sender")
            return self.paginator.get_paginated_response(data)
        else:
            return None

    def create(self, request):
        data = request.data
        data._mutable = True
        parent = None
        if "parent" in data.keys() and data["parent"] is not None and data["parent"] != "":
            parent = Message.objects.get(id=data["parent"])
            if parent.recipient is not None:
                if request.user != parent.recipient:
                    return HttpResponseBadRequest()
            elif not parent.can_reply:
                return HttpResponseBadRequest()
            else:
                print("parent")

                data['can_reply'] = True
                data['index'] = parent.index + 1
                data['recipient'] = parent.sender.id
                if parent.recipient is None:
                    data['can_reply'] = False

        data['sender'] = request.user.id

        serializer = MessageSerializer(data=data)
        if not serializer.is_valid():
            return Response({'serializer': serializer.errors})

        if parent is not None:
            parent.can_reply = False
            parent.save()

        serializer.save()
        return Response(status=HTTP_200_OK)
