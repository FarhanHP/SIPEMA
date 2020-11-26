import os

sipemaEmail = {
  "email" : "contact.sipema@gmail.com",
  "password" : os.environ["sipema.email.password"]
}

mongodbPass = os.environ["sipema.mongodb.password"]

secretKey = os.environ["sipema.secret_key"]

tokenExpire = 7200 #2 hours in seconds

loginTokenExpire = 604800 #1 week in seconds