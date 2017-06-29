function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
	this.logMe = logMe;
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. 
You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array ){
    var sortedArr = array;
	
	for(var i=0; i < sortedArr.length; i++) {
		for(var j=i+1; j < sortedArr.length; j++) {
			if (comparator(sortedArr[j], sortedArr[i])) {				
				var temp = sortedArr[i];
				sortedArr[i] = sortedArr[j];
				sortedArr[j] = temp;
			}
		}
	}
	return sortedArr;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {
		return true;
	}
	return false;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
	if (auto1.make.toUpperCase() < auto2.make.toUpperCase()) {
		return true;
	}
	return false;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). 
 It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
	var typeOneVal = assignTypeMapping(auto1);
	var typeTwoVal = assignTypeMapping(auto2);
	
	if (typeOneVal == typeTwoVal) {
		if (auto1.year > auto2.year) {
			return true;	
		}
	}
	else if (typeOneVal > typeTwoVal) {
		return true;
	}
	return false;
}

// Assigns an integer value based on the given type of the automobile for purpose of comparison
function assignTypeMapping(auto) {
	if (auto.type.toUpperCase() == "ROADSTER") {
		return 4;
	}
	else if (auto.type.toUpperCase() == "PICKUP") {
		return 3;
	}
	else if (auto.type.toUpperCase() == "SUV") {
		return 2;
	}
	else if (auto.type.toUpperCase() == "WAGON") {
		return 1;
	}
	else{
		return 0;
	}
}

// Print the properties of the automobile based on whether to show the type or not
function logMe(printAll) {
	if (printAll) {
		console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
	}
	else{
		console.log(this.year + " " + this.make + " " + this.model);
	}
}

// Main program to display the results
function runProgram () {
	console.log("*****");
	console.log("The cars sorted by year are:");
	for (var car in sortArr(yearComparator, automobiles)) {
		automobiles[car].logMe(false);
	}
	console.log();
	console.log("The cars sorted by make are:");
	for (var car in sortArr(makeComparator, automobiles)) {
		automobiles[car].logMe(false);
	}
	console.log();
	console.log("The cars sorted by type are:");
	for (var car in sortArr(typeComparator, automobiles)) {
		automobiles[car].logMe(true);
	}
	console.log("*****");
}

runProgram();

