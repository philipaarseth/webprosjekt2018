<?php
$value = $_POST['postValue'];
$placeId = $_POST['postPlaceId'];

// database connection settings
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "webpro_";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_error()) {
    die("Database connection failed: " . mysqli_connect_error());
}

// read poi_vote
$currentPoiVoteValue = $conn->query("SELECT poi_vote FROM poi WHERE poi_placeID = '$placeId'")->fetch_object()->poi_vote;

// change temporary voi_vote value
$newVoteValue = $currentPoiVoteValue + $value;

// update poi_vote to new value
$sql2 = "UPDATE poi SET poi_vote='$newVoteValue' WHERE poi_placeID = '$placeId'";
// $result = $conn->query($sql2);

if (mysqli_query($conn, $sql2)) {
    header('Content-Type: application/json');
    echo json_encode(array("newValue" => $newVoteValue, "assocPlaceId" => $placeId));
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
