<?php
$archivo = '../data/datos.json'; // Nombre del archivo JSON

// Abre el archivo en modo lectura ('r')
$manejador = fopen($archivo, 'r');


//Con el issert se valida que el id exista

if (isset($_GET['id'])==false) 
{
    die ("Error debe indicar el id del artículo");
}


$id=$_GET['id'];

if ($manejador) 
{
    // Lee el contenido del archivo JSON en una variable
    $json_data = fread($manejador, filesize($archivo));

    // Cierra el archivo
    fclose($manejador);

    // Decodifica la cadena JSON en un array de PHP
    $datos = json_decode($json_data, true);

    $cont=0;
    while ($cont<count($datos))
    {
        if ($datos[$cont]['id']==$id)
        {
            $datos[$cont]['cantidad']-=1;
        }
        $cont++;
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

    echo 'ok';
    

} else {
    echo 'Error al abrir el archivo JSON.';
}

?>