from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import time
import secrets
from email_auto import sendEmail

userController = Blueprint("userController", __name__)

@userController.route("/register/request", methods=["POST"])
def registerRequest():
  try:
    db = get_db()

    data = request.get_json()

    email = data["email"].lower()

    #check email
    user = db["user"].find_one({"email" : email})

    if(user is not None):
      return Response(status=409)

    #delete duplicate token
    db["register_token"].delete_many({
      "email" : email
    })

    tokenId = ObjectId()

    created = time.time()

    expire = created + tokenExpire

    token = secrets.token_hex(32)

    fullname = data["fullname"].lower()

    db["register_token"].insert_one({
      "_id" : tokenId,
      "email" : email,
      "fullname" : fullname,
      "password" : generate_password_hash(data["password"]),
      "created" : created,
      "expire" : expire,
      "token" : token
    })

    sendEmail(email, "Pendaftaran SIPEMA", f"Halo, {fullname}.\n\nSelangkah lagi untuk bergabung ke SIPEMA dengan klik tautan di bawah ini untuk mengkonfirmasi email anda:\n\nhttps://sipema.herokuapp.com/register/token/{token}\n\nSalam hangat.\n\nTim SIPEMA")

    return Response(status=200)

  except Exception as e:
    print(e)

    return Response(response=e, status=500)

@userController.route("/register/token/<token>", methods=["PUT"])
def register(token):
  try:
    db = get_db()

    registerToken = db["register_token"].find_one({
      "token" : token
    })

    if(registerToken is not None):
      #delete token
      db["register_token"].delete_one({
        "token" : token
      })

      currentTime = time.time()

      #check token expired
      if(registerToken["expire"] <= currentTime):
        return Response(status=401)

      else:
        db["user"].insert_one({
          "email" : registerToken["email"],
          "password" : registerToken["password"],
          "fullname" : registerToken["fullname"],
          "created" : time.time()
        })

        return Response(status=200)

    else:
      return Response(status=403)

  except Exception as e:
    print(e)

    return Response(response=e, status=500)