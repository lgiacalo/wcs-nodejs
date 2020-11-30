# Express 6 - GET en détail

## Challenge 

### GET me to the movies

Go back to the code of the application you posted in response to the challenge of Express Quest #2.

Add to your application the logic introduced in this quest :

    - Add a 404 error handler in the movies routes we've created before, with the message Movie not found if the id passed in the URL does not match any existing movie
    - Add a new filter to the existing filter route
        - if a parameter color is provided in the URL (?color=true), only return films in color.


### Validation criteria

    - The application returns a code 200 and a subject and not an array, on the GET road returning a movie, in case it is found.
    - Otherwise, it returns a 404 error otherwise with the message Movie not found.
    - The route returning a list of movies returns all of them if no parameters are passed via the URL.
    - Otherwise, it returns a list filtered according to this URL parameter.
    - It returns a code 200 even if the list is empty.

### Files

  - [movies.js](./src/routes/movies.js)
  - [search.js](./src/routes/search.js)

---- 

<img src="./demo.svg">