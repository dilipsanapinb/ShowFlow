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
        

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO user (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))
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
# @authenticate
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
        rating=movie_data['rating']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO movie (title,description,genre,duration,language,release_date,director,cast,image) VALUES (%s, %s, %s, %s, %s,%s,%s,%s,%s,%s)", (title,description,genre,duration,language,release_date,director,cast,image,rating))
        mysql.connection.commit()
        cur.close()

        return 'Movie created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a list of all movies
@app.route('/api/movies',methods=['GET'])
# @authenticate
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
                        'image':movie[9],
                        'rating':movie[10]
                    }
                    movie_list.append(movie_data)

        return jsonify(movie_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a movie by id
@app.route('/api/movies/<movie_id>',methods=['GET'])
# @authenticate
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
    

# # theaters Routes
# #create a new movie
@app.route('/api/theaters',methods=['POST'])
def create_theater():
    try:
        theater_data = request.json
        name = theater_data['name']
        address = theater_data['address']
        city = theater_data['city']
        state = theater_data['state']
        capacity = theater_data['capacity']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO theater (name, address, city, state, capacity) VALUES (%s, %s, %s, %s, %s)", (name, address, city, state, capacity))
        mysql.connection.commit()
        cur.close()

        return 'Theater created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    

# # get a list of all theaters
@app.route('/api/theaters',methods=['GET'])
def get_all_theaters():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM theater")
        theaters = cur.fetchall()
        cur.close()

        theater_list = []
        for theater in theaters:
            theater_data = {
                'id': theater[0],
                'name': theater[1],
                'address': theater[2],
                'city': theater[3],
                'state': theater[4],
                'capacity': theater[5]
            }
            theater_list.append(theater_data)

        return jsonify(theater_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
# # get a theaters by id
@app.route('/api/theaters/<theater_id>',methods=['GET'])
def get_theater(theater_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM theater WHERE id = %s", (theater_id,))
        theater = cur.fetchone()
        cur.close()

        if theater:
            theater_data = {
                'id': theater[0],
                'name': theater[1],
                'address': theater[2],
                'city': theater[3],
                'state': theater[4],
                'capacity': theater[5]
            }
            return jsonify(theater_data)
        else:
            return 'Theater not found', 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # update a theaters by id 
@app.route('/api/theaters/<theater_id>',methods=['PUT'])
def update_theater(theater_id):
    try:
        theater_data = request.json
        name = theater_data.get('name')
        address = theater_data.get('address')
        city = theater_data.get('city')
        state = theater_data.get('state')
        capacity = theater_data.get('capacity')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE theater SET name = %s, address = %s, city = %s, state = %s, capacity = %s WHERE id = %s", (name, address, city, state, capacity, theater_id))
        mysql.connection.commit()
        cur.close()

        return 'Theater updated successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
# # delete a theaters by id 
@app.route('/api/theaters/:id',methods=['DELETE'])
def delete_theater(theater_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM theater WHERE id = %s", (theater_id,))
        mysql.connection.commit()
        cur.close()

        return 'Theater deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # show Routes
# #create a new show
@app.route('/api/show',methods=['POST'])
def create_show():
    try:
        show_data = request.json
        movie_id = show_data.get('movie_id')
        start_time = show_data.get('start_time')
        end_time = show_data.get('end_time')
        category = show_data.get('category')
        theater_id = show_data.get('theater_id')
        capacity = show_data.get('capacity')
        price = show_data.get('price')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `show` (movie_id, start_time, end_time, category, theater_id, capacity, price) VALUES (%s, %s, %s, %s, %s, %s, %s)", (movie_id, start_time, end_time, category, theater_id, capacity, price))
        mysql.connection.commit()
        cur.close()

        return 'Show created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    

# # get a list of all show
@app.route('/api/shows',methods=['GET'])
def get_all_shows():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM `shows`")
        shows = cur.fetchall()
        cur.close()
        print(shows)
        show_list = []
        for show in shows:
            show_data = {
                'id': show[0],
                'movie_id': show[1],
                'start_time': show[2].isoformat(),
                'end_time': show[3].isoformat(),
                 'start_time': show[2],
                'end_time': show[3],
                'category': show[4],
                'theater_id': show[5],
                'capacity': show[6],
                'price': float(show[7])
            }
            show_list.append(show_data)

        return jsonify(show_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # get a show by id
@app.route('/api/show/<show_id>',methods=['GET'])
def get_show(show_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM `shows` WHERE id = %s", (show_id,))
        show = cur.fetchone()
        cur.close()

        if show:
            show_data = {
                'id': show[0],
                'movie_id': show[1],
                'start_time': show[2].isoformat(),
                'end_time': show[3].isoformat(),
                'category': show[4],
                'theater_id': show[5],
                'capacity': show[6],
                'price': float(show[7])
            }
            return jsonify(show_data)
        else:
            return 'Show not found', 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # update a show by id 
@app.route('/api/show/:id',methods=['PUT'])
def update_show(show_id):
    try:
        show_data = request.json
        start_time = show_data.get('start_time')
        end_time = show_data.get('end_time')
        category = show_data.get('category')
        capacity = show_data.get('capacity')
        price = show_data.get('price')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE `show` SET start_time = %s, end_time = %s, category = %s, capacity = %s, price = %s WHERE id = %s", (start_time, end_time, category, capacity, price, show_id))
        mysql.connection.commit()
        cur.close()

        return 'Show updated successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # delete a show by id 
@app.route('/api/show/:id',methods=['DELETE'])
def delete_show(show_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM `show` WHERE id = %s", (show_id,))
        mysql.connection.commit()
        cur.close()

        return 'Show deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # bookings Routes
# #create a new movie
@app.route('/api/bookings',methods=['POST'])
def create_booking():
    try:
        booking_data = request.json
        user_id = booking_data.get('user_id')
        show_id = booking_data.get('show_id')
        number_of_tickets = booking_data.get('number_of_tickets')
        booking_date = booking_data.get('booking_date')
        total_cost = booking_data.get('total_cost')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO booking (user_id, show_id, number_of_tickets, booking_date, total_cost) VALUES (%s, %s, %s, %s, %s)", (user_id, show_id, number_of_tickets, booking_date, total_cost))
        mysql.connection.commit()
        cur.close()

        return 'Booking created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # get a list of all bookings
@app.route('/api/bookings',methods=['GET'])
def get_all_bookings():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM booking")
        bookings = cur.fetchall()
        cur.close()

        booking_list = []
        for booking in bookings:
            booking_data = {
                'id': booking[0],
                'user_id': booking[1],
                'show_id': booking[2],
                'number_of_tickets': booking[3],
                'booking_date': booking[4].isoformat(),
                'total_cost': float(booking[5])
            }
            booking_list.append(booking_data)

        return jsonify(booking_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# # get a booking by id
@app.route('/api/bookings/:id',methods=['GET'])
def get_booking(booking_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM booking WHERE id = %s", (booking_id,))
        booking = cur.fetchone()
        cur.close()

        if booking:
            booking_data = {
                'id': booking[0],
                'user_id': booking[1],
                'show_id': booking[2],
                'number_of_tickets': booking[3],
                'booking_date': booking[4].isoformat(),
                'total_cost': float(booking[5])
            }
            return jsonify(booking_data)
        else:
            return 'Booking not found', 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    
# # update a booking by id 
@app.route('/api/bookings/:id',methods=['PUT'])
def update_booking(booking_id):
    try:
        booking_data = request.json
        number_of_tickets = booking_data.get('number_of_tickets')
        booking_date = booking_data.get('booking_date')
        total_cost = booking_data.get('total_cost')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE booking SET number_of_tickets = %s, booking_date = %s, total_cost = %s WHERE id = %s", (number_of_tickets, booking_date, total_cost, booking_id))
        mysql.connection.commit()
        cur.close()

        return 'Booking updated successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500
    

# # delete a booking by id 
@app.route('/api/bookings/:id',methods=['DELETE'])
def delete_booking(booking_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM booking WHERE id = %s", (booking_id,))
        mysql.connection.commit()
        cur.close()

        return 'Booking deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# create a seat
@app.route('/api/seats', methods=['POST'])
def create_seat():
    try:
        seat_data = request.json
        show_id = seat_data.get('show_id')
        seat_number = seat_data.get('seat_number')
        seat_status = seat_data.get('seat_status')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO seat (show_id, seat_number, seat_status) VALUES (%s, %s, %s)", (show_id, seat_number, seat_status))
        mysql.connection.commit()
        cur.close()

        return 'Seat created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# get all seats
@app.route('/api/seats', methods=['GET'])
def get_all_seats():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM seat")
        seats = cur.fetchall()
        cur.close()

        seat_list = []
        for seat in seats:
            seat_data = {
                'id': seat[0],
                'show_id': seat[1],
                'seat_number': seat[2],
                'seat_status': seat[3]
            }
            seat_list.append(seat_data)

        return jsonify(seat_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# get a seat by id
@app.route('/api/seats/<int:seat_id>', methods=['GET'])
def get_seat(seat_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM seat WHERE id = %s", (seat_id,))
        seat = cur.fetchone()
        cur.close()

        if seat:
            seat_data = {
                'id': seat[0],
                'show_id': seat[1],
                'seat_number': seat[2],
                'seat_status': seat[3]
            }
            return jsonify(seat_data)
        else:
            return 'Seat not found', 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# update a seat by id
@app.route('/api/seats/<int:seat_id>', methods=['PUT'])
def update_seat(seat_id):
    try:
        seat_data = request.json
        seat_number = seat_data.get('seat_number')
        seat_status = seat_data.get('seat_status')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE seat SET seat_number = %s, seat_status = %s WHERE id = %s", (seat_number, seat_status, seat_id))
        mysql.connection.commit()
        cur.close()

        return 'Seat updated successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# delete a seat by id
@app.route('/api/seats/<int:seat_id>', methods=['DELETE'])
def delete_seat(seat_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM seat WHERE id = %s", (seat_id,))
        mysql.connection.commit()
        cur.close()

        return 'Seat deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# create areview on movie
@app.route('/api/reviews', methods=['POST'])
def create_review():
    try:
        review_data = request.json
        user_id = review_data.get('user_id')
        movie_id = review_data.get('movie_id')
        rating = review_data.get('rating')
        review_text = review_data.get('review_text')

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO review (user_id, movie_id, rating, review_text) VALUES (%s, %s, %s, %s)", (user_id, movie_id, rating, review_text))
        mysql.connection.commit()
        cur.close()

        return 'Review created successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# get all review on movie
@app.route('/api/reviews', methods=['GET'])
def get_all_reviews():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM review")
        reviews = cur.fetchall()
        cur.close()

        review_list = []
        for review in reviews:
            review_data = {
                'id': review[0],
                'user_id': review[1],
                'movie_id': review[2],
                'rating': review[3],
                'review_text': review[4]
            }
            review_list.append(review_data)

        return jsonify(review_list)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# get a review by id
@app.route('/api/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM review WHERE id = %s", (review_id,))
        review = cur.fetchone()
        cur.close()

        if review:
            review_data = {
                'id': review[0],
                'user_id': review[1],
                'movie_id': review[2],
                'rating': review[3],
                'review_text': review[4]
            }
            return jsonify(review_data)
        else:
            return 'Review not found', 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# update a review by id
@app.route('/api/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    try:
        review_data = request.json
        rating = review_data.get('rating')
        review_text = review_data.get('review_text')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE review SET rating = %s, review_text = %s WHERE id = %s", (rating, review_text, review_id))
        mysql.connection.commit()
        cur.close()

        return 'Review updated successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

# delete a review by id
@app.route('/api/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM review WHERE id = %s", (review_id,))
        mysql.connection.commit()
        cur.close()

        return 'Review deleted successfully'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return 'Internal Server Error', 500

if __name__== '__main__':
    app.run()
    app.debug(True)
    

