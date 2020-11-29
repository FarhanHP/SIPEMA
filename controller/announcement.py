from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
import time

announcementController = Blueprint("announcementController", __name__)

@announcementController.route("/announcement", methods = ["GET", "POST", "PUT", "DELETE"])
def announcement():
    db = get_db()
    try:
        if("token" in request.headers):
            token = request.headers["token"]

        loginToken = db["token"].find_one({
            "token" : token
          })
        
        if(loginToken is None):
            return {"msg": "unrecognized token", status = 400}
        
    except Exception as e:
        print(e)
        return Response(status=500, response=e)
    
    if (request.method == "GET"):

        data = db["announcement"].find()

        return {"msg": "success", "result": data}

    if (request.method == "POST"):

        inpData = request.get_json()

        generatedID = ObjectId()

        created = time.time()

        result = db["announcement"].insert_one({"_id": generatedID,
                                       "teacher_id": inpData["teacher_id"],
                                       "title": inpData["title"],
                                       "body": inpData["body"],
                                       "public": inpData["public"],
                                       "created": created})

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "POST-ed announcement: " + str({"teacher_id": inpData["teacher_id"],
                                       "title": inpData["title"],
                                       "body": inpData["body"],
                                       "public": inpData["public"],
                                       "created": created}),
                              "created": created
                              })
        #end logging##########
        
        return {"msg": "success", "result": result}

    if (request.method == "PUT"):

        inpData = request.get_json()

        targetID = inpData["_id"]

        result = db["announcement"].update_one({"_id": targetID}, {"$set": inpData})

        if (result.matched_count == 0):
            return Response(response = "target id not found", status = 400)

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "PUT-ed announcement: " + str(inpData)),
                              "created": created
                              })
        #end logging##########
        
        return {"msg": "success", "result": result}

    if (request.method == "DELETE"):

        inpData = request.get_json()

        result = db["announcement"].delete_one({"_id": inpData["_id"]})

        if (result.deleted_count == 0):
            return Response(response = "target id not found", status = 400)

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "DELETE-ed announcement",
                              "created": created
                              })
        #end logging##########
        
        return {"msg": "success", "result": result}


    return {"msg": "unrecognized method", status = 405}
