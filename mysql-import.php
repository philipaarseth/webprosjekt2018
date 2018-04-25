<?php

//Uncomment this below line for larger database to allow script to execute long time
// set_time_limit(0);

// MySQLi connection settings
$host = 'localhost';
$user = 'root';
$pass = 'root';
$dbname = 'webpro_';
$table1 = 'poi'; // table to override
$table2 = 'campus'; // table to override
$dumpPath = './mysql/dump.sql'; // file path to mysqldump file


// Connect to MySQL server
$connection = mysqli_connect($host, $user, $pass, $dbname);

if (mysqli_connect_errno())
	echo "Failed to connect to MySQL: " . mysqli_connect_error();

// delete table poi if it exists
$sql = "DROP TABLE IF EXISTS {$table1}";
if(mysqli_query($connection, $sql)) {
    echo "Table {$table1} deleted. ";
 } else {
    echo "Table was not deleted successfully\n";
 }

 // delete table poi if it exists
 $sql2 = "DROP TABLE IF EXISTS {$table2}";
 if(mysqli_query($connection, $sql2)) {
     echo "Table {$table2} deleted. ";
  } else {
     echo "Table was not deleted successfully\n";
  }

// Temporary variable, used to store current query
$templine = '';



// Read in entire file
$fp = fopen($dumpPath, 'r');

// Loop through each line
while (($line = fgets($fp)) !== false) {
	// Skip it if it's a comment
	if (substr($line, 0, 2) == '--' || $line == '')
		continue;

	// Add this line to the current segment
	$templine .= $line;

	// If it has a semicolon at the end, it's the end of the query
	if (substr(trim($line), -1, 1) == ';') {
		// Perform the query
		if(!mysqli_query($connection, $templine)){
			print('Error performing query \'<strong>' . $templine . '\': ' . mysqli_error($connection) . '<br /><br />');
		}
		// Reset temp variable to empty
		$templine = '';
	}
}

echo " Then imported MySQLDump {$dumpPath}";



mysqli_close($connection);
fclose($fp);
