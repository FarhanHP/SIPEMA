from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
import time

progressController = Blueprint("progressController", __name__)

@progressController.route("/progress/<user>", methods=["GET", "POST", "PUT", "DELETE"])
def progress(user):
    collection = get_db()["progress"]
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
        result = collection.find({"student_id": user})
        return {"msg": "success", "result": result}

    if (request.method == "POST"):
        inpData = request.get_json()
        result = collection.insert_one({"_id": ObjectId(),
                                       "student_id": user,
                                       "type": inpData["type"],
                                       "hal_awal": inpData["hal_awal"],
                                       "hal_akhir": inpData["hal_akhir"],
                                       "surat_awal": inpData["surat_awal"],
                                       "surat_akhir": inpData["surat_akhir"],
                                       "ayat_awal": inpData["ayat_awal"],
                                       "ayat_akhir": inpData["ayat_akhir"],
                                       "comment": inpData["comment"],
                                       "tanggal": inpData["tanggal"],
                                       "created": time.time()
                                        })

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "POST-ed progress: " + str({"_id": ObjectId(),
                                       "student_id": user,
                                       "type": inpData["type"],
                                       "hal_awal": inpData["hal_awal"],
                                       "hal_akhir": inpData["hal_akhir"],
                                       "surat_awal": inpData["surat_awal"],
                                       "surat_akhir": inpData["surat_akhir"],
                                       "ayat_awal": inpData["ayat_awal"],
                                       "ayat_akhir": inpData["ayat_akhir"],
                                       "comment": inpData["comment"],
                                       "tanggal": inpData["tanggal"],
                                       "created": time.time()
                                        }),
                              "created": created
                              })
        #end logging##########
        
        return {"msg": "success", "result": result}

    if (request.method == "PUT"):
        inpData = request.get_json()
        inpData["created"] = time.time()

        result = collection.update_one({"_id": inpData["_id"]}, {"$set": inpData})

        if (result.matched_count == 0):
            return Response(response = "target id not found", status = 400)

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "PUT-ed progress: " + str(inpData),
                              "created": created
                              })
        #end logging##########
        
        return ("msg": "success", "result": result)

    if (request.method == "DELETE"):
        inpData = request.get_json()

        result = collection.delete_one({"_id": inpData["_id"]})

        if (result.deleted_count == 0):
            return Response(response = "target id not found", status = 400)

        #logging##############
        db["log"].insert_one({"_id": ObjectId(),
                              "user_id": loginToken["user_id"],
                              "desc": "DELETE-ed progress",
                              "created": created
                              })
        #end logging##########
        
        return {"msg": "success", "result": result}

    return {"msg": "unrecognized method", status = 405}
