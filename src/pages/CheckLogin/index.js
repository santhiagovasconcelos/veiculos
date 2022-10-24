import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';// adicionado para colocar login back
import Globais from '../../Componentes/Globais';



export default function CheckLogin() {

    const navigation = useNavigation();
    const [user,setUser]=useState(null);
    const [password,setPassword]=useState(null);

    useEffect(()=> { 
        pegarRegistro();
    },[])
    
    //NOVO - antigo getData
    const pegarRegistro = async () => {
        try{
            //const value = await AsyncStorage.getItem('@storage_key');
            //Alert.alert()
            
            //Pegando registros locais para salvar nas variaveis globais
            Globais.salvarLogin = await AsyncStorage.getItem('@storage_salvarlogin');           
            Globais.realName = await AsyncStorage.getItem('@storage_realname');
            //pegando registros p logar
            setUser = await AsyncStorage.getItem('@storage_user');
            setPassword = await AsyncStorage.getItem('@storage_password');

            //caso seja zero, irá para página de login
            if(Globais.salvarLogin == 0){

                navigation.navigate("SignIn");

            }else if(Globais.salvarLogin == 1){//caso seja um, irá chamar o login pegando dados do registro  
                doLogin(user, password);
            }
        }catch(e){
            alert('Erro ao recuperar chave armazenada: ' + e);
        }
    }

    //NOVO - antigo login()
    async function doLogin(usuario, senha){

        const obj = {usuario, senha};
        const res = await axios.post(config.apiLogar, obj);
        if(res.data.success == false){//caso não consiga logar com os dados do registro, vc irá para tela de login
            //mensagemDadosIncorretos();
            Alert('Login incorreto!');
            navigation.navigate("SignIn");
          
        }else if(res.data.success == true){          

            navigation.navigate("Painel");       
        }
      }
}

