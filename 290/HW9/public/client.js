// On page load, setup the submit button actions
document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons() {
    // Insert new record
    document.getElementById('workoutSubmit').addEventListener('click', function (event) {
        var newRecord = getWorkoutInsertFormData();
        var isValid = checkValidity(newRecord);
        if (isValid) {
            var req = new XMLHttpRequest();
            var urlParams = constructWorkoutInsertParams(newRecord);
            var url = "/insert?" + urlParams;
            req.open('GET', url, true);
            req.addEventListener('load', function () {
                if (req.status >= 200 && req.status < 400) {
                    var response = JSON.parse(req.responseText);
                    insertTableRow(response.recordID);
                }
                else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send();
        }
        event.preventDefault();
    })
}

function constructWorkoutInsertParams(workout) {
    var name = workout.name;
    var reps = workout.reps;
    var weight = workout.weight;
    var date = workout.date;
    var lbs = workout.lbs;

    var result = "name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs;
    return result;
}

function getWorkoutInsertFormData() {
    var name = document.getElementById('workoutName').value;
    var reps = document.getElementById('workoutReps').value;
    var weight = document.getElementById('workoutWeight').value;
    var date = document.getElementById('workoutDate').value;
    var lbs = document.getElementById('workoutLbs').checked;
    if (lbs == true) {
        lbs = 1;
    }
    else {
        lbs = 0;
    }

    var workout = { "name": name, "reps": reps, "weight": weight, "date": date, "lbs": lbs };
    return workout;
}

// Delete the database table row and the display table row
function deleteRow(button, id) {
    var req = new XMLHttpRequest();
    var url = "/delete?id=" + id;
    req.open('GET', url, true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = req.responseText;
            console.log("Delete response: " + response);
            deleteTableRow(button);
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
}

// Delete the display table row
function deleteTableRow(button) {
    var row = button.parentNode.parentNode;
    var tbody = row.parentNode;
    tbody.removeChild(row);
}

// Check if a record is valid for saving
function checkValidity(record) {
    if (record != null && record.name != null && record.name.length > 0) {
        return true;
    }
    return false;
}

function editRow(id) {
    var url = "edit?id=" + id;
    window.open(window.location.href + url, "_self");    
}

function insertTableRow(insertedID) {
    var workout = getWorkoutInsertFormData();
    workout.id = insertedID;
    var table = document.getElementById("workoutTable");
    var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = workout.name;
    row.appendChild(nameCell);

    var repsCell = document.createElement("td");
    repsCell.textContent = workout.reps;
    row.appendChild(repsCell);

    var weightCell = document.createElement("td");
    weightCell.textContent = workout.weight;
    row.appendChild(weightCell);

    var dateCell = document.createElement("td");
    dateCell.textContent = workout.date;
    row.appendChild(dateCell);

    var lbsCell = document.createElement("td");
    lbsCell.textContent = workout.lbs;
    row.appendChild(lbsCell);

    // Buttons
    table.appendChild(row);
    addNewRowButtons(row, insertedID);
}

function addNewRowButtons(row, insertedID) {
    // Edit button
    var editCell = document.createElement("td");
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // Closure to resolve this immediately and set the click event
    (function (id) {
        editButton.onclick = function () {
            editRow(id);
        }
    })(insertedID);

    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Delete button
    var deleteCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // Closure to resolve this immediately and set the click event
    (function (button, id) {
        deleteButton.onclick = function () {
            deleteRow(button, id);
        }
    })(deleteButton, insertedID);

    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
}