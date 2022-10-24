import 'react-native-gesture-handler';
import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Image, Text, Pressable, Keyboard, BackHandler, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';
import { Button, DataTable } from 'react-native-paper';
import Globais from '../../Componentes/Globais';

export default function Painel({route}) {   

    const [ userLogado ]=useState(Globais.usuarioLogado); 
    const [message,setMessage]=useState(null);
    const [retornoBanco,setRetornoBanco]=useState([]);   
    const [retornoBancoHistorico,setRetornoBancoHistorico]=useState([]);   
    const [retornoBancoReservados,setRetornoBancoReservados]=useState([]);   
    const [qtdHistorico, setQtdHistorico]=useState(10); //alterar número do padrão do useState para alterar qtd de linhas do historico para carregar
    const navigation = useNavigation();  
    const [modalVisible, setModalVisible] = useState(false);//variavel do modal
   
    const [destino,setDestino]=useState(null);
    const [observacoes,setObservacoes]=useState(null);   
    const [ idVeiculo ]=useState(route.params?.idveiculo);    
    const [ descricaoVeiculo ]=useState(route.params?.descricao);  
    const [disabled,setDisabled]=useState(false);
    const [ descricaoVei, setDescricaoVei]=useState(null);

    //atualizar a pagina ao retornar para ela
    const [load,setLoad] = useState(true);

    useEffect(()=> {
        navigation.addListener('focus', ()=>setLoad(!load));
        

        listarDados();
        listarDadosHistorico();
        listarDadosReservados();
		
		//teste de alteração para git
		

        //Codigo do return to login abaixo
        const backAction = () => {
            Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    navigation.navigate('Welcome');
                    //BackHandler.exitApp();
                    }
                }
            ]);
            return true;
        };

      
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();

        //codigo do return to login acima

    },[load, navigation])

    async function listarDados(){
        const res = await axios.get(config.apiListar);
        setRetornoBanco(res.data.result);
    }

    async function listarDadosHistorico(){
        const res = await axios.get(config.apiListarHistorico + "?qtd="+qtdHistorico);
        if(res.data.success == true){
            setRetornoBancoHistorico(res.data.result);
        }
    }
    
    async function listarDadosReservados(){
        const res = await axios.get(config.apiListarReservados);
        if(res.data.success == true){
            setRetornoBancoReservados(res.data.result);
        }
    }

    function doHistorico(data_retirada, condutor, descricao, data_devolucao){
        return (
            <DataTable.Row  style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>{ data_retirada }</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ condutor }</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ descricao } </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ data_devolucao }</DataTable.Cell>
            </DataTable.Row>

        );
    }

    function doReservados(data_retirada, condutor, descricao){

            return (
                <DataTable.Row  style={styles.tableRow}>
                    <DataTable.Cell style={styles.tableCell}>{ data_retirada }</DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>{ condutor }</DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>{ descricao }</DataTable.Cell>
                </DataTable.Row>
            );
    }

    function doCard(id, descricao, placa, foto, ultimaRevisao, reservadaPor){


        function verificaDisponibilidade(reservado){
            if(reservado == "Disponível"){
                return (
                /**
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Reserva', {usuario: userLogado, idveiculo: id, descricao: descricao})}
                    style={styles.buttonLogin}
                >
                 */

                <TouchableOpacity 
                    onPress={() => navigation.navigate('Reserva', {usuario: userLogado, idveiculo: id, descricao: descricao})}
                    style={styles.buttonLogin}
                >
                        <Text style={styles.buttonTextLogin}>RESERVAR</Text>
                    </TouchableOpacity>

                );
            }else if(reservado != "Disponível" && reservado == userLogado){
                return (
                    <TouchableOpacity 
                        onPress={() => 
                            navigation.navigate('Devolver', {usuario: userLogado, idveiculo: id, descricao: descricao})}
                        style={styles.buttonDevolver}
                    >
                        <Text style={styles.buttonTextLogin}>DEVOLVER</Text>
                    </TouchableOpacity>
                );
            }else{
                return (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Indisponivel', {usuario: userLogado, idveiculo: id, descricao: descricao, reservadapor: reservadaPor})}
                        style={styles.buttonIndisponivel}
                    >
                        <Text style={styles.buttonTextLogin}>INDISPONÍVEL</Text>
                    </TouchableOpacity>
                );
            }
            }
            if(descricao != ""){

                
                return(
                

                    <Animatable.View animation="fadeInUp" style = {styles.containerCard}>
                        <View style={styles.card}>
                            <View style={styles.containerFotoVeiculo}>
                                <Image
                                        style={styles.veiculo}
                                        source={{
                                            uri: config.urlFotoVeiculo + foto,
                                        }}
                                        resizeMode="contain" //linha para pegar todo o tamanho do contain da imagem
                                />
                            </View>
                            
                            <Text style={styles.tittle}>{ descricao }</Text>
                            <Text style={styles.text}>Código do Veículo: { id }</Text>
                            <Text style={styles.text}>Placa: { placa }</Text>
                            <Text style={styles.text}>Última Revisão: { ultimaRevisao }</Text>

                            { verificaDisponibilidade(reservadaPor) }
                            
                            <Text style={styles.text}></Text>
                        </View>
                    </Animatable.View>
                    );
            }else{
                return(
                    <Text style={styles.text}>Não foi possível carregar os veículos</Text>
                );
            }
        }

    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" style={styles.containerMenu}>

                <Ionicons style={styles.buttonMenu} name="md-menu" size={30} 
                        onPress={() => navigation.navigate("Menu", {usuario: userLogado})}
                    //onPress={() => alert('This is a button!')}
                    //onPress={ }
                    
                    />
                    <Text style={styles.tittleLogado}> Bem vindo, {userLogado}</Text>
                    
            </Animatable.View>

            <View style={styles.containerLogo}>
                    <Animatable.Image
                            animation="fadeInRight"
                            source={require('../../assets/img/logo-horizontal.png')}
                            style={{ width: '90%' }}
                            resizeMode="contain" //linha para pegar todo o tamanho do contain da imagem
                    />
            </View>
            
            <View style={styles.container}>
                

                {retornoBanco.map(item => (
                    <View key={item.id}>

                        { doCard(item.id, item.descricao, item.placa, item.foto, item.ultima_revisao, item.reservada_por) }
                    </View>
                ))}
            </View>

            
            <Text style={styles.tittleHistoricos}>Veículos em Trânsito</Text>
            <ScrollView horizontal>
                <DataTable style={styles.tableRow}>
                    <DataTable.Header>
                    <DataTable.Title>Retirada</DataTable.Title>
                        <DataTable.Title>Condutor</DataTable.Title>
                        <DataTable.Title>Veículo</DataTable.Title>
                    </DataTable.Header>

                    {retornoBancoReservados.map(itemReservado => (

                        <View key={itemReservado.id_historico}>
                            {doReservados(itemReservado.data_retirada, itemReservado.condutor, itemReservado.descricao)}
                        </View>
                    ))}
                </DataTable>  
            </ScrollView>

            <Text style={styles.tittleHistoricos}>Histórico de Veículos</Text>
                
            <ScrollView horizontal>
                <DataTable style={styles.tableRow}>
                    <DataTable.Header>
                    <DataTable.Title style={styles.tableCell}>Retirada</DataTable.Title>
                        <DataTable.Title style={styles.tableCell}>Condutor</DataTable.Title>
                        <DataTable.Title style={styles.tableCell}>Veículo</DataTable.Title>
                        <DataTable.Title style={styles.tableCell}>Data Devolução</DataTable.Title>
                    </DataTable.Header>

                    {retornoBancoHistorico.map(itemHistorico => (

                        <View key={itemHistorico.id_historico}>
                            {doHistorico(itemHistorico.data_retirada, itemHistorico.condutor, itemHistorico.descricao, itemHistorico.data_devolucao)}
                        </View>
                    ))}

                    </DataTable>
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('Historico')} style={styles.buttonListMenu}>
                <Text style={styles.buttonTextLogin}>Histórico Completo</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
