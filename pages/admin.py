from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Task)
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Games)