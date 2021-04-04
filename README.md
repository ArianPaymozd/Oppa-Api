# Oppa Server API

This is the backend API for the RideSpot app developed using Node.js and Express as well as Postgresql sor the databases

Live App: https://oppalearning.vercel.app/

## Documentation
POST: https://polar-tundra-66284.herokuapp.com/api/auth/login,
POST LOGIN
Student Login if "userType" in request body is "student" and Teacher Login if "userType" is "teacher"


POST: https://polar-tundra-66284.herokuapp.com/api/users,
POST USER
Student User if "userType" in request body is "student" and Teacher User if "userType" is "teacher"


GET: https://polar-tundra-66284.herokuapp.com/api/classes/:teacher_id,
Return all classes for given teacher
Authorization: teacher required
Response: content-type: JSON, content: 
{
    {
        class_id: INTEGER
        class_name: STRING
        class_password: STRING
        students: INTEGER
        worksheets: INTEGER
        modified: INTEGER
        teacher_id: INTEGER
    }
}


GET: https://polar-tundra-66284.herokuapp.com/api/classes/students/:id,
Return all classes for given student
Authorization: student required
Response: content-type: JSON, content: 
{
    {
        class_id: INTEGER
        id: INTEGER
        class_name: STRING
        class_password: STRING
        student_id: INTEGER
    }
}


POST: https://polar-tundra-66284.herokuapp.com/api/classes,
Adds an entry to classes list
Authorization: teacher required
Request Body: 
{
        class_name: STRING REQURIED
        class_password: STRING REQURIED
        teacher_id: INTEGER REQURIED
}


DELETE: https://polar-tundra-66284.herokuapp.com/api/:class_id,
Delete post by class_id
Authorization: teacher required
Response: status(204)


GET: https://polar-tundra-66284.herokuapp.com/api/worksheets/:class_id,
Return all worksheets for given class
Authorization: teacher required
Response: content-type: JSON, content: 
{
    {
        worksheet_id: INTEGER
        worksheet_name: STRING
        class_id: INTEGER
        reading: STRING
        animation_scroll: STRING
    }
}


GET: https://polar-tundra-66284.herokuapp.com/api/worksheets/students/:class_id,
Return all worksheets for given class
Authorization: student required
Response: content-type: JSON, content: 
{
    {
        worksheet_id: INTEGER
        worksheet_name: STRING
        class_id: INTEGER
        reading: STRING
        animation_scroll: STRING
    }
}


POST: https://polar-tundra-66284.herokuapp.com/api/worksheets,
Adds an entry to classes list
Authorization: teacher required
Request Body: 
{
        worksheet_name: STRING REQUIRED
        class_id: INTEGER REQUIRED
        reading: STRING REQUIRED
        animation_scroll: STRING REQUIRED
}
