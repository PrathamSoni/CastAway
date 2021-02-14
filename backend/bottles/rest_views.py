from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import LimitOffsetPagination

from .serializers import MessageSerializer
from authorization.models import BankInfo

from django.shortcuts import get_object_or_404

from django.db.models import F
from django.http import HttpResponseBadRequest
from rest_framework import viewsets

from .models import Message

import logging

logger = logging.getLogger('testlogger')
from django.utils import timezone
import requests


class BottleViewset(viewsets.ModelViewSet):
    queryset = Message.objects.none()
    paginator = LimitOffsetPagination()
    serializer_class = MessageSerializer

    def retrieve(self, request, pk=None):
        queryset = Message.objects.all()
        message = get_object_or_404(queryset, pk=pk)

        if request.user != message.sender:
            if message.created > timezone.now() - message.tta:
                return HttpResponseBadRequest()

        if message.recipient is not None:
            if request.user != message.recipient and request.user != message.sender:
                return HttpResponseBadRequest()

        status = None
        if request.user != message.sender and not message.opened:
            message.recipient = request.user
            if "lat" in request.query_params.keys():
                message.lat = request.query_params['lat']
            if "long" in request.query_params.keys():
                message.long = request.query_params['long']
            message.opened = True
            if message.amount != 0:
                try:
                    url = "https://api.sandbox.checkbook.io/v3/check/digital"
                    payload = {
                        "recipient": request.user.email,
                        "name": request.user.first_name + " " + request.user.first_name,
                        "amount": message.amount,
                        "description": "Sent with love via Checkbook.io",
                    }
                    print(BankInfo.objects.all())
                    info = BankInfo.objects.get(user_id=message.sender.email)
                    print(info)
                    headers = {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "{}:{}".format(info.key, info.secret),
                    }
                    print(headers)
                    r = requests.request("POST", url, json=payload, headers=headers)
                    status = "Accept" in r.text
                except:
                    pass

            message.save()
        # opened successfully
        serializer = MessageSerializer(message, context={'request': request})

        data = serializer.data
        if not data["dm"] and request.user != message.sender:
            data.pop("sender", None)
        data['status'] = status
        return Response(data)

    def list(self, request):
        page = self.paginator.paginate_queryset(
            Message.objects.filter(dm=False, opened=False, created__lte=timezone.now() - F('tta')), self.request)
        if page is not None:
            serializer = MessageSerializer(page, context={'request': request}, many=True)
            data = serializer.data
            for datum in data:
                datum.pop("content", None)
                datum.pop("sender", None)
            return self.paginator.get_paginated_response(data)
        else:
            return None

    @action(detail=False)
    def sent(self, request):
        page = self.paginator.paginate_queryset(Message.objects.filter(sender=request.user), self.request)
        if page is not None:
            serializer = MessageSerializer(page, context={'request': request}, many=True)
            data = serializer.data
            for datum in data:
                datum.pop("sender", None)
            return self.paginator.get_paginated_response(data)
        else:
            return None

    @action(detail=False)
    def received(self, request):
        page = self.paginator.paginate_queryset(
            Message.objects.filter(recipient=request.user, created__lte=timezone.now() - F('tta')), self.request)
        if page is not None:
            serializer = MessageSerializer(page, context={'request': request}, many=True)
            data = serializer.data
            for datum in data:
                datum.pop("sender",None)
            return self.paginator.get_paginated_response(data)
        else:
            return None

    def create(self, request):
        data = request.data
        try:
            data._mutable = True
        except:
            pass
        parent = None
        if "parent" in data.keys() and data["parent"] is not None and data["parent"] != "":
            parent = Message.objects.get(id=data["parent"])
            print(parent.index)
            if parent.recipient is not None:
                if request.user != parent.recipient:
                    return HttpResponseBadRequest()
            if not parent.can_reply:
                return HttpResponseBadRequest()

            data['can_reply'] = True
            data['index'] = parent.index + 1
            data['recipient'] = parent.sender.username
            if parent.recipient is None:
                data['can_reply'] = False
            data['dm'] = parent.dm

        else:
            data['can_reply'] = True
            if "recipient" in data.keys() and data["recipient"] is not None and data["recipient"] != "":
                data['dm'] = True
            else:
                data['dm'] = False

        serializer = MessageSerializer(data=data)
        if not serializer.is_valid():
            return Response({'serializer': serializer.errors})

        if parent is not None:
            parent.can_reply = False
            parent.save()

        serializer.save(request.user, data["recipient"])
        return Response(status=HTTP_200_OK)
