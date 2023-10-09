<?php

$archivo = '../data/datos.json'; // Nombre del archivo JSON
// Abre el archivo en modo lectura ('r')
$manejador = fopen($archivo, 'r');

if ($manejador) 
{
    // Lee el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Configurar la cabecera para indicar que la respuesta es JSON
    header('Content-Type: application/json; charset=utf-8');

    echo $json_data;

} else {
    echo 'Error al abrir el archivo JSON.';
}

?>