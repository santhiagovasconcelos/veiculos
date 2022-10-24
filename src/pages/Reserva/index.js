import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';

export default function Reserva({route}) {   

    //const { userLogado } = route.params; utilizado p trazer quem logou
    const [message,setMessage]=useState(null);
    const [destino,setDestino]=useState(null);
    const [observacoes,setObservacoes]=useState(null);   
    const [ userLogado ]=useState(route.params?.usuario); 
    const [ idVeiculo ]=useState(route.params?.idveiculo);    
    const [ descricaoVeiculo ]=useState(route.params?.descricao);  

    const [stringMatched,setStringMatched ]=useState(true);

    const [disabled,setDisabled]=useState(false);

    const [retornoBanco,setRetornoBanco]=useState([]);   
    const navigation = useNavigation();
    //const [disable, setDisable] = React.useState(false);
    



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


    return (
        <View style={styles.containerLogin}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
            <Text style={styles.message}>{ descricaoVeiculo }</Text>

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
    );
}
