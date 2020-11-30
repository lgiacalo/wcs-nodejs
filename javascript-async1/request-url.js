const request = require("request");

request("https://swapi.dev/api/people/1/", function (error, response, body) {
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

  const luke = JSON.parse(body);
  console.log(luke);

  request("http://swapi.dev/api/films/1/", (err, res, bdy) => {
    const film = JSON.parse(bdy);
    console.log("\nfilm.title :>> ", film.title);
  });
});
