<?php
$db_name = 'db_user';
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$dns = "mysql:host=$db_host; dbname=$db_name";

try {
    $pdo = new PDO($dns, $db_user, $db_password);
} catch (PDOException $e) {
    echo "Erro na conexão como banco de dados" . $e->getMessage();
}
