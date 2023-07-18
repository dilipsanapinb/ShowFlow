from flask import Flask,request
from flask_mysqldb import MySQL
from dotenv import load_dotenv

import bcrypt
import jwt
app=Flask(__name__)
load_dotenv()

import os 
app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']="Dilip@0123"
app.config['MYSQL_DB']='BookSpotOn'
mysql=MySQL(app)

@app.route('/')
def helloUser():
    return 'Welcome to the BooSpotOn: The leading booking app'


if __name__== '__main__':
    app.run()
    app.debug(True)
    

