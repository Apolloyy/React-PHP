<?php
require('./connect.php');
require('./config.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['login']) && isset($data['password']) && isset($data['email'])) {
        $login = $data['login'];
        $password = $data['password'];
        $email = $data['email'];

        $sql_insert = 'INSERT INTO tb_user (nm_login, cd_senha, nm_email) VALUES (:login, :password, :email);';

        $insert = $pdo->prepare($sql_insert);

        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        $insert->bindValue(':login', ($login));
        $insert->bindValue(':password', $password_hash);
        $insert->bindValue(':email', ($email));

        if ($insert->execute()) {
            echo json_encode(array("message" => "Inserção bem-sucedida"));
        } else {
            $errorResponse = array("error" => "Erro ao inserir dados", "detalhes" => $insert->errorInfo());
            echo json_encode($errorResponse);
            error_log(json_encode($errorResponse));
        }
    } else {
        echo json_encode(array('error' => 'Não há dados na requisição.'));
    }
} else {
    echo json_encode(array('error' => 'Método de requisição deve ser POST'));
}
