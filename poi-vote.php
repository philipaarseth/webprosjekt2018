<?php $config = parse_ini_file("config.ini");?>

<?php
$value = $_POST['postValue'];
$placeId = $_POST['postPlaceId'];

// database connection settings
// MySQLi connection settings
$host = $config['host'];
$user = $config['user'];
$pass = $config['pass'];
$dbname = $config['name'];
$port = $config['port'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,$port);
// Check connection
if (mysqli_connect_error()) {
    die("Database connection failed: " . mysqli_connect_error());
}

// read poi_vote
$currentPoiVoteValue = $conn->query("SELECT vote FROM poi WHERE placeID = '$placeId'")->fetch_object()->vote;

// change temporary voi_vote value
$newVoteValue = $currentPoiVoteValue + $value;

// update poi_vote to new value
$sql2 = "UPDATE poi SET vote='$newVoteValue' WHERE placeID = '$placeId'";
// $result = $conn->query($sql2);

if (mysqli_query($conn, $sql2)) {
    header('Content-Type: application/json');
    echo json_encode(array("newValue" => $newVoteValue, "assocPlaceId" => $placeId));
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
