// TODO: FINAL TESTING AND DEPLOYMENT

var express = require('express');
var mysql = require('./dbcon.js');
var moment = require('moment');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5750);

// Open the main page
app.get('/', function (req, res, next) {
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    if (rows != null && rows.length > 0) {
      rows = JSON.stringify(rows);
      rows = JSON.parse(rows);
      context.exercises = formatExerciseData(rows);
    }
    context.columns = formatColumnHeaders();
    res.render('home', context);
  });
});

// Redirect to the main page
app.get('/redirect-home', function (req, res, next) {
  res.redirect("/");
});

// Open the page to edit a record
app.get('/edit', function (req, res, next) {
  var context = {};
  mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    if (rows != null && rows.length > 0) {
      rows = JSON.stringify(rows);
      rows = JSON.parse(rows);
      context.exercise = formatExerciseData(rows)[0];
    }
    res.render('edit', context);
  });
});

// Format the column headings for display
function formatColumnHeaders() {
  var data = ["Name", "Reps", "Weight", "Date", "Lbs"];
  var result = [];
  for (var i = 0; i < data.length; i++) {
    result.push({ 'name': data[i] });
  }
  return result;
}

// Format the exercise data for display
function formatExerciseData(exercises) {
  var result = [];
  for (var i = 0; i < exercises.length; i++) {
    // Format the date for the edit page datepicker
    var formattedDate = exercises[i].date;
    formattedDate = moment(formattedDate).format("YYYY-MM-DD");

    result.push({
      'id': exercises[i].id,
      'name': exercises[i].name,
      'reps': exercises[i].reps,
      'weight': exercises[i].weight,
      'date': formattedDate,
      'lbs': exercises[i].lbs
    });
  }

  return result;
}

// Deletes and creates the workouts table
app.get('/reset-table', function (req, res, next) {
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function (err) {
    var createString = "CREATE TABLE workouts(" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name VARCHAR(255) NOT NULL," +
      "reps INT," +
      "weight INT," +
      "date DATE," +
      "lbs BOOLEAN)";
    mysql.pool.query(createString, function (err) {
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});

// Drops the workouts table
app.get('/drop-table', function (req, res, next) {
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function (err) {
    context.results = "Table dropped";
    res.render('home', context);
  });
});

// Delete a record by id
app.get('/delete', function (req, res, next) {
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send('Successfully deleted the record');
  });
});

// Insert a new record
app.get('/insert', function (req, res, next) {
  var context = {};
  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)",
    [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs],
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({ recordID: result.insertId });
    });
});

app.get('/update', function (req, res, next) {
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function (err, result) {
    if (err) {
      next(err);
      return;
    }
    if (result.length == 1) {
      var curVals = result[0];
      // Use updated values if available, otherwise use the old ones
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name,
        req.query.reps || curVals.reps,
        req.query.weight || curVals.weight,
        req.query.date || curVals.date,
        req.query.lbs || curVals.lbs,
        req.query.id],
        function (err, result) {
          if (err) {
            next(err);
            return;
          }
          res.status(302).send();
        });
    }
  });
});

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
