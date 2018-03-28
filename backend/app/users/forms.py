import logging

from wtforms import Form
from wtforms import StringField
from wtforms import validators
from wtforms import PasswordField
from wtforms_alchemy import ModelForm, ModelFormField

from app.users.models import User

logger = logging.getLogger(__name__)


class UserForm(ModelForm):
    class Meta:
        model = User
