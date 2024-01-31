<?php

$servername = "185.60.40.210";
$username = "Aimar";
$password = "12345678";
$Ciudad=$_REQUEST["ciudad"];
$CiudadSeparada = explode(',',str_replace('}','',str_replace('{','',str_replace('"','',$Ciudad))));
$link = @new mysqli($servername, $username, $password, $username);


$sql = "UPDATE `localizaciones` SET ";
for($i = 1; $i < count($CiudadSeparada);$i++){
  $parametroSeparado = explode(':',$CiudadSeparada[$i]);
  if($i == count($CiudadSeparada)-1){
    $sql .= "`".$parametroSeparado[0]."`=".$parametroSeparado[1];
  }else{
    $sql .= "`".$parametroSeparado[0]."`=".$parametroSeparado[1].",";
  }
}

$sql .= ' WHERE `nombre`="'.explode(':',$CiudadSeparada[0])[1].'"';

$link->query($sql);

mysqli_close($link);

?>