<?php

$servername = "185.60.40.210";
$username = "Aimar";
$password = "12345678";
$Ciudad=$_REQUEST["ciudad"];
$CiudadSeparada =explode(":",$Ciudad);
$link = @new mysqli($servername, $username, $password, $username);

if ($link->connect_errno) {
    die('Connect Error: ' . $link->connect_error);
  }
$sql = 'INSERT INTO localizaciones VALUES(';
  for($i = 1 ; $i< count($CiudadSeparada);$i++){
    if($i == count($CiudadSeparada)-1){
        $sql .= str_replace('}','',str_replace('"','',explode(",", $CiudadSeparada[$i])[0]));
    }
    else if($i > 3){
        $sql .= str_replace('"','',explode(",", $CiudadSeparada[$i])[0]).',';
    }
    else{
        $sql .= explode(",", $CiudadSeparada[$i])[0].',';
    }
    
  }
$sql .=')';

$link->query($sql);


mysqli_close($link);
?>