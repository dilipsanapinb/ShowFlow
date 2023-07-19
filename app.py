from flask import Flask,request,jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
load_dotenv()
import os 
import bcrypt
import jwt
from  functools import wraps
app=Flask(__name__)



app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']="Dilip@0123"
app.config['MYSQL_DB']='BookSpotOn'
mysql=MySQL(app)

@app.route('/')
def helloUser():
    return 'Welcome to the BooSpotOn: The leading booking app'
@app.route('/api/user',methods=["POST"])
def create_user():
    try:
        user_data = request.json
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        role = user_data['role']
        membership = user_data['membership']

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO user (username, email, password, role, membership) VALUES (%s, %s, %s, %s, %s)", (username, email, hashed_password, role, membership))
        mysql.connection.commit()
        cur.close()

        return 'User created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# login route
@app.route('/api/login',methods=['POST'])
def login():
    try:
        login_data = request.json
        email = login_data['email']
        password = login_data['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, email, password FROM user WHERE email=%s", (email,))
        user = cur.fetchone()
        cur.close()

        if user:
            stored_password = user[2].encode('utf-8')
            if bcrypt.checkpw(password.encode('utf-8'), stored_password):
                # Generate the JSON Web Token
                token = jwt.encode({'user_id': user[0]}, os.getenv("SECRET_KEY"), algorithm='HS256')
                return {'token': token}
            else:
                return 'Invalid username or password'
        else:
            return 'Invalid username or password'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500


# verify token function
def authenticate(func):
    @wraps(func)
    def warapper(*args, **kwargs):
        token=request.headers.get('Authorization')

        if not token:
            return 'Missing the token is request',401
        
        try:
            decoded_token=jwt.decode(token,os.getenv('SECRET_KEY'))
            user_id=decoded_token['user_id']
        except jwt.ExpiredSignatureError:
            return 'Token expired',401
        except jwt.InvalidTokenError:
            return 'Invalid token',401
    return warapper

# get a list of all users
@app.route('/api/users',methods=['GET'])
@authenticate
def getAllUser():
    try:
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM user")
        users=cur.fetchall()
        cur.close()

        user_list=[]
        for user in users:
                    user_data={
                        'id':user[0],
                        "username":user[1],
                        "email":user[2],
                        "password":user[3],
                        "role":user[4],
                        "membership":user[5]
                    }
                    user_list.append(user_data)

        return jsonify(user_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a user by id
@app.route('/api/users/<user_id>',methods=['GET'])
@authenticate
def getUserById(user_id):
    try:
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM user WHERE id=%s",(user_id,))
        user=cur.fetchone()
        cur.close()

        if user:
            user_data={
                'id':user[0],
                "username":user[1],
                "email":user[2],
                "password":user[3],
                "role":user[4],
                "membership":user[5]
            }
            return jsonify(user_data)
        else:
            return "User not found",404
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # update a specific user info
@app.route('/api/users/<user_id>',methods=['PUT'])
def update_user(user_id):
    try:
        user_data=request.json
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        role = user_data['role']
        membership = user_data['membership']
        hashed_password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cur=mysql.connection.cursor()
        cur.execute("UPDATE user SET username=%s,email=%s,password=%s,role=%s,membership=%s WHERE id=%s",(username,email,hashed_password,role,membership,user_id))
        mysql.connection.commit()
        cur.close()
        return "User updated successfully"
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # delete a specific user

@app.route('/api/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM user WHERE id = %s", (user_id,))
        mysql.connection.commit()
        cur.close()

        return 'User deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500


# # Movies Routes
# #create a new movie
@app.route('/api/movies',methods=['POST'])
@authenticate
def create_movie():
    try:
        movie_data = request.json
        title = movie_data['title']
        description = movie_data['description']
        genre = movie_data['genre']
        duration = movie_data['duration']
        language = movie_data['language']
        release_date=movie_data['release_date']
        director=movie_data['director']
        cast=movie_data['cast']
        image=movie_data['image']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO movie (title,description,genre,duration,language,release_date,director,cast,image) VALUES (%s, %s, %s, %s, %s,%s,%s,%s,%s)", (title,description,genre,duration,language,release_date,director,cast,image))
        mysql.connection.commit()
        cur.close()

        return 'Movie created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a list of all movies
@app.route('/api/movies',methods=['GET'])
@authenticate
def getAllMovies():
    try:
        cur=mysql.connection.cursor()
        cur.execute("SELECT * FROM movie")
        movies=cur.fetchall()
        cur.close()

        movie_list=[]
        for movie in movies:
                    movie_data={
                        "id":movie[0],
                        "title":movie[1],
                        "description":movie[2],
                        "genre":movie[3],
                        "duration":movie[4],
                        "language":movie[5],
                        "release_date":movie[6],
                        "director":movie[7],
                        "cast":movie[8],
                        'image':movie[9]
                    }
                    movie_list.append(movie_data)

        return jsonify(movie_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a movie by id
@app.route('/api/movies/<movie_id>',methods=['GET'])
@authenticate
def getMovieByID(movie_id):
    try:
        cur=mysql.connection.cursor()
        cur.execute("SELECT * from movie Where id=%s",(movie_id))
        movie=cur.fetchone()
        cur.close

        if movie:
            movie_data={
                            "id":movie[0],
                            "title":movie[1],
                            "description":movie[2],
                            "genre":movie[3],
                            "duration":movie[4],
                            "language":movie[5],
                            "release_date":movie[6],
                            "director":movie[7],
                            "cast":movie[8],
                            'image':movie[9]
                        }
            return jsonify(movie_data)
        else:
            return "Movie Not found",404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # update a movie by id 
@app.route('/api/movies/<movie_id>',methods=['PUT'])
def update_movie(movie_id):
    try:
        movie_data=request.json
        title = movie_data['title']
        description = movie_data['description']
        genre = movie_data['genre']
        duration = movie_data['duration']
        language = movie_data['language']
        release_date=movie_data['release_date']
        director=movie_data['director']
        cast=movie_data['cast']
        image=movie_data['image']
        
        cur=mysql.connection.cursor()
        cur.execute("UPDATE movie SET title=%s,description=%s,genre=%s,duration=%s,language=%s,release_date=%s,director=%s,cast=%s,image=%s WHERE id=%s",(title,description,genre,duration,language,release_date,director,cast,image,movie_id))
        mysql.connection.commit()
        cur.close()
        return "Movie updated successfully"
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # delete a movie by id 
@app.route('/api/movies/<movie_id>',methods=['DELETE'])
def delete_movie(movie_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM movie WHERE id = %s", (movie_id))
        mysql.connection.commit()
        cur.close()

        return 'User deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    



if __name__== '__main__':
    app.run()
    app.debug(True)
    

