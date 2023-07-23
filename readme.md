# BookSpotOn Web App
- BookSpontOn is web application that help us to book and movie, shows and events online and help the people in solving the real life problem of the time saving for the entertainment.

# Deployed links
## Frontend
## Backend


# Tech-Stacks used for the building this application

## For frontend
- React
- Chackra UI
- HTML
- CSS
- Javascript
- Netlify
## Backend
- Python
- Flask
- Render.com

## Othe Tech-Stacks
- npm
- VS-Code
- github

## ER Diagram

<img src="https://github.com/dilipsanapinb/BookSpotOnbackend/blob/main/ProjectImages/ER%20Diagram.png"></img>

https://lucid.app/lucidchart/051290e0-6626-41cd-9123-e9a4f159c307/edit?viewport_loc=1887%2C-19%2C3975%2C1789%2CHWEp-vi-RSFO&invitationId=inv_161f5c93-ab49-4d78-9fc8-bffdadb725e4

# Entities

1. User:

- id (unique identifier for the user)
- name
- email address
- password

2. Movie:

- id (unique identifier for the movie)
- title
- description
- genre
- duration
- language
- release date
- director
- cast

3. Show:

- id (unique identifier for the show)
- movie_id (foreign key referencing the Movie entity)
- start time
- end time
- category (e.g., Matinee, Evening, Night)
- theater_id (foreign key referencing the Theater entity)
- capacity (total available seats for the show)
- price

4. Theater:

- id (unique identifier for the theater)
- name
- address
- city
- state
- capacity (total seating capacity of the theater)

4. Event:

- id (unique identifier for the event)
- title
- description
- start date
- end date
- location

5. Participant:

- ID (unique identifier for the participant)
- Name
- Email address

6. EventParticipant (or Attendance):

event_id (foreign key referencing the Event entity)
participant_id (foreign key referencing the Participant entity)

7. Booking:

- id (unique identifier for the booking)
- user_id (foreign key referencing the User entity)
- show_id (foreign key referencing the Show entity)
- number of tickets
- booking date
- total cost


## API's for the Different Entities:

### User :
1. **Create a user endpoint:**
    
    **POST /api/user**
    
                Schema:{
                        "id": 1,
                        "username": "Dilip",
                        "email": "dilip@gmail.com",
                        "password": "dilip123",
                        "role": "user",
                        "membership": "Regular"
                    }

2. 1. **Log in the user**
    
    **/api/login methods=["POST"]**
    
                    Schema:
                        {
                            "username": "Dilip",
                            "email": "dilip@gmail.com",
                            "password": "dilip123",
                            "role": "user",
                            "membership": "Regular"
                        }

3. **Get All Users List**
    
    **/api/users** (methods: `GET`)
    
    Response: An array of users
    
4. **Get a user by ID**
    
    **/api/users/<user_id> methods=["GET"]**
    
    Response: Information for a single user
    
5. **Update a user by ID**
    
    '**/api/users/<user_id>',methods=['PUT']**
    
    Response: User updated
    
6. **Delete a user by ID**
    
    **/api/users/<user_id>', methods=['DELETE']**
    
    Response: User with ID deleted


### Movies Routes
1. **Create a movie endpoint:**
    
    **POST /api/movie**
    
            Schema:
                    {
                        "id": 1,
                        "title": "The Shawshank Redemption",
                        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                        "genre": "Drama",
                        "duration": "2h 22min",
                        "language": "English",
                        "release_date": "1994-10-14",
                        "director": "Frank Darabont",
                        "cast": "Tim Robbins, Morgan Freeman"
                        "image":"abc.png"

                    }
            Response: Movie created successfully

2. **Get All Movies List**
    
    **/api/movies** (methods: `GET`)
    
    Response: An array of movies
    
3. **Get a movie by ID**
    
    **/api/movies/<movie_id>** (methods: `GET`)
    
    Response: Information for a single movie
    
4. **Update a movie by ID**
    
    **/api/movies/<movie_id>** (methods: `PUT`)
    
    Response: Movie updated
    
5. **Delete a movie by ID**
    
    **/api/movies/<movie_id>** (methods: `DELETE`)
    
    Response: Movie with ID deleted


### Shows Api
1. **Create a show endpoint:**
    
    **POST /api/shows**
    
                Schema:{
                    "id": 1,
                    "title": "The Shawshank Redemption",
                    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                    "genre": "Drama",
                    "duration": "2h 22min",
                    "language": "English",
                    "release_date": "1994-10-14",
                    "director": "Frank Darabont",
                    "cast": "Tim Robbins, Morgan Freeman"
                    "image":"abc.png"

                }
2. **Get a show by ID**
    
    **/api/shows/<show_id>** (methods: `GET`)
    
    Response: Information for a single show
    
3. **Update a show by ID**
    
    **/api/shows/<show_id>** (methods: `PUT`)
    
    Response: Show updated
    
4. **Delete a show by ID**
    1. **Get All shows List**
        
        **/api/shows** (methods: `GET`)
        
        Response: An array of shows
        
    
    **/api/shows/<show_id>** (methods: `DELETE`)
    
    Response: Show with ID deleted

5. **Get all show**
    **GET /api/show**


### Theaters Api:
1. **Create a theatre endpoint:**
    
    **POST /api/theatres**
    
                Schema:{
                    "id": 1,
                    "title": "The Shawshank Redemption",
                    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                    "genre": "Drama",
                    "duration": "2h 22min",
                    "language": "English",
                    "release_date": "1994-10-14",
                    "director": "Frank Darabont",
                    "cast": "Tim Robbins, Morgan Freeman"
                    "image":"abc.png"

                }

2. **Get All theatres List**
    
    **/api/theatres**(methods: `GET`)
    
    Response: An array of theatres
    
3. **Get a theatres by ID**
    
    **/api/theatres/<theatre_id>** (methods: `GET`)
    
    Response: Information for a single theatres
    
4. **Update a theatres by ID**
    
    **/api/theatres/<theatre_id>** (methods: `PUT`)
    
    Response: theatre updated
    
5. **Delete a theatre by ID**
    
    **/api/theatres/<**theatre_id**>** (methods: `DELETE`)
    
    Response: theatres ****with ID deleted


### Home Page

<img src="https://github.com/dilipsanapinb/BookSpotOnbackend/blob/main/ProjectImages/Landiang%20Page.png"></img>

### Sign Up page
<img src=""></img>

### Sign In Page
<img src=""></img>

### 
