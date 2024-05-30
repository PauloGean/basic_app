from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

# Create your models here.


from django.contrib.auth.models import AbstractUser, PermissionsMixin

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core import validators
# from django.utils.translation import ugettext_lazy as _
import re

import re

from django.db import models
from django.core import validators
from django.utils import timezone
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _


from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



class UserManager(BaseUserManager):

    def _create_user(self, username, email, password,  is_superuser, **extra_fields):
        now = timezone.now()
        # if not username:
        #   raise ValueError(_('The given username must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,
                 is_active=True,
                 is_superuser=is_superuser, last_login=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        return self._create_user(username, email, password, False,
                 **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        user=self._create_user(username, email, password, True,
                 **extra_fields)
        user.is_active=True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_('user name'), max_length=15)
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    email = models.EmailField(_('email address'), max_length=255, unique=True)
    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Designates whether this user should be treated as active. \
                    Unselect this instead of deleting accounts.'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None):
        send_mail(subject, message, from_email, [self.email])