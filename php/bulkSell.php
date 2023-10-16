<?php


// Archivo JSON con los datos de los productos
$archivo = '../data/datos.json'; 

// Abre el archivo JSON en modo lectura ('r')
$manejador = fopen($archivo, 'r');

// Toma el Json con la lista de productos que viene en el request
$requestDataItems = file_get_contents( "php://input" ); //$data is now the string '[1,2,3]';
$requestDataItems = json_decode( $requestDataItems ); //$data is now a php array array(1,2,3)


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

        $cont=0;
        while ($cont<count($datos)) 
        {
          if ($datos[$cont]['id']==$id)
          {
            $datos[$cont]['cantidad'] = $datos[$cont]['cantidad'] - $cantidadPedido;
          }
          $cont++;
        }

    }



    // if ($datos !== null) {
    //     // Puedes acceder a los datos como un array de objetos
    //     foreach ($datos as $articulo) {
    //         echo 'ID: ' . $articulo['id'] . '<br>';
    //         echo 'Nombre: ' . $articulo['nombre'] . '<br>';
    //         echo 'Descripción: ' . $articulo['descripcion'] . '<br>';
    //         echo 'Cantidad: ' . $articulo['cantidad'] . '<br>';
    //         echo 'Estado: ' . ($articulo['estado'] ? 'Activo' : 'Inactivo') . '<br>';
    //         echo 'Imágenes: ' . implode(', ', $articulo['imagenes']) . '<br><br>';
    //     }
    // } else {
    //     echo 'Error al decodificar el archivo JSON.';
    // }

    // Guarda los cambios
    // Convierte los datos en una cadena JSON
    $json_data = json_encode($datos,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    // Nombre del archivo donde se guardará la cadena JSON
    $archivo = '../data/datos.json';

    // Abre el archivo en modo escritura ('w')
    $manejador = fopen($archivo, 'w');

    // Escribe la cadena JSON en el archivo
    fwrite($manejador, $json_data);

    // Cierra el archivo
    fclose($manejador);

    echo '{"status":"ok"}';
    

} else {
    echo '{"status":"error"}';
}

?>