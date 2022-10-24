<?php 

include_once('conexao.php');
$postjson = json_decode(file_get_contents("php://input"), true);

date_default_timezone_set('America/Sao_Paulo');
$datalocal = date('Y-m-d H:i:s');

//encriptando senha para comparar com o banco

//recebendo dados do json
$usuario = $postjson['userLogado'];
$idVeiculo = $postjson['idVeiculo'];
$destino = $postjson['destino'];
$observacoes = $postjson['observacoes'];


	//$query_insert = "insert into vehicle_histories(id_veiculo, condutor, data_retirada, destino, obs_retirada) values (?,?,?,?,?)";
	$query_insert = $pdo->query("insert into historico_veiculo(id_veiculo, condutor, data_retirada, destino, obs_retirada) values ($idVeiculo,'$usuario','$datalocal','$destino','$observacoes')");
	//$query_insert->execute([$idVeiculo, $usuario, $datalocal, $destino, $observacoes]);
	$query_insert->execute();
	//$stmt= $pdo->prepare($query_insert);
	//$stmt->execute([$idVeiculo, $usuario, $datalocal, $destino, $observacoes]);

	if($query_insert){
		
		//$query = $pdo->query("update vehicles set reservada_por = '$usuario', disponivel = 0 WHERE id = $idVeiculo");
		$query = $pdo->query("update veiculos set reservada_por = '$usuario', disponivel = 0 WHERE id = $idVeiculo");
		
		$query->execute();

		if($query){
			$result = json_encode(array('success'=>true));
		}else{
			$result = json_encode(array('success'=>false));
		}
		
	}else{
		$result = json_encode(array('success'=>false));
	}
	echo $result;
 ?>