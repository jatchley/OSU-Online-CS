// On page load, setup the submit button actions
document.addEventListener('DOMContentLoaded', bindButtons);
document.addEventListener('DOMContentLoaded', checkLbs);
function bindButtons() {
    // Insert new record
    document.getElementById('updateWorkout').addEventListener('click', function (event) {
        var newRecord = getWorkoutEditFormData();
        var isValid = checkValidity(newRecord);
        if (isValid) {
            var req = new XMLHttpRequest();
            var urlParams = constructWorkoutEditParams(newRecord);
            var url = "/update?" + urlParams;
            req.open('GET', url, true);
            req.addEventListener('load', function () {
                if (req.status >= 200 && req.status < 400) {
                    var test = window.location.href.split("/edit")[0];
                    window.location.href = test;
                }
                else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send();
            event.preventDefault();
        }
    })
}

function constructWorkoutEditParams(workout) {
    var id = workout.id;
    var name = workout.name;
    var reps = workout.reps;
    var weight = workout.weight;
    var date = workout.date;
    var lbs = workout.lbs;

    var result = "id=" + id + "&name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs;
    return result;
}

function getWorkoutEditFormData() {
    var id = document.getElementById('workoutId').value;
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

    var workout = { "id": id, "name": name, "reps": reps, "weight": weight, "date": date, "lbs": lbs };
    return workout;
}

// Check if a record is valid for saving
function checkValidity(record) {
    if (record != null && record.name != null && record.name.length > 0) {
        return true;
    }
    return false;
}

function checkLbs() {
    var lbs = document.getElementById('workoutLbs').value;
    if (lbs == 1) {
        document.getElementById("workoutLbs").checked = true;
    }
    else {
        document.getElementById("workoutLbs").checked = false;
    }
}