process.stdin.resume()
process.stdin.setEncoding('utf8')

// Anciens flux de lecture ! a ne plus utiliser

console.log('What\'s your age ? ');
process.stdin.on('data', (data) => {
  const age = Number.parseInt(data.toString());
  if (Number.isNaN(age) || age < 0 || age > 99){
    console.log("Error !");
  } else {
    console.log('Year of birth: ' + (2020 - age));
  }
  process.exit()
})
