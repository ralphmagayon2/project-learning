const asciiCodes = [78, 111, 32, 109, 101, 101, 116, 105, 110, 103, 32, 116, 111, 109, 109, 111, 114, 111, 119];

let message = "";

for (let i = 0; i < asciiCodes.length; i++) {
  message += String.fromCharCode(asciiCodes[i]);
}

console.log(message);