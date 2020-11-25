from flask import Blueprint, Response, request
from model import get_db
from setting import tokenExpire
from bson.objectid import ObjectId
import time

paymentController = Blueprint("paymentController", __name__)

@paymentController.route("/payment/<user>", methods=["GET", "POST", "PUT", "DELETE"])
def payment(user):
    collection = get_db()["payment"]

    if (request.method == "GET"):
        result = collection.find({"student_id": user})
        return {"msg": "success", "result": result}

    if (request.method == "POST"):
        inpData = request.get_json()
        result = collection.insert_one({"_id": ObjectId(),
                                        "student_id": user,
                                        "amount": inpData["amount"],
                                        "created": time.time()
                                        })
        
        return {"msg": "success", "result": result}

    if (request.method == "PUT"):
        inpData = request.get_json()

        result = collection.update_one({"_id": inpData["_id"]}, {"$set": inpData})

        if (result.matched_count == 0):
            return Response(response = "target id not found", status = 400)

        return ("msg": "success", "result": result)

    if (request.method == "DELETE"):
        inpData = request.get_json()

        result = collection.delete_one({"_id": inpData["_id"]})

        if (result.deleted_count == 0):
            return Response(response = "target id not found", status = 400)

        return {"msg": "success", "result": result}

    return {"msg": "unrecognized method", status = 405}
