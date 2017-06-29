function deepEqual (first, second) {	
	// Check nulls first
	if (first === null || second === null) {
		if (first === null && second === null) {
			// console.log("Both are null, returning true");
			return true;
		}
		else {
			// console.log("One is null and they don't match, returning false");
			return false;
		}
	}
	else {
		// If they're both non-null objects
		if (typeof(first) == "object" && typeof(second) == "object") {
			// console.log("They are both objects, continuing");
			var firstPropCount = 0;
			var secondPropCount = 0;
			for (var prop1 in first) {
				firstPropCount++;
			}
			for (var prop2 in second) {
				secondPropCount++;
			}
			// Number of properties match
			if (firstPropCount == secondPropCount) {
				// console.log("Property counts match, doing deep equals");
				for (var prop in first) {
					return deepEqual(first[prop], second[prop]);
				}
			}
			else{
				// console.log("Property counts don't match, returning false");
				return false;
			}
		}
		// Compare straight up values
		else if (first != second) {
			// console.log("They don't match, returning false");
			return false;
		}
	}
	// console.log("Everything is matched up, returning true");
	return true;
}

// Test code
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true