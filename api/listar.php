<?php 

include_once('conexao.php');

//$query = $pdo->query("SELECT * from vehicles where ativo=1");

$query = $pdo->query("SELECT * from veiculos where ativo=1");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'descricao' => $res[$i]['descricao'],
			'placa' => $res[$i]['placa'],
            'ultima_revisao' => $res[$i]['ultima_revisao'],
            'disponivel' => $res[$i]['disponivel'],
            'reservada_por' => $res[$i]['reservada_por'],
            'foto' => $res[$i]['foto'],
 		);

 		}

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>