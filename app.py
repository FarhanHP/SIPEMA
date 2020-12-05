from flask import Flask, g, render_template
from flask_cors import CORS
from pymongo import MongoClient
from setting import secretKey, cloudinarySetting
from controller.user import userController
from controller.student import studentController
from controller.log import logController
import cloudinary

cloudinary.config(
    cloud_name=cloudinarySetting["cloud_name"],
    api_key=cloudinarySetting["api_key"],
    api_secret=cloudinarySetting["api_secret"]
)

app = Flask(__name__, static_folder="./build/static", template_folder="./build")

app.config['SECRET_KEY'] = secretKey
app.config['CORS_ORIGINS'] = "*"
app.config['CORS_HEADERS'] = ['Content-Type']
app.debug = True
CORS(app)

app.register_blueprint(userController, url_prefix="/b/user")
app.register_blueprint(studentController, url_prefix="/b/student")
app.register_blueprint(logController, url_prefix="/b/log")

@app.teardown_appcontext
def teardown_db(a):
    db = g.pop("db", None)

    if db is not None:
        db.close()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__ == "__main__":
    app.run()