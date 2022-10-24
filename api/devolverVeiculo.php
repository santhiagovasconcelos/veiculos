<?php 

include_once('conexao.php');
$postjson = json_decode(file_get_contents("php://input"), true);

date_default_timezone_set('America/Sao_Paulo');
$datalocal = date('Y-m-d H:i:s');

//encriptando senha para comparar com o banco

//recebendo dados do json
$usuario = $postjson['userLogado'];
$idVeiculo = $postjson['idVeiculo'];
$observacoes = $postjson['observacoes'];
 //$query_buscar = $pdo->query("update veiculos set reservada_por = '$usuario', disponivel = 0 WHERE id = $idVeiculo");
 
 //$query = $pdo->query("select username, realname, password from mantis_user_table where username = '$postjson[user]' and password = '$postjson[password]'");

	//$query = $pdo->query("update vehicles set reservada_por = 'Disponível', disponivel = 1 WHERE id = $idVeiculo");
	$query = $pdo->query("update veiculos set reservada_por = 'Disponível', disponivel = 1 WHERE id = $idVeiculo");
	$query->execute();



	if($query){



		//$query_historico = $pdo->query("update vehicle_histories SET obs_devolucao = '$observacoes', data_devolucao = '$datalocal', finalizado = 1 WHERE id_veiculo = $idVeiculo and finalizado = 0 and condutor = '$usuario'");
		$query_historico = $pdo->query("update historico_veiculo SET obs_devolucao = '$observacoes', data_devolucao = '$datalocal', finalizado = 1 WHERE id_veiculo = $idVeiculo and finalizado = 0 and condutor = '$usuario'");
		
		$query_historico->execute();


		//update historico_veiculo SET obs_devolucao = '$obsdevolucao', data_devolucao = '$datalocal', finalizado = 1 WHERE id = $idhistorico";
			

		if($query_historico){
			$result = json_encode(array('success'=>true));
		}else{
			$result = json_encode(array('success'=>false));
		}
	}else{
		
	}
	echo $result;
//$sql3 = "
 ?>