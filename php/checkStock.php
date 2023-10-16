<?php

// Check Stock

// Este Script verifica si hay suficiente stock para los productos que se van a comprar.
// Se llama antes de cargar la pagina de confirmacion de compra.


// Archivo JSON con los datos de los productos
$archivo = '../data/datos.json'; 

// Abre el archivo JSON en modo lectura ('r')
$manejador = fopen($archivo, 'r');

// Toma el Json con la lista de productos que viene en el request
$requestDataItems = file_get_contents( "php://input" ); //$data is now the string '[1,2,3]';
$requestDataItems = json_decode( $requestDataItems ); //$data is now a php array array(1,2,3)


//error_log( print_r($requestDataItems, true) );

//Si se pudo abrir el archivo
if ($manejador) 
{
    // Carga el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Decodifica la cadena JSON en un array de PHP
    $datos = json_decode($json_data, true); 


    // Recorre el array de productos que viene en el request
    // Busca cada uno en el array de productos del archivo JSON
    // Si no hay suficiente stock para alguno, devuelve un error
    foreach ($requestDataItems as $item) {
        $id = $item->id;
        $cantidadPedido = $item->cantidad;

        //error_log( print_r($id, true) );

        $cont=0;
        while ($cont<count($datos)) 
        {
          if ($datos[$cont]['id']==$id)
          {
              if ($datos[$cont]['cantidad']  - $cantidadPedido < 0)
              {
                  echo'{"status":"no"}';
                  die;
              }
          }
          $cont++;
        }

    }

    echo '{"status":"ok"}';

} else {
    echo '{"status":"error"}';
}

?>