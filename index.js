const cowsay = require("cowsay");
const info = require("./information");

console.log(
  cowsay.say({
    text: `Hello I'm ${info.name} from ${info.campus} Campus!`,
    e: "oO",
    T: "U ",
  })
);

// cowsay.think();
