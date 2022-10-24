import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';

export default function Devolver({route}) {   

    //const { userLogado } = route.params; utilizado p trazer quem logou
    const [message,setMessage]=useState(null);
    const [destino,setDestino]=useState(null);
    const [observacoes,setObservacoes]=useState(null);   
    const [ userLogado ]=useState(route.params?.usuario); 
    const [ idVeiculo ]=useState(route.params?.idveiculo);    
    const [ descricaoVeiculo ]=useState(route.params?.descricao);  

    const [retornoBanco,setRetornoBanco]=useState([]);   
    const navigation = useNavigation();
    const [disable, setDisable] = React.useState(false);



    async function devolverVeiculo(){
        const obj = {userLogado, idVeiculo, observacoes};
        const res = await axios.post(config.apiDevolverVeiculo, obj);
        console.log(res.data.success);
        if(res.data.success == false){
          //mensagemDadosIncorretos();
          console.log('Não foi possível realizar devolução!');
          
        }else{
          //setAbrirLogin(false);
            navigation.navigate('Painel');
        }
    }


    return (
        <View style={styles.containerLogin}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
            <Text style={styles.message}>Veículo para devolução: { descricaoVeiculo } </Text>

        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerFormLogin}>

            <Text style={styles.titleLogin}>Observações da Devolução</Text>
            <TextInput
                placeholder="Informe algum detalhe relevante do veículo..."
                style={styles.inputLogin}
                onChangeText={(texto) => setObservacoes(texto)}
            />

            <TouchableOpacity onPress={ devolverVeiculo } style={styles.buttonLogin}>
                <Text style={styles.buttonTextLogin}>Confirmar Devolução</Text>
            </TouchableOpacity>

            
        </Animatable.View>
        
    </View>
    );
}
