<?php
$nameServer = "localhost";
$username = "root";
$password = "";
$database = "activitat3";


$conn = new mysqli($nameServer, $username, $password, $database);

if ($conn->connect_error) {
    die("error de conexió");
}

if (isset($_POST['cat1'])) {
    $idcat = $_POST['cat1'];
    $sqlsubCats = "SELECT * FROM subcategorias WHERE categoria_id = $idcat";
    $response = $conn->query($sqlsubCats);
    $subCategories = array();

    if ($response->num_rows>0) {
        while ($row = $response->fetch_assoc()) {
            $subcategoria = array(
                'id'=>$row['id'],
                'nomsubcategoria'=>$row['nomsubcategoria']
            );
            array_push($subCategories, $subcategoria);
        }
    }
    echo json_encode($subCategories);
} else {
    $sqlcategories = "SELECT * FROM categorias";
    $result = $conn->query($sqlcategories);
    $categories = array();

    if ($result->num_rows > 0) {
        while ($row= $result->fetch_assoc()) {
            $categoria = array(
                'id'=>$row['id'],
                'nomcategoria'=>$row['nomcategoria']
            );
            array_push($categories,$categoria);
        }
    }
    echo json_encode($categories);
}

$conn->close();
?>