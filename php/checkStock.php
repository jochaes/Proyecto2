<?php
$archivo = '../data/datos.json'; // Nombre del archivo JSON



// Abre el archivo en modo lectura ('r')
$manejador = fopen($archivo, 'r');


$requestDataItems = file_get_contents( "php://input" ); //$data is now the string '[1,2,3]';
$requestDataItems = json_decode( $requestDataItems ); //$data is now a php array array(1,2,3)


error_log( print_r($requestDataItems, true) );


if ($manejador) 
{
    // Lee el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Decodifica la cadena JSON en un array de PHP
    $datos = json_decode($json_data, true); 


    foreach ($requestDataItems as $item) {
        $id = $item->id;
        $cantidadPedido = $item->cantidad;

        error_log( print_r($id, true) );



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