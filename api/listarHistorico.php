<?php 
    include_once('conexao.php');
    //verificando se recebe quantidade especifica ou não
    $qtd = $_GET['qtd'];
    $query = $pdo->query("SELECT historico_veiculo.id AS id_historico, data_retirada, condutor, descricao, destino, obs_retirada, obs_devolucao, data_devolucao FROM historico_veiculo INNER JOIN veiculos ON historico_veiculo.id_veiculo = veiculos.id ORDER BY data_retirada DESC;");
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    //verifica se foi solicitado carregamento de quantidade de linhas em especifico. 
    if($qtd == ""){
        
        for ($i=0; $i < count($res); $i++) { 
            foreach ($res[$i] as $key => $value) {
            }
            $dados[] = array(
                'id_historico' => $res[$i]['id_historico'],
                'data_retirada' => $res[$i]['data_retirada'],
                'condutor' => $res[$i]['condutor'],
                'descricao' => $res[$i]['descricao'],
                'data_devolucao' => $res[$i]['data_devolucao'],
            );
    
            }

            if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
    }else{
        for ($i=0; $i < $qtd; $i++) { 
            foreach ($res[$i] as $key => $value) {
            }
            $dados[] = array(
                    'id_historico' => $res[$i]['id_historico'],
                    'data_retirada' => $res[$i]['data_retirada'],
                    'condutor' => $res[$i]['condutor'],
                    'descricao' => $res[$i]['descricao'],
                    'data_devolucao' => $res[$i]['data_devolucao'],
            );
        }
        if(count($res) > 0){
            $result = json_encode(array('success'=>true, 'result'=>$dados));
    
        }else{
            $result = json_encode(array('success'=>false, 'result'=>'0'));

        }
    }
     echo $result;
 ?>