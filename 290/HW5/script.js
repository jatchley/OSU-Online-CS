// If you were to open index.html without including the associated JavaScript it should be entirely blank.

// You should then use JavaScript to create all of the content of this page and append it to the body of the page. That content should include:

// A 4x4 table
	// The top row should be a header row with header cells
	// The 4 header cells, from left to right should say "Header 1", "Header 2" ... "Header 4
	// The non header cells should contain their position. 
	// The upper left cell should contain the text "1, 1", the cell to its right "2, 1", the cell below it "1, 2" and so on.

// 4 directional buttons (up, down, left right)

// A button labeled "Mark Cell"

// When the page is loaded the upper left, non-header cell of the table should be 'selected'. 
// This is denoted by it having a thicker border than the other cells. If you push the directional buttons other cells should be selected instead. 
// So if you press the right button, cell 1,1 should no longer be selected and 2,1 should be selected instead.

// If you are already on the top row and hit 'up' nothing should happen (you should not be able to move into the header cells). 
// Likewise if you are all the way right and hit right or all the way at the bottom and hit down.

// Hitting the "Mark Cell" button should permanently change the background of the selected cell to yellow. 
// This should persist even after other cells are selected or marked.

// Suggestion: If you are having a lot of trouble getting the page populated the way you want using JavaScript, 
// just manually make the HTML so that you can continue to work on the rest of the assignment involving selecting and marking cells.

// Note: When generating content for the page you will not get credit for simply using the innerHTML property of the body element to parse a string of HTML content. 
// The purpose is to use the process of creating and appending element nodes to the document.

// Define click event functions
function moveUp() {
	var selectedCell = document.getElementsByClassName("selectedCell");
	var cellId = selectedCell[0].id;
	var selectedRow = selectedCell[0].parentNode;
	
	var upRow = selectedRow.previousElementSibling;
	if (upRow.id == "headerRow") {
		return;
	}
	else {
		selectedCell[0].style.border = "1px solid black";
		selectedCell[0].className = "table-bordered";
				
		var newSelected;
		for (var i = 0; i < upRow.children.length; i++) {
			if (upRow.children[i].id == cellId) {
				newSelected = upRow.children[i];
				break;
			}
		}
		
		newSelected.style.border = "3px solid black";
		newSelected.className = "selectedCell";
	}
}

function moveLeft() {
	var selectedCell = document.getElementsByClassName("selectedCell");
	var cellId = selectedCell[0].id;
	
	var leftCell = selectedCell[0].previousElementSibling;
	if (leftCell == null) {
		return;
	}
	else {
		selectedCell[0].style.border = "1px solid black";
		selectedCell[0].className = "table-bordered";
				
		leftCell.style.border = "3px solid black";
		leftCell.className = "selectedCell";
	}
}

function moveRight() {
	var selectedCell = document.getElementsByClassName("selectedCell");
	var cellId = selectedCell[0].id;
	
	var rightCell = selectedCell[0].nextElementSibling;
	if (rightCell == null) {
		return;
	}
	else {
		selectedCell[0].style.border = "1px solid black";
		selectedCell[0].className = "table-bordered";
				
		rightCell.style.border = "3px solid black";
		rightCell.className = "selectedCell";
	}
}

function moveDown() {
	var selectedCell = document.getElementsByClassName("selectedCell");
	var cellId = selectedCell[0].id;
	var selectedRow = selectedCell[0].parentNode;
	
	var downRow = selectedRow.nextElementSibling;
	if (downRow == null) {
		return;
	}
	else {
		selectedCell[0].style.border = "1px solid black";
		selectedCell[0].className = "table-bordered";
		
		var newSelected;
		for (var i = 0; i < downRow.children.length; i++) {
			if (downRow.children[i].id == cellId) {
				newSelected = downRow.children[i];
				break;
			}
		}
		
		newSelected.style.border = "3px solid black";
		newSelected.className = "selectedCell";
	}
}

// Mark and unmark selected cell
function markCell() {
	var selectedCell = document.getElementsByClassName("selectedCell");
	if (selectedCell[0].style.backgroundColor != "yellow") {
		selectedCell[0].style.backgroundColor = "yellow";	
	}
	else {
		selectedCell[0].style.backgroundColor = "white";	
	}	
}

// Get the body
var body = document.body;

// Create the table
var table = document.createElement("table");
table.className = "table-bordered";

// Create and append the header row
var headerRow = document.createElement("tr");
headerRow.id = "headerRow";

// Create the header row cells
for (var i = 1; i < 5; i++) {
	var headerCell = document.createElement("th");	
	headerCell.className = "table-bordered";
	headerCell.textContent = "Header " + i;
	
	headerRow.appendChild(headerCell);
}
table.appendChild(headerRow);

// Create the starting row and mark the starting cell
var startingRow = document.createElement("tr");
startingRow.id = "tableRow1";

var startingCell = document.createElement("td");
startingCell.className = "selectedCell";
startingCell.textContent = 1 + "," + 1;
startingCell.id = "cell1";
startingRow.appendChild(startingCell);

for (var i = 2; i < 5; i++) {
	var cell = document.createElement("td");
	cell.className = "table-bordered";
	cell.textContent = i + "," + 1;
	cell.id = "cell" + i;
	startingRow.appendChild(cell);
}
table.appendChild(startingRow);

// Create and add the main rows
for(var i = 2; i < 4; i++) {
	var row = document.createElement("tr");
	row.id = "tableRow" + i;

	// Create and add the main row cells
	for (var k = 1; k < 5; k++) {
		var cell = document.createElement("td");
		cell.className = "table-bordered";
		cell.textContent = k + "," + i;
		cell.id = "cell" + k;
		row.appendChild(cell);
	}
	table.appendChild(row);
}

// Add the constructed table to the body
body.appendChild(table);

// Style the table
var tableElements = document.getElementsByClassName("table-bordered");
for(var i = 0; i < tableElements.length; i++) {
	tableElements[i].style.border = "1px solid black";
}

// Style the starting selected cell
var selectedCell = document.getElementsByClassName("selectedCell");
selectedCell[0].style.border = "3px solid black";

// Create containers for the bottons
var buttonUpDiv = document.createElement("div");
buttonUpDiv.id = "buttonUpDiv";

var buttonLeftRightDiv = document.createElement("div");
buttonLeftRightDiv.id = "buttonLeftRightDiv";

var buttonDownDiv = document.createElement("div");
buttonDownDiv.id = "buttonDownDiv";

var buttonMarkCellDiv = document.createElement("div");
buttonMarkCellDiv.id = "buttonMarkCellDiv";

// Create the directional buttons
var buttonUp = document.createElement("button");
buttonUp.id = "buttonUp";
buttonUp.textContent = "Up";
buttonUp.addEventListener("click", moveUp);
buttonUpDiv.appendChild(buttonUp);

var buttonLeft = document.createElement("button");
buttonLeft.id = "buttonLeft";
buttonLeft.textContent = "Left";
buttonLeft.addEventListener("click", moveLeft);
buttonLeftRightDiv.appendChild(buttonLeft);

var buttonRight = document.createElement("button");
buttonRight.id = "buttonRight";
buttonRight.textContent = "Right";
buttonRight.addEventListener("click", moveRight);
buttonLeftRightDiv.appendChild(buttonRight);

var buttonDown = document.createElement("button");
buttonDown.id = "buttonDown";
buttonDown.textContent = "Down";
buttonDown.addEventListener("click", moveDown);
buttonDownDiv.appendChild(buttonDown);

var buttonMarkCell = document.createElement("button");
buttonMarkCell.id = "buttonMarkCell";
buttonMarkCell.textContent = "Mark Cell";
buttonMarkCell.addEventListener("click", markCell);
buttonMarkCellDiv.appendChild(buttonMarkCell);

// Add the buttons and containers to the body
body.appendChild(buttonUpDiv);
body.appendChild(buttonLeftRightDiv);
body.appendChild(buttonDownDiv);
body.appendChild(buttonMarkCellDiv);