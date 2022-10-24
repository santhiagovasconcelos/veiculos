
import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Image, Text, Modal, Pressable, TouchableWithoutFeedback, Keyboard, BackHandler, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize'; 

//tabela
import { DataTable } from 'react-native-paper';

export default function Painel({route}) {   

    const modalizeRef = useRef(null);
    const [ userLogado ]=useState(route.params?.usuario); 
    const [message,setMessage]=useState(null);
    const [retornoBanco,setRetornoBanco]=useState([]);   
    const [retornoBancoHistorico,setRetornoBancoHistorico]=useState([]);   
    const [retornoBancoReservados,setRetornoBancoReservados]=useState([]);   
    const [qtdHistorico, setQtdHistorico]=useState(5); //alterar número do padrão do useState para alterar qtd de linhas do historico para carregar
    const navigation = useNavigation();
    //const [modalVisible, setModalVisible] = useState(false);
    const [destino,setDestino]=useState(null);
    const [observacoes,setObservacoes]=useState(null);   
    const [ idVeiculo ]=useState(route.params?.idveiculo);    
    const [ descricaoVeiculo ]=useState(route.params?.descricao);  
    const [disabled,setDisabled]=useState(false);
    const [ descricaoVei, setDescricaoVei]=useState(null);

    
  
    

    //atualizar a pagina ao retornar para ela
    const [load,setLoad] = useState(true);
    //const [loadTab, setLoadTab] = useState(true);

    useEffect(()=> {
        navigation.addListener('focus', ()=>setLoad(!load));
        
        listarDados();
        listarDadosHistorico();
        listarDadosReservados();

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

    //metodo para chamar o modalize
    function onOpen(){
        modalizeRef.current?.open();
    }
    

    
    async function reservarVeiculo(){

        //utilizado para desabilitar o botão após o primeiro clique
        setDisabled(true);

        const obj = {userLogado, idVeiculo, destino, observacoes};
        const res = await axios.post(config.apiReservarVeiculo, obj);
        if(res.data.success === 'Locação não realizada'){
          //mensagemDadosIncorretos();
          navigation.navigate('Erro', {mensagemretorno: 'Locação não realizada'});
          
        }else{
            navigation.navigate('Painel');
        }
    }

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
            <DataTable.Row>
                <DataTable.Cell>{ data_retirada }</DataTable.Cell>
                <DataTable.Cell>{ condutor }</DataTable.Cell>
                <DataTable.Cell>{ descricao }</DataTable.Cell>
                <DataTable.Cell>{ data_devolucao }</DataTable.Cell>
            </DataTable.Row>

        );
    }

    function doReservados(data_retirada, condutor, descricao){

            return (
                <DataTable.Row>
                    <DataTable.Cell>{ data_retirada }</DataTable.Cell>
                    <DataTable.Cell>{ condutor }</DataTable.Cell>
                    <DataTable.Cell>{ descricao }</DataTable.Cell>
                </DataTable.Row>
            );
    }

    

    function doCard(id, descricao, placa, foto, ultimaRevisao, reservadaPor){

        

        function verificaDisponibilidade(reservado){
            if(reservado == "Disponível"){
                return (


                /*<TouchableOpacity 
                    onPress={() => navigation.navigate('Reserva', {usuario: userLogado, idveiculo: id, descricao: descricao})}
                    style={styles.buttonLogin}
                >*/

                    <TouchableOpacity 
                        onPress={ ()=>
                            onOpen >
                            setDescricaoVei(descricao)
                        }
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
            

            <View style={styles.container}>
                <View style={styles.containerLogo}>
                    <Animatable.Image
                            animation="fadeInRight"
                            source={require('../../assets/img/logo-horizontal.png')}
                            style={{ width: '90%' }}
                            resizeMode="contain" //linha para pegar todo o tamanho do contain da imagem
                    />
                </View>
                <Text> Bem vindo, {userLogado}</Text>

                <TouchableOpacity 
                    onPress={onOpen}
                    style={styles.buttonLogin}
                >
                    <Text style={styles.buttonTextLogin}>RESERVAR</Text>
                </TouchableOpacity>

                <Modalize
                    ref={modalizeRef}
                    snapPoint={200} //o quanto que o modal vai abrir na tela
                >

                <View style={styles.modalView}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
                                <Text style={styles.message}> {descricaoVei} </Text>
                    
                            </Animatable.View>
                    
                            <Animatable.View animation="fadeInUp" style={styles.containerFormLogin}>
                                <Text style={styles.titleLogin}>Destino</Text>
                                <TextInput
                                    placeholder="Informe o destino..."
                                    style={styles.inputLogin}
                                    onChangeText={(texto) => setDestino(texto)}
                                />
                    
                                <Text style={styles.titleLogin}>Observações</Text>
                                <TextInput
                                    placeholder="Informe algum detalhe relevante do veículo..."
                                    style={styles.inputLogin}
                                    onChangeText={(texto) => setObservacoes(texto)}
                                />
                    
                                <TouchableOpacity disabled={disabled} onPress={ reservarVeiculo } style={styles.buttonLogin}>
                                    <Text style={styles.buttonTextLogin}>Confirmar Reserva</Text>
                                </TouchableOpacity>
                    
                                
                            </Animatable.View>
                </View>

                        </Modalize>

                {retornoBanco.map(item => (
                    <View key={item.id}>

                        { doCard(item.id, item.descricao, item.placa, item.foto, item.ultima_revisao, item.reservada_por) }
                    </View>
                ))}
            </View>

            
            <Text style={styles.tittleHistoricos}>Veículos em Trânsito</Text>

                <DataTable>
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

            <Text style={styles.tittleHistoricos}>Histórico de Veículos</Text>
                <DataTable>
                    <DataTable.Header>
                    <DataTable.Title>Retirada</DataTable.Title>
                        <DataTable.Title>Condutor</DataTable.Title>
                        <DataTable.Title>Veículo</DataTable.Title>
                        <DataTable.Title>Data Devolução</DataTable.Title>
                    </DataTable.Header>

                    {retornoBancoHistorico.map(itemHistorico => (

                        <View key={itemHistorico.id_historico}>
                            {doHistorico(itemHistorico.data_retirada, itemHistorico.condutor, itemHistorico.descricao, itemHistorico.data_devolucao)}
                        </View>
                    ))}

                    </DataTable>

        </ScrollView>


    );
}
