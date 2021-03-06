<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// MySQLi connection settings
$host = 'localhost';
$user = 'root';
$pass = 'root';
$dbname = 'webpro_';
$dir = dirname(__FILE__) . '/dumpz.sql';
$mySqlDumpDir = "/Applications/MAMP/Library/bin/mysqldump";


echo "Backing up database to mysql/dump.sql";

// mysqldump doesn't save to file itself, but we can use the return value to save to file
$result = exec("{$mySqlDumpDir} -h{$host} -u{$user} -p{$pass} {$dbname} --compact &gt; {$dir}", $output);

// save return value from mysqldump to file
if (file_exists("mysql/dump.sql")) {
  echo " - updated file mysql/dump.sql";
} else {
  echo "- created file mysql/dump.sql";
}
$myfile = fopen("mysql/dump.sql", "w");
fwrite($myfile, implode("\n",$output));
fclose($myfile);

//var_dump($output);
