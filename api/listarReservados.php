<?php 

include_once('conexao.php');

//$query = $pdo->query("SELECT vehicle_histories.id AS id_historico, data_retirada, condutor, descricao, destino, obs_retirada, obs_devolucao, data_devolucao FROM vehicle_histories INNER JOIN vehicles ON vehicle_histories.id_veiculo = vehicles.id WHERE finalizado = 0 ORDER BY data_retirada DESC;");
$query = $pdo->query("SELECT historico_veiculo.id AS id_historico, data_retirada, condutor, descricao, destino, obs_retirada, obs_devolucao, data_devolucao FROM historico_veiculo INNER JOIN veiculos ON historico_veiculo.id_veiculo = veiculos.id WHERE finalizado = 0 ORDER BY data_retirada DESC;");


 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
            'id_historico' => $res[$i]['id_historico'],
            'data_retirada' => $res[$i]['data_retirada'],
            'condutor' => $res[$i]['condutor'],
           'descricao' => $res[$i]['descricao'],
 		);

 		}

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>