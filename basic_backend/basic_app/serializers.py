from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['id', 'url',  'email', 'first_name','last_name', 'is_active', 'is_superuser']


class UserSerializeDetail(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['id', 'url',  'email', 'first_name','last_name', 'password', 'is_active', 'is_superuser']


class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['id', 'url',  'email', 'first_name','last_name', 'password', 'is_active', 'is_superuser']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance