from flask import Blueprint, Response, request
from model import get_db
from bson.objectid import ObjectId
from bson.errors import InvalidId
import time

progressController = Blueprint("progressController", __name__)

#teacher login required
@progressController.route("/create/s/<studentId>", methods=["POST"])
def createProgress(studentId):
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
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId})

                if(teacher is not None):
                    student = db["student"].find_one({"_id" : studentId})

                    if(student is not None):
                        studentUserId = student["user_id"]
                        data = request.get_json()
                        tipe = int(data["type"])

                        progress = {
                            "student_id" : studentId,
                            "type" : tipe,
                            "comment" : data["comment"],
                            "tanggal" : data["tanggal"],
                            "created" : time.time()
                        }
                        
                        #iqra
                        if(tipe == 0):
                            progress["hal_awal"] = int(data["hal_awal"])
                            progress["hal_akhir"] = int(data["hal_akhir"])

                        #quran
                        else:
                            progress["surat_awal"] = data["surat_awal"]
                            progress["surat_akhir"] = data["surat_akhir"]
                            progress["ayat_awal"] = int(data["ayat_awal"])
                            progress["ayat_akhir"] = int(data["ayat_akhir"])

                        db["progress"].insert_one(progress)

                        db["log"].insert_one({
                            "user_id" : teacherUserId,
                            "desc" : "menambahkan riwayat bacaan.",
                            "created" : time.time()
                        })

                        db["log"].insert_one({
                            "user_id" : studentUserId,
                            "desc" : "riwayat bacaan ditambahkan.",
                            "created" : time.time()
                        })

                        return Response(status=200)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@progressController.route("/edit/<progressId>", methods=["PUT"])
def editProgress(progressId):
    try:
        try:
            progressId = ObjectId(progressId)
        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            token = request.headers["token"]
            db = get_db()
            loginToken = db["token"].find_one({"token" : token})
            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId})

                if(teacher is not None):
                    progress = db["progress"].find_one({"_id" : progressId})

                    if(progress is not None):
                        student = db["student"].find_one({"_id" : progress["student_id"]})

                        if(student is not None):
                            studentUserId = student["user_id"]
                            data = request.get_json()
                            tipe = data["type"]
                            newProgress = {
                                "type" : tipe,
                                "comment" : data["comment"],
                                "tanggal" : data["tanggal"]
                            }

                            if(tipe == 0):
                                newProgress["hal_awal"] = int(data["hal_awal"])
                                newProgress["hal_akhir"] = int(data["hal_akhir"])

                            else:
                                newProgress["surat_awal"] = data["surat_awal"]
                                newProgress["surat_akhir"] = data["surat_akhir"]
                                newProgress["ayat_awal"] = data["ayat_awal"]
                                newProgress["ayat_akhir"] = data["ayat_akhir"]

                            db["progress"].update_one({"_id" : progressId}, {"$set" : newProgress})

                            db["log"].insert_one({
                                "user_id" : teacherUserId,
                                "desc" : "mengedit riwayat bacaan murid.",
                                "created" : time.time()
                            })

                            db["log"].insert_one({
                                "user_id" : studentUserId,
                                "desc" : "riwayat bacaan diedit",
                                "created" : time.time()
                            })

                            return Response(status=200)

                    return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@progressController.route("/delete/<progressId>", methods=["DELETE"])
def deleteProgress(progressId):
    try:
        try:
            progressId = ObjectId(progressId)
        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            token = request.headers["token"]
            db = get_db()
            loginToken = db["token"].find_one({"token" : token})
            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId})

                if(teacher is not None):
                    progress = db["progress"].find_one({"_id" : progressId})

                    if(progress is not None):
                        student = db["student"].find_one({"_id" : progress["student_id"]})

                        if(student is not None):
                            studentUserId = student["user_id"]
                            db["progress"].delete_one({
                                "_id" : progressId
                            })
                            db["log"].insert_one({
                                "user_id" : teacherUserId,
                                "desc" : "menghapus riwayat bacaan murid.",
                                "created" : time.time()
                            })
                            db["log"].insert_one({
                                "user_id" : studentUserId,
                                "desc" : "riwayat bacaan murid dihapus.",
                                "created" : time.time()
                            })

                            return Response(status=200)

                    return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)
#teacher login required end

#teacher login or involved student required
@progressController.route("/get/s/<studentId>/<start>/<limit>", methods=["GET"])
def getProgressByStudent(studentId, start, limit):
    try:
        start = int(start)
        limit = int(limit)

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
                student = db["student"].find_one({"_id" : studentId, "user_id" : userId})

                if(teacher is not None or student is not None):
                    count = db["progress"].find({"student_id" : studentId}).count()
                    progresses = db["progress"].find({"student_id" : studentId}).sort("tanggal", -1).skip(start).limit(limit)
                    output = []
                    
                    for i in progresses:
                        tipe = i["type"]
                        progress = {
                            "_id" : str(i["_id"]),
                            "type" : tipe,
                            "created" : i["created"],
                            "tanggal" : i["tanggal"],
                            "comment" : i["comment"]
                        }

                        #iqra
                        if(tipe == 0):
                            progress["hal_awal"] = i["hal_awal"]
                            progress["hal_akhir"] = i["hal_akhir"]

                        #quran
                        else:
                            progress["surat_awal"] = i["surat_awal"]
                            progress["surat_akhir"] = i["surat_akhir"]
                            progress["ayat_awal"] = i["ayat_awal"]
                            progress["ayat_akhir"] = i["ayat_akhir"]

                        output.append(progress)

                    return {
                        "progresses" : output,
                        "count" : count
                    }

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)
#teacher login or involved student required end