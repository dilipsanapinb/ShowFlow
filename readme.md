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