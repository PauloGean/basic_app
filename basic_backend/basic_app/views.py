from django.db.models import Count
from rest_framework import viewsets
from basic_app.models import CustomUser
from basic_app.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False)
    def report_user(self, request, **kwargs):
        self.queryset = CustomUser.objects.all().values('is_superuser', 'is_active').annotate(total=Count('is_active'))
        return Response(self.queryset)
