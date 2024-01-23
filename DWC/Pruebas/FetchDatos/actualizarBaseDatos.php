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
$sql = 'UPDATE  localizaciones SET temperatura='..',humedad='..',viento='..',lluvia='..',precipitacion='..' WHERE nombre='.;
  

$link->query($sql);


mysqli_close($link);
?>