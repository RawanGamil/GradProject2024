from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length= 50,null=True)
    password = models.CharField(max_length=50,null=True)
    email = models.EmailField(max_length=255,null=True, unique=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    RewardPoints = models.PositiveIntegerField(max_length=50,null=True)

    def __str__(self):
        return self.username
    

class Task(models.Model):

    PRIORITY = (
        ('Urgent', 'Urgent')
        ('Important', 'Important')
        ('Mild', 'Mild')
    )

   
    userID = models.ForeignKey(User, null=True, on_delete= models.CASCADE)
    taskPoints = models.PositiveIntegerField(max_length=50,null=True)
    name= models.CharField(max_length=255,null=True)
    deadline = models.CharField(max_length=255,null=True)
    Completion_status = models.BooleanField(default=False)
    priority = models.CharField(max_length=200, null=True, choices= PRIORITY)

    def __str__(self):
        return self.name



class Games(models.Model):

    name = models.CharField(max_length= 50, null=True)
    price = models.PositiveIntegerField(max_length=50,null=True)

    def __str__(self):
        return self.name



class Conversation(models.Model):

    userID = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    creationDate= models.DateTimeField(auto_now_add=True, null=True) 


class Message(models.Model):

    SENDER = (
        ('User', 'User')
        ('Chatbot', 'Chatbot')
    )
    
    convID = user = models.ForeignKey(Conversation, null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True) 
    sentBy = models.CharField(max_length=200, null=True, choices= SENDER)





