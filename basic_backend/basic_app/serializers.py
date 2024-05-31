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
        extra_kwargs = {
            "password": {"write_only": True},
        }
    def create(self, validated_data):

        result = super(UserPasswordSerializer, self).create(validated_data)
        result.set_password(validated_data['password'])
        result.save()
        return result


    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password' and value != instance.password:
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance