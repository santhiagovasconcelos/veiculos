<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With'); 
header('Content-Type: application/json; charset=utf-8');  

//dados do banco no servidor local
$banco = 'nome_do_banco';
$host = 'localhost'; //IP do banco de dados
$usuario = 'usuariobanco';
$senha = 'senhaBanco';

try {

	$pdo = new PDO("mysql:dbname=$banco;host=$host", "$usuario", "$senha");
	
} catch (Exception $e) {
	echo 'Erro ao conectar com o banco!! '. $e;
}
//PDO("mysql:host=108.167.132.225;dbname=suapee41_suapeenergia","suapee41_master","Suener88.");
 ?>