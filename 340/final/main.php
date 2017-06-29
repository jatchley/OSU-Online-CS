<link rel="stylesheet" href="style.css">

<?php
//Turn on error reporting
ini_set('display_errors', 'On');
//Connects to the database
$mysqli = new mysqli("oniddb.cws.oregonstate.edu","atchleyj-db","8sWthcbiYh2iXbIl","atchleyj-db");
if($mysqli->connect_errno){
	echo "Connection error " . $mysqli->connect_errno . " " . $mysqli->connect_error;
	}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<body>

<!-- AIRPORT -->
<div>
	<table>
		<caption> Airport </caption>
		<thead>
			<tr id="header">
				<th> Airport Code </th>
				<th> Name </th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare("SELECT AirportCode, FullName FROM Airport"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($airportCode, $airportName)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $airportCode . "\n</td>\n<td>\n" . $airportName . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Airport</h3>
	<form method="post" action="addAirport.php"> 
		<fieldset>
			<p>Airport Code <input type="text" name="AirportCode" /></p>
			<p>Full Name <input type="text" name="FullName" /></p>
		</fieldset>
		<p><input type="submit" value="Add Airport" /></p>
	</form>
</div>

<!-- OPERATOR -->
<div>
	<table>
		<caption> Operator </caption>
		<thead>
			<tr id="header">
				<th> First Name </th>
				<th> Last Name </th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare("SELECT FirstName, LastName FROM Operator"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($firstName, $lastName)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $firstName . "\n</td>\n<td>\n" . $lastName . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Operator</h3>
	<form method="post" action="addOperator.php"> 
		<fieldset>
			<p>First Name <input type="text" name="FirstName" /></p>
			<p>Last Name <input type="text" name="LastName" /></p>
		</fieldset>
		<p><input type="submit" value="Add Operator" /></p>
	</form>
</div>

<!-- AIRCRAFT MODEL -->
<div>
	<table>
		<caption> Aircraft Model </caption>
		<thead>
			<tr id="header">
				<th> Model Code </th>
				<th> Landing Weight</th>
				<th> Takeoff Weight</th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare("SELECT ModelCode, LandingWeight, TakeoffWeight FROM AircraftModel"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($modelCode, $landingWeight, $takeoffWeight)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $modelCode . "\n</td>\n<td>\n" . $landingWeight . "\n</td>\n<td>\n" . $takeoffWeight . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Model Code</h3>
	<form method="post" action="addAircraftModel.php"> 
		<fieldset>
			<p>Model Code <input type="text" name="ModelCode" /></p>
			<p>Landing Weight <input type="text" name="LandingWeight" /></p>
			<p>Takeoff Weight <input type="text" name="TakeoffWeight" /></p>
		</fieldset>
		<p><input type="submit" value="Add Model Code" /></p>
	</form>
</div>

<div>
	<h3>Edit Model Code Weights</h3>
	<form method="post" action="updateAircraftModel.php"> 
		<fieldset>
			<legend>Model Code</legend>
			<select name="Id">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, ModelCode FROM AircraftModel"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $modelCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $modelCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>

		<fieldset>
			<legend>Name</legend>
			<p>Landing Weight <input type="text" name="LandingWeight" /></p>
			<p>Takeoff Weight <input type="text" name="TakeoffWeight" /></p>
		</fieldset>
		<p><input type="submit" value="Edit Model Code Weights" /></p>
	</form>
</div>

<!-- AIRCRAFT -->
<div>
	<table>
		<caption> Aircraft </caption>
		<thead>
			<tr id="header">
				<th> Tail Number </th>
				<th> Model Code </th>
				<th> Operator </th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare(
		"SELECT Aircraft.TailNumber, AircraftModel.ModelCode, CONCAT(Operator.FirstName, ' ', Operator.LastName) FROM Aircraft
		INNER JOIN AircraftModel
		on Aircraft.ModelId = AircraftModel.Id
		INNER JOIN Operator
		on Aircraft.OperatorId = Operator.Id"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($tailNumber, $modelCode, $fullName)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $tailNumber . "\n</td>\n<td>\n" . $modelCode . "\n</td>\n<td>\n" . $fullName . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Aircraft</h3>
	<form method="post" action="addAircraft.php"> 
		<fieldset>
			<p>Tail Number <input type="text" name="TailNumber" /></p>
		</fieldset>

		<fieldset>
			<legend>Model Code</legend>
			<select name="ModelId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, ModelCode FROM AircraftModel"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $modelCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $modelCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>

		<fieldset>
			<legend>Operator</legend>
			<select name="OperatorId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, CONCAT(FirstName, ' ', LastName) as FullName FROM Operator"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $fullName)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $fullName . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>
		<p><input type="submit" value="Add Aircraft" /></p>
	</form>
</div>

<!-- INVOICE -->
<div>
	<table>
		<caption> Invoice </caption>
		<thead>
			<tr id="header">
				<th> Invoice ID </th>
				<th> Invoice Date </th>
				<th> Amount </th>
				<th> Operator </th>
				<th> Airport </th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare(
		"SELECT Invoice.Id, Invoice.InvoiceDate, Invoice.Amount, CONCAT(Operator.FirstName, ' ', Operator.LastName), Airport.AirportCode FROM Invoice
		INNER JOIN Operator
		on Invoice.OperatorId = Operator.Id
		INNER JOIN Airport
		on Invoice.AirportId = Airport.Id"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($invoiceId, $invoiceDate, $amount, $fullName, $airportCode)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $invoiceId . 
		"\n</td>\n<td>\n" . $invoiceDate . 
		"\n</td>\n<td>\n$" . $amount .
		"\n</td>\n<td>\n" . $fullName . 
		"\n</td>\n<td>\n" . $airportCode . 
		"\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Invoice</h3>
	<form method="post" action="addInvoice.php"> 
		<fieldset>
			<legend>Operator</legend>
			<select name="OperatorId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, CONCAT(FirstName, ' ', LastName) FROM Operator"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $fullName)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $fullName . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>

		<fieldset>
			<legend>Airport</legend>
			<select name="AirportId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, AirportCode FROM Airport"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $airportCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $airportCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>

		<fieldset>
			<p>Amount ($) <input type="text" name="Amount" /></p>
			<p>Invoice Date <input type="date" name="InvoiceDate" /></p>
		</fieldset>

		<p><input type="submit" value="Add Invoice" /></p>
	</form>
</div>

<!-- FEE RULE -->
<div>
	<table>
		<caption> Fee Rule </caption>
		<thead>
			<tr id="header">
				<th> Fee Rule Name </th>
				<th> Price</th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare(
		"SELECT Name, Price FROM FeeRule"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($name, $price)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $name . "\n</td>\n<td>\n" . $price . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Fee Rule</h3>
	<form method="post" action="addFeeRule.php"> 
		<fieldset>
			<p>Rule Name <input type="text" name="RuleName" /></p>
			<p>Price <input type="text" name="Price" /></p>
		</fieldset>
		<p><input type="submit" value="Add Fee Rule" /></p>
	</form>
</div>

<!-- AIRPORT FEE RULES -->
<div>
	<table>
		<caption> Airport Fee Rules </caption>
		<thead>
			<tr id="header">
				<th> Airport Code </th>
				<th> Fee Rule </th>
			</tr>
		<tbody>
		<?php
		if(!($stmt = $mysqli->prepare(
		"SELECT Airport.AirportCode, FeeRule.Name FROM AirportFeeRule
		INNER JOIN Airport
		on AirportFeeRule.AirportId = Airport.Id
		INNER JOIN FeeRule
		on AirportFeeRule.FeeRuleId = FeeRule.Id
		ORDER BY Airport.AirportCode, FeeRule.Name ASC"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!$stmt->execute()){
			echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		if(!$stmt->bind_result($airportCode, $feeRuleName)){
			echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
		}
		while($stmt->fetch()){
		echo "<tr>\n<td>\n" . $airportCode . "\n</td>\n<td>\n" . $feeRuleName . "\n</td>\n</tr>";
		}
		$stmt->close();
		?>
	</table>
</div>

<div>
	<h3>Add Airport Fee Rule</h3>
	<form method="post" action="addAirportFeeRule.php"> 
		<fieldset>
			<legend>Airport</legend>
			<select name="AirportId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, AirportCode FROM Airport"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $airportCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $airportCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>

		<fieldset>
			<legend>Fee Rule</legend>
			<select name="FeeRuleId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, Name FROM FeeRule"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $ruleName)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $ruleName . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>
		<p><input type="submit" value="Add Airport Fee Rule" /></p>
	</form>
</div>

<div>
	<h3>Delete Airport Fee Rule</h3>
	<form method="post" action="deleteAirportFeeRule.php"> 
		<fieldset>
			<legend>Delete Fee Rules By Airport</legend>
			<select name="AirportId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, AirportCode FROM Airport"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $airportCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $airportCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>

			<select name="FeeRuleId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, Name FROM FeeRule"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $ruleName)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $ruleName . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>
		<p><input type="submit" value="Delete Fee Rules" /></p>
	</form>
</div>

<div>
	<h3>Filter Airport Fee Rule</h3>
	<form method="post" action="filterAirportFeeRule.php"> 
		<fieldset>
			<legend>View Fee Rules By Airport</legend>
			<select name="AirportId">
				<?php
				if(!($stmt = $mysqli->prepare("SELECT Id, AirportCode FROM Airport"))){
					echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
				}
				if(!$stmt->execute()){
					echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				if(!$stmt->bind_result($id, $airportCode)){
					echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
				}
				while($stmt->fetch()){
					echo '<option value=" '. $id . ' "> ' . $airportCode . '</option>\n';
				}
				$stmt->close();
				?>
			</select>
		</fieldset>
		<p><input type="submit" value="Filter Airport Fee Rules" /></p>
	</form>
</div>

</body>
</html>