# POST-IT-APP

# POST-IT-APP

THIS APP IS CONNECTED TO MONGODB ONLINE
YOU NEED POSTMAN TO TEST IT OUT

> Simple demonstration of Creating , Reading, Updating and Deleting Api data from MongoDb

## Prerequisite:

npm/nodejs latest version
REST Client Extension for Visual Studio OR POSTMAN

## Technologies used:

### 1. Backend

- Nodejs
- ExpressJs
- MongoDb
  -typescript

### 2. For Api testing

- Rest Client

## Dependency install

```
npm install
```

Dependencies are:

> express, bcrypt, jwt, nodemon, mongoose, dotenv, helmet, cookie-parser, morgan, jsonwebtoken, joi

## Run Project

```
npm run dev
```

## Rest Client Api testing (POSTMAN)

### Reading API ENDPOINTS

```rest
### NOTE THAT YOU MUST USE THE BEARER TOKEN TO AUTHENTICATE THE API BEFORE ANYTHING WILL WORK...
you don't need the bearer token for sign up and login.
```

### LINK TO POSTMAN DOCUMENTATION

https://documenter.getpostman.com/view/21748378/2s93Jut37z

```


```

### LINK TO DATA DESIGN MODEL

https://dbdesigner.page.link/z9mHzW1Gzsgy2hUx9

```

```

```
WHAT I DID WITH MY DELETED DOCUMENTS FROM THE DATABASE
the deleted documents are still stored in the database, this is to keep track of important customer data that can be used to make informed marketing decisions later(targeted ads and its likes)
it will be stored for a period of at least 5 years before they are permanently deleted. This is because of the privacy laws that govern social media all over the world
```

### CREATE USER

POST https://post-it-app-0ts8.onrender.com/users
YOU DON'T NEED ANY AUTH FOR THIS. SIGN UP USING EMAIL, FIRSTNAME, LASTNAME, PASSWORD, ROLE AND

### LOGIN USER

POST https://post-it-app-0ts8.onrender.com/users/login
USE EMAIL AND PASSWORD TO LOGIN. COPY BEARER TOKEN AND PASTE IN AUTH OR HEADER

### GET ONE USER

GET https://post-it-app-0ts8.onrender.com/users/@userId
USE THE USER ID THAT WAS GENERATED AFTER YOU LOGGED IN.

### GET ALL USERS

GET https://post-it-app-0ts8.onrender.com/users
USE ONLY THIS TO GET ALL USERS IN THE DATABASE

### EDIT USER BY ID

PUT https://post-it-app-0ts8.onrender.com/users/@userId

EDIT USER BY ID
PUT IN USER ID TO DO THIS

### DELETE USER

DELETE Dhttps://post-it-app-0ts8.onrender.com/users/@userId
PUT IN USER ID TO DO THIS

### CREATE POST

https://post-it-app-0ts8.onrender.com/posts

USE 'TEXT" AND "USERID"
