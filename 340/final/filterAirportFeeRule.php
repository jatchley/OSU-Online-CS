<?php
//Turn on error reporting
ini_set('display_errors', 'On');
//Connects to the database
$mysqli = new mysqli("oniddb.cws.oregonstate.edu","atchleyj-db","8sWthcbiYh2iXbIl","atchleyj-db");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<body>
<div>
	<table>
		<caption> Filtered Airport Fee Rules </caption>
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
		WHERE AirportFeeRule.AirportId = ?
		ORDER BY Airport.AirportCode, FeeRule.Name ASC"))){
			echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
		}
		if(!($stmt->bind_param("i",$_POST['AirportId']))){
			echo "Bind failed: "  . $stmt->errno . " " . $stmt->error;
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
</body>
</html>