from flask import g
from pymongo import MongoClient
from setting import mongodbPass

def get_db():
  if "db" not in g:
    g.db = MongoClient(f"mongodb+srv://sipema_admin:{mongodbPass}@cluster0.kp631.mongodb.net/<dbname>?retryWrites=true&w=majority")

  return g.db["sipema"]