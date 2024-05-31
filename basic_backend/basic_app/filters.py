from django_filters.rest_framework import filterset, filters
from . import  models

class CustomUserFilter(filterset.FilterSet):
    email = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = models.CustomUser
        fields = ['email']