from flask import Blueprint, Response, request
from model import get_db
from bson.objectid import ObjectId
from bson.errors import InvalidId
import time

studentController = Blueprint("studentController", __name__)

#teacher login required
@studentController.route("/set/<studentId>", methods=["PUT"])
def setStudent(studentId):
  try:
    if("token" in request.headers):
      db = get_db()

      token = request.headers["token"]

      loginToken = db["token"].find_one({"token" : token})

      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        teacher = db["teacher"].find_one({"user_id" : loginToken["user_id"]})

        if(teacher is not None):
          try:
            studentId = ObjectId(studentId)

          except InvalidId:
            return Response(status=404)

          approved = request.get_json()["approved"]

          res = db["student"].update_one({"_id" : studentId}, {"$set" : {
            "approved" : approved
          }})

          if(res.matched_count == 1):
            return Response(status=200)

          else:
            return Response(status=404)

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(response=e, status=500)
#teacher login required end
