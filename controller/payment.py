from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
from bson.errors import InvalidId
import time

paymentController = Blueprint("paymentController", __name__)

#teacher only
@paymentController.route("/get/total", methods=["GET"])
def getPaymentTotal():
    try:
        if("token" in request.headers):
            token = request.headers["token"]

            db = get_db()

            loginToken = db["token"].find_one({
                "token": token
            })

            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacher = db["teacher"].find_one({"user_id" : loginToken["user_id"]})

                if(teacher is not None):
                    total = 0

                    payments = db["payment"].find()

                    for i in payments:
                        total += i["amount"]

                    return {
                        "amount" : total
                    }

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@paymentController.route("/get/all/<start>/<limit>", methods=["GET"])
def getAllPayment(start, limit):
    try:
        start = int(start)
        limit = int(limit)

        if("token" in request.headers):
            token = request.headers["token"]
            db = get_db()
            loginToken = db["token"].find_one({"token" : token})
            currentTime = time.time()

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId})

                if(teacher is not None):
                    paymentCount = db["payment"].find().count()
                    payments = db["payment"].find().sort("tanggal", -1).skip(start).limit(limit)
                    students = {}
                    output = []
                    
                    for i in payments:
                        studentId = i["student_id"]
                        strStudentId = str(studentId)

                        if(strStudentId not in students):
                            studentQuery = db["student"].find_one({"_id" : studentId})
                            user = db["user"].find_one({"_id" : studentQuery["user_id"]})

                            students[strStudentId] = {
                                "student_id": strStudentId,
                                "fullname" : user["fullname"]
                            }

                        student = students[strStudentId]
                        output.append({
                            "_id" : str(i["_id"]),
                            "created" : i["created"],
                            "amount" : i["amount"],
                            "tanggal" : i["tanggal"],
                            "student" : student
                        })

                    return {
                        "payments" : output,
                        "count" : paymentCount
                    }

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

@paymentController.route("/create/<studentId>", methods=["POST"])
def createPayment(studentId):
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
                teacher = db["teacher"].find_one({"user_id" : teacherUserId })

                if(teacher is not None):
                    student = db["student"].find_one({"_id" : studentId})
                    
                    if(student is not None):
                        data = request.get_json()
                        amount = int(data["amount"])
                        tanggal = data["tanggal"]
                        studentUserId = student["user_id"]
                        
                        db["payment"].insert_one({
                            "student_id" : studentId,
                            "amount" : amount,
                            "tanggal" : tanggal,
                            "created" : currentTime
                        })

                        db["log"].insert_one({
                            "user_id" : teacherUserId,
                            "desc" : "menambahkan riwayat pembayaran murid.",
                            "created" : time.time()
                        })

                        db["log"].insert_one({
                            "user_id" : studentUserId,
                            "desc" : "riwayat pembayaran ditambahkan.",
                            "created" : time.time()
                        })

                        return Response(status=200)

                    else:
                        return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500)

@paymentController.route("/edit/<paymentId>", methods=["PUT"])
def editPayment(paymentId):
    try:
        try:
            paymentId = ObjectId(paymentId)
        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            token = request.headers["token"]
            currentTime = time.time()
            db = get_db()
            loginToken = db["token"].find_one({"token" : token})

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId })

                if(teacher is not None):
                    payment = db["payment"].find_one({"_id" : paymentId})
                    
                    if(payment is not None):
                        studentId = payment["student_id"]
                        student = db["student"].find_one({"_id" : studentId})

                        if(student is not None):
                            studentUserId = student["user_id"]
                            data = request.get_json()
                            amount = int(data["amount"])
                            tanggal = data["tanggal"]

                            db["payment"].update_one({"_id" : paymentId}, {"$set" : {
                                "amount" : amount,
                                "tanggal" : tanggal
                            }})

                            db["log"].insert_one({
                                "user_id" : teacherUserId,
                                "desc" : "mengedit riwayat pembayaran murid",
                                "created" : time.time()
                            })

                            db["log"].insert_one({
                                "user_id" : studentUserId,
                                "desc" : "riwayat pembayaran diedit",
                                "created" : time.time()
                            })

                            return Response(status=200)

                    return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500)

@paymentController.route("/delete/<paymentId>", methods=["DELETE"])
def deletePayment(paymentId):
    try:
        try:
            paymentId = ObjectId(paymentId)
        except InvalidId:
            return Response(status=404)

        if("token" in request.headers):
            token = request.headers["token"]
            currentTime = time.time()
            db = get_db()
            loginToken = db["token"].find_one({"token" : token})

            if(loginToken is not None and loginToken["expire"] > currentTime):
                teacherUserId = loginToken["user_id"]
                teacher = db["teacher"].find_one({"user_id" : teacherUserId })

                if(teacher is not None):
                    payment = db["payment"].find_one({"_id" : paymentId})
                    
                    if(payment is not None):
                        studentId = payment["student_id"]
                        student = db["student"].find_one({"_id" : studentId})

                        if(student is not None):
                            studentUserId = student["user_id"]

                            db["payment"].delete_one({"_id" : paymentId})

                            db["log"].insert_one({
                                "user_id" : teacherUserId,
                                "desc" : "menghapus riwayat pembayaran murid",
                                "created" : time.time()
                            })

                            db["log"].insert_one({
                                "user_id" : studentUserId,
                                "desc" : "riwayat pembayaran dihapus",
                                "created" : time.time()
                            })

                            return Response(status=200)

                    return Response(status=404)

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500)
#teacher only end

#teacher or involved student
@paymentController.route("/get/s/<studentId>/<start>/<limit>", methods=["GET"])
def getByPaymentByStudent(studentId, start, limit):
    try:
        try:
            studentId = ObjectId(studentId)
            start = int(start)
            limit = int(limit)

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
                student = db["student"].find_one({"_id" : studentId, "user_id" : userId})

                if(teacher is not None or student is not None):
                    paymentCount = db["payment"].find({"student_id" : studentId}).count()
                    payments = db["payment"].find({"student_id" : studentId}).sort("tanggal", -1).skip(start).limit(limit)
                    output = []

                    for i in payments:
                        output.append({
                            "_id" : str(i["_id"]),
                            "amount" : i["amount"],
                            "tanggal" : i["tanggal"],
                            "created" : i["created"]
                        })

                    return {
                        "payments" : output,
                        "count" : paymentCount
                    }

        return Response(status=401)

    except Exception as e:
        print(e)

        return Response(status=500, response=e)

