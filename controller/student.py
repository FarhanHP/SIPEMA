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
            student = db["student"].find_one({"_id" : studentId})

            db["log"].insert_one({
              "_id": ObjectId(),
              "user_id": teacher["user_id"],
              "desc": "menerima murid." if approved else "menendang murid",
              "created": time.time()
            })

            db["log"].insert_one({
              "_id": ObjectId(),
              "user_id": student["user_id"],
              "desc": "diterima sebagai murid." if approved else "ditendang.",
              "created": time.time()
            })

            return Response(status=200)

          else:
            return Response(status=404)

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(response=e, status=500)


@studentController.route("/get/<start>/<limit>/<approved>", methods=["GET"])
def getStudents(start, limit, approved):
  try:
    start = int(start)

    limit = int(limit)

    approved = approved.lower() == "true"

    if("token" in request.headers):
      token = request.headers["token"]

      db = get_db()

      loginToken = db["token"].find_one({"token" : token})

      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        userId = loginToken["user_id"]

        teacher = db["teacher"].find_one({"user_id" : userId})

        if(teacher is not None):
          students = db["student"].find({"approved" : approved}).sort("created", -1).skip(start).limit(limit)
          
          studentsCount = db["student"].find({"approved" : approved}).count()

          output = []

          for i in students:
            user = db["user"].find_one({"_id" : i["user_id"]})

            output.append({
              "_id" : str(i["_id"]),
              "user" : {
                "fullname" : user["fullname"],
                "pp" : user["pp"] if "pp" in user else None
              }
            })

          return {
            "students" : output,
            "count" : studentsCount
          }

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)
#teacher login required end

#teacher or student involved login required
@studentController.route("/get/<studentId>", methods=["GET"])
def getStudent(studentId):
  try:
    try:
      studentId = ObjectId(studentId)
    
    except InvalidId:
      return Response(status=404)

    if("token" in request.headers):
      token = request.headers["token"]
      db = get_db()
      loginToken = db["token"].find_one({"token" : token})
      currentTime = time.time()

      if(loginToken is not None and loginToken["expire"] > currentTime):
        userId = loginToken["user_id"]
        teacher = db["teacher"].find_one({"user_id" : userId})
        student = db["student"].find_one({"_id" : studentId})

        if(teacher is not None or (student is not None and student["user_id"] == userId)):
          studentUserId = student["user_id"]
          user = db["user"].find_one({"_id" : studentUserId})

          if(user is not None):
            return {
              "fullname" : user["fullname"],
              "email" : user["email"],
              "created" : user["created"],
              "pp" : user["pp"] if "pp" in user else None
            }

          else:
            return Response(status=404)

    return Response(status=401)

  except Exception as e:
    print(e)

    return Response(status=500, response=e)