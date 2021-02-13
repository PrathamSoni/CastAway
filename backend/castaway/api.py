from django.urls import path, include

from bottles.router import router as bottleRouter
from auth.router import router as authRouter

urlpatterns = [
    path('', include(authRouter.urls)),
    path('', include(bottleRouter.urls)),
]
