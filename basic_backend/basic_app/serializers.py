from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['id', 'url',  'email', 'first_name','last_name', 'password', 'is_active', 'is_superuser']


