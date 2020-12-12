from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire, loginTokenExpire
from bson.objectid import ObjectId
from bson.errors import InvalidId
from werkzeug.security import generate_password_hash, check_password_hash
import time
import secrets
from email_auto import sendEmail
import cloudinary.uploader

userController = Blueprint("userController", __name__)

@userController.route("/login", methods=["POST"])
def login():
  try:
    data = request.get_json()

    email = data["email"].lower()

    password = data["password"]

    db = get_db()

    user = db["user"].find_one({"email" : email})

    if(user is None):
      return Response(status=404)

    else:
      if(check_password_hash(user["password"], password)):
        token = secrets.token_hex(32)

        userId = user["_id"]

        created = time.time()

        expire = created + loginTokenExpire

        #only one login token for one user allowed
        db["token"].delete_many({
          "user_id" : userId
        })

        db["token"].insert_one({
          "token" : token,
          "user_id" : userId,
          "created" : created,
          "expire" : expire
        })
        
        #logging
        db["log"].insert_one({
          "_id": ObjectId(),
          "user_id": userId,
          "desc": "login",
          "created": time.time()
        })
        #logging end

        return {
          "token" : token
        }

      else:
        return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500)

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

    sendEmail(email, "Pendaftaran SIPEMA", f"Halo, {fullname}.\n\nSelangkah lagi untuk bergabung ke SIPEMA dengan klik tautan di bawah ini untuk mengkonfirmasi email anda:\n\nhttps://sipema.herokuapp.com/register/token/{token}\n\nSalam hangat.\n\n-Tim SIPEMA")

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
        _id = ObjectId()

        created = time.time()

        db["user"].insert_one({
          "_id" : _id,
          "email" : registerToken["email"],
          "password" : registerToken["password"],
          "fullname" : registerToken["fullname"],
          "created" : created
        })

        db["student"].insert_one({
          "user_id" : _id,
          "approved" : False,
          "created" : created
        })

        token = secrets.token_hex(32)

        created = time.time()

        expire = created + loginTokenExpire

        db["token"].insert_one({
          "token" : token,
          "user_id" : _id,
          "created" : created,
          "expire" : expire
        })

        #logging
        db["log"].insert_one({
          "_id": ObjectId(),
          "user_id": _id,
          "desc": "berhasil mendaftar.",
          "created": time.time()
        })
        #logging end
        
        return {
          "token" : token
        }

    else:
      return Response(status=403)

  except Exception as e:
    print(e)

    return Response(response=e, status=500)

@userController.route("/password/reset", methods=["POST"])
def resetPasswordRequest():
  try:
    data = request.get_json()

    email = data["email"]

    db = get_db()

    user = db["user"].find_one({
      "email" : email
    })

    if(user is not None):
      userId = user["_id"]

      fullname = user["fullname"]

      #delete duplicate
      db["reset_password_token"].delete_many({
        "user_id" : userId
      })

      token = secrets.token_hex(32)

      created = time.time()

      expire = created + tokenExpire

      db["reset_password_token"].insert_one({
        "user_id" : userId,
        "token" : token,
        "created" : created,
        "expire" : expire
      })
      
      sendEmail(email, "Permintaan Reset Password", f"Halo, {fullname}.\n\nSilakan klik link di bawah ini untuk mereset password anda:\n\nhttps://sipema.herokuapp.com/password/reset/token/{token}\n\nSalam hangat.\n\n-Tim SIPEMA")

      #logging
      db["log"].insert_one({
        "_id": ObjectId(),
        "user_id": userId,
        "desc": "meminta reset password.",
        "created": time.time()
      })
      #logging end

      return Response(status=200)

    else:
      return Response(status=404)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

@userController.route("/password/reset/check/token/<token>", methods=["GET"])
def checkResetPasswordToken(token):
  try:
    db = get_db()

    resetPasswordToken = db["reset_password_token"].find_one({
      "token" : token
    })

    if(resetPasswordToken is None):
      return Response(status=404)

    else:
      currentTime = time.time()

      if(resetPasswordToken["expire"] <= currentTime):
        return Response(status=401)

      else:
        return Response(status=200)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

@userController.route("/password/reset/token/<token>", methods=["PUT"])
def resetPassword(token):
  try:
    db = get_db()

    data = request.get_json()

    resetPasswordToken = db["reset_password_token"].find_one({"token" : token})

    if(resetPasswordToken is None):
      return Response(status=404)
    
    else:
      db["reset_password_token"].delete_one({"token" : token})

      currentTime = time.time()

      if(resetPasswordToken["expire"] <= currentTime):
        return Response(status=401)

      else:
        password = data["password"]

        db["user"].update_one({
          "_id" : resetPasswordToken["user_id"]
        }, {"$set" : {
          "password" : generate_password_hash(password)
        }})
        
        #logging
        db["log"].insert_one({
          "_id": ObjectId(),
          "user_id": resetPasswordToken["user_id"],
          "desc": "mereset password.",
          "created": time.time()
        })
        #logging end
        
        return Response(status=200)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

#login user only
@userController.route("/profile", methods=["GET"])
def getProfile():
  try:
    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({"token" : token})

      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        user = db["user"].find_one({
          "_id" : loginToken["user_id"]
        })

        teacher = db["teacher"].find_one({"user_id" : user["_id"]})
        student = db["student"].find_one({"user_id" : user["_id"]})

        isTeacher = teacher is not None

        approved = None

        if(student is not None):
          approved = student["approved"]

        return {
          "_id" : str(user["_id"]),
          "fullname" : user["fullname"],
          "email" : user["email"],
          "role" : "teacher" if isTeacher else "student",
          "approved_student" : approved,
          "created" : user["created"],
          "pp" : user["pp"] if "pp" in user else None
        }

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

@userController.route("/logout", methods=["DELETE"])
def logout():
  try:
    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({
        "token" : token
      })

      if(loginToken is not None):
        db["token"].delete_one({
          "token" : token
        })

        #logging
        db["log"].insert_one({
          "_id": ObjectId(),
          "user_id": loginToken["user_id"],
          "desc": "log out.",
          "created": time.time()
        })
        #logging end

        return Response(status=200)

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

@userController.route("/profile/set", methods=["PUT"])
def edit():
  try:
    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({
        "token" : token
      })

      currentTime = time.time()

      if(loginToken is None or loginToken["expire"] <= currentTime):
        return Response(status=401)

      else:
        dataJson = request.get_json()

        data = {}

        forbiddenProperties = ["password", "email", "created", "pp", "public_id"]

        for i in dataJson:
          if(i not in forbiddenProperties):
            data[i] = dataJson[i]

        userId = loginToken["user_id"]

        result = db["user"].update_one({"_id" : userId}, {"$set" : data})

        #logging
        db["log"].insert_one({
          "_id": ObjectId(),
          "user_id": userId,
          "desc": "telah menyunting profil.",
          "created": time.time()
        })
        #logging end

        if(result.matched_count == 1):
          return Response(status=200)

        else:
          return Response(status=404)
  
    else:
      return Response(status=401)

  except Exception as e:
    print(e)
    return Response(status=500, response=e)

@userController.route("/profile/picture/set", methods=["PUT"])
def changeProfilePhoto():
  try:
    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({"token" : token})

      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        userId = loginToken["user_id"]

        user = db["user"].find_one({"_id" : userId})

        photo = request.files.get("photo")

        res = cloudinary.uploader.upload(photo)

        if("public_id" in user):
          cloudinary.uploader.destroy(user["public_id"])

        db["user"].update_one({"_id" : userId}, {"$set" : {
          "public_id" : res["public_id"],
          "pp" : res["secure_url"]
        }})

        db["log"].insert_one({
          "user_id" : userId, 
          "desc" : "mengganti foto profil", 
          "created" : time.time()
        })

        return {"pp" : res["secure_url"]}

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

@userController.route("/password/set", methods=["PUT"])
def changePassword():
  try:
    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({
        "token" : token
      })

      currentTime = time.time()

      if(loginToken is None or loginToken["expire"] <= currentTime):
        return Response(status=401)

      else:
        data = request.get_json()

        oldPassword = data["old_password"]

        newPassword = data["new_password"]

        userId = loginToken["user_id"]

        user = db["user"].find_one({"_id" : userId})

        if(user is not None):
          if(check_password_hash(user["password"], oldPassword)):
            db["user"].update_one({
              "_id" : userId
            }, {
              "$set" : {
                "password" : generate_password_hash(newPassword)
              }
            })

            #logging
            db["log"].insert_one({
              "_id": ObjectId(),
              "user_id": userId,
              "desc": "mengubah password.",
              "created": time.time()
            })
            #logging end

            return Response(status=200)

          else:
            return Response(status=401, response="wrong password")

        else:
          return Response(status=404)

    else:
      return Response(status=401)

  except Exception as e:
    print(e)
    return Response(status=500, response=e)
#login user only end
