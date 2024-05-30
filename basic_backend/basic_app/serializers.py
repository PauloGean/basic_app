from rest_framework import serializers
from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['url',  'email', 'first_name','last_name', 'password', 'is_active', 'is_superuser']


