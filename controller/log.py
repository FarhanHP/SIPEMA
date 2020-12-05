from flask import Flask, Blueprint, Response, request
from bson.objectid import ObjectId
from model import get_db
import time

logController = Blueprint("logController", __name__)

#teacher login required
@logController.route("/get/<start>/<limit>", methods=["GET"])
def getLog(start, limit):
  try:
    start = int(start)

    limit = int(limit)

    if("token" in request.headers):
      db = get_db()

      token = request.headers["token"]

      loginToken = db["token"].find_one({"token" : token})

      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        userId = loginToken["user_id"]

        teacher = db["teacher"].find_one({
          "user_id" : userId
        })

        if(teacher is not None):
          logsCount = db["log"].find().count()

          logs = db["log"].find().sort("created", -1).skip(start).limit(limit)

          outputs = []

          users = {}

          for i in logs:
            userId = i["user_id"]

            strUserId = str(userId)

            if(strUserId not in users):
              user = db["user"].find_one({"_id" : userId})
              users[strUserId] = {
                "fullname" : user["fullname"],
                "pp" : user["pp"] if "pp" in user else None
              }

            outputs.append({
              "_id" : str(i["_id"]),
              "created" : i["created"],
              "desc" : i["desc"],
              "user" : users[strUserId]
            })

          return {
            "logs" : outputs,
            "total" : logsCount
          }
    
    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)

#teacher login required end