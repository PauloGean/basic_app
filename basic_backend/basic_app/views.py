from django.db.models import Count
from rest_framework import viewsets
from basic_app.models import CustomUser
from basic_app import serializers
from rest_framework.response import Response
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = serializers.UserSerializeDetail
        return super(UserViewSet, self).retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.serializer_class = serializers.UserPasswordSerializer
        return super(UserViewSet, self).update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        self.serializer_class = serializers.UserSerializeDetail
        return super(UserViewSet, self).create(request, *args, **kwargs)

    @action(detail=False)
    def report_user(self, request, **kwargs):
        self.queryset = CustomUser.objects.all().values('is_superuser', 'is_active').annotate(total=Count('is_active'))
        return Response(self.queryset)
