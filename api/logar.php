<?php 
include_once('conexaoLogin.php');
$postjson = json_decode(file_get_contents("php://input"), true);

//encriptando senha para comparar com o banco
$senha = md5($postjson[password]);

$query_buscar = $pdo->query("select username, realname, password from mantis_user_table where username = '$postjson[user]' and password = '$senha'");
 //$query = $pdo->query("select username, realname, password from mantis_user_table where username = '$postjson[user]' and password = '$postjson[password]'");

$res = $query_buscar->fetchAll(PDO::FETCH_ASSOC);

if($res){
	//$result = json_encode(array('success'=>true, 'usuario'=>$res[0]['realname']));
	$result = json_encode(array('usuario'=>$res[0]['realname']));
}else{
	$result = json_encode(array('success'=>false, 'usuario'=>'usu vazio'));
}

echo $result;
 ?>

