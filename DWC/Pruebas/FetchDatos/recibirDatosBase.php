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
  $sql = 'SELECT * from localizaciones';
  $resultado = $link->query($sql);

  $filas = $resultado->num_rows;

for ($i = 0; $i < $filas; $i++) {
  $fila = mysqli_fetch_array($resultado);
  $miArray[$i] = array("nombre"=>utf8_encode($fila["nombre"]),"temperatura"=>$fila["temperatura"],"humedad"=>$fila["humedad"],"lluvia"=>$fila["lluvia"],"viento"=>$fila["viento"],"precipitacion"=>$fila["precipitacion"]);
}

echo  json_encode($miArray);


mysqli_close($link);

?>