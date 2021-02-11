# RideSpot Server API

This is the backend API for the RideSpot app

## Documentation
GET: https://immense-headland-15591.herokuapp.com/api/posts,
Returns all posts
Response: content-type: JSON, content: 
{
    {
        post_id: INTEGER,
        title: STRING,
        sport: STRING,
        user_id: INT,
        modified: STRING,
        spot_description: STRING
        img: STRING (link),
        spot_address: STRING,
        security_level: STRING,
        difficulty: STRING,
    }
}

GET: https://immense-headland-15591.herokuapp.com/api/posts/:user_id,
Return all posts for given user
Authorization: required
Response: content-type: JSON, content: 
{
    {
        post_id: INTEGER,
        title: STRING,
        sport: STRING,
        user_id: INT,
        modified: STRING,
        spot_description: STRING
        img: STRING (link),
        spot_address: STRING,
        security_level: STRING,
        difficulty: STRING,        
    }
}

GET: https://immense-headland-15591.herokuapp.com/api/users/:user_id,
Return user information by user_id
Authorization: required
Response: content-type: JSON, content: 
{
    full_name: STRING,
    email: STRING,
    username: STRING,
    password: STRING,
    id: INT
}


DELETE: https://immense-headland-15591.herokuapp.com/api/posts/:post_id,
Delete post by post_id
Authorization: required
Response: status(204)

POST: https://immense-headland-15591.herokuapp.com/api/posts,
Adds an entry to posts list
Authorization: required
Request Body: 
{
    post_id: INTEGER, required
    title: STRING, required
    sport: STRING, required
    user_id: INT, required
    modified: STRING, required
    spot_description: STRING, required
    img: STRING (link), required
    spot_address: STRING, required
    security_level: STRING, required
    difficulty: STRING, required       
}
Response: content-type: JSON, status(201)
{
    post_id: INTEGER,
    title: STRING,
    sport: STRING,
    user_id: INT,
    modified: STRING,
    spot_description: STRING,
    img: STRING (link),
    spot_address: STRING,
    security_level: STRING,
    difficulty: STRING,        
}

POST: https://immense-headland-15591.herokuapp.com/api/users,
Adds a user to user list
Request Body: 
{
    full_name: STRING, required
    email: STRING, required
    username: STRING, required
    password: STRING, required     
}
Response: content-type: JSON, status(201)
{
    full_name: STRING,
    email: STRING,
    username: STRING,
    password: STRING,   
}

