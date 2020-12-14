from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
from bson.errors import InvalidId
import time

announcementController = Blueprint("announcementController", __name__)

@announcementController.route("/detail/<announcementId>", methods=["GET"])
def getDetailAnnouncement(announcementId):
    try:
        try:
            announcementId = ObjectId(announcementId)
        
        except InvalidId:
            return Response(status=404)

        db = get_db()

        teacherId = None

        if("token" in request.headers):
            token = request.headers["token"]

            loginToken = db["token"].find_one({"token" : token})

            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacher = db["teacher"].find_one({"user_id" : loginToken["user_id"]})

                if(teacher is not None):
                    teacherId = teacher["_id"]

        announcement = db["announcement"].find_one({"_id" : announcementId})

        if(announcement is not None):
            teacher = db["teacher"].find_one({
                "_id" : announcement["teacher_id"]
            })

            user = db["user"].find_one({
                "_id" : teacher["user_id"]
            })

            return {
                "teacher": {
                    "fullname" : user["fullname"],
                    "pp" : user["pp"] if "pp" in user else None
                },
                "created" : announcement["created"],
                "body" : announcement["body"],
                "title" : announcement["title"],
                "is_owner" : teacher["_id"] == teacherId
            }

        return Response(status=404)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@announcementController.route("/get/<start>/<limit>", methods=["GET"])
def getAnnouncements(start, limit):
    try:
        start = int(start)
        limit = int(limit)
        db = get_db()

        teacherId = None

        if("token" in request.headers):
            token = request.headers["token"]

            loginToken = db["token"].find_one({"token" : token})

            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacher = db["teacher"].find_one({
                    "user_id" : loginToken["user_id"]
                })

                if(teacher is not None):
                    teacherId = teacher["_id"]

        announcements = db["announcement"].find().sort("created", -1).skip(start).limit(limit)

        announcementsCount = db["announcement"].find().count()

        output = []

        for i in announcements:
            body = i["body"].split("\n")[0]

            body = f"{body[0:100]}..." if len(body) > 103 else body

            output.append({
                "_id" : str(i["_id"]),
                "title" : i["title"],
                "body" : body,
                "created" : i["created"],
                "is_owner" : i["teacher_id"] == teacherId
            })

        return {
            "announcements" : output,
            "count" : announcementsCount
        }

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

#teacher login required
@announcementController.route("/create", methods=["POST"])
def createAnnouncement():
    try:
        if("token" in request.headers):
            token = request.headers["token"]

            db = get_db()

            loginToken = db["token"].find_one({
                "token" : token
            })

            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                userId = loginToken["user_id"]

                teacher = db["teacher"].find_one({"user_id" : userId})

                if(teacher is not None):
                    data = request.get_json()

                    announcementId = ObjectId()

                    announcement = {
                        "_id" : announcementId,
                        "title" : data["title"],
                        "teacher_id" : teacher["_id"],
                        "body" : data["body"],
                        "created" : time.time()
                    }

                    db["announcement"].insert_one(announcement)

                    db["log"].insert_one({
                        "user_id" : userId,
                        "desc" : "membuat pengumuman.",
                        "created" : time.time()
                    })

                    return Response(status=200)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@announcementController.route("/edit/<announcementId>", methods=["PUT"])
def editAnnouncement(announcementId):
    try:
        try:
            announcementId = ObjectId(announcementId)
        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            token = request.headers["token"]
            
            currentTime = time.time()
            
            db = get_db()
            
            loginToken = db["token"].find_one({
                "token" : token
            })

            if(loginToken is not None and loginToken["expire"] > currentTime):
                userId = loginToken["user_id"]

                teacher = db["teacher"].find_one({"user_id" : userId})

                if(teacher is not None):
                    data = request.get_json()

                    res = db["announcement"].update_one({
                        "_id" : announcementId, 
                        "teacher_id" : teacher["_id"]
                    }, {"$set" : data})

                    if(res.matched_count == 1):
                        db["log"].insert_one({
                            "user_id" : userId,
                            "desc" : "menyunting pengumuman.",
                            "created" : time.time()
                        })

                        return Response(status=200)
                    
                    else:
                        return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@announcementController.route("/delete/<announcementId>", methods=["DELETE"])
def deleteAnnouncement(announcementId):
    try:
        try:
            announcementId = ObjectId(announcementId)

        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            db = get_db()

            token = request.headers["token"]

            loginToken = db["token"].find_one({"token" : token})

            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                userId = loginToken["user_id"]

                teacher = db["teacher"].find_one({"user_id" : userId})

                if(teacher is not None):
                    res = db["announcement"].delete_one({
                        "_id" : announcementId,
                        "teacher_id" : teacher["_id"]
                    })

                    if(res.deleted_count == 1):
                        db["log"].insert_one({
                            "user_id" : userId,
                            "desc" : "menghapus pengumuman.",
                            "created" : time.time()
                        })

                        return Response(status=200)

                    else:
                        return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)
#teacher login required end