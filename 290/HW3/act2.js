// Write a JavaScript program that declares a function but calls it before it is declared. 
// Because of function hoisting this will work in JavaScript. Go prove it!
declaredPrintName("Josh", "Atchley");

function declaredPrintName(firstName, lastName) {
	console.log("First Name: " + firstName);
	console.log("Last Name: " + lastName);
}

// Also write a function which is assigned to a variable. 
// Call it before it is assigned and prove that this does not work.
definedPrintName("Josh", "Atchley");

var definedPrintName = function(firstName, lastName) {
	console.log("First Name: " + firstName);
	console.log("Last Name: " + lastName);
}