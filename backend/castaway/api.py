from django.urls import path, include

from bottles.router import router as bottleRouter


urlpatterns = [
    path('', include(bottleRouter.urls)),
]
