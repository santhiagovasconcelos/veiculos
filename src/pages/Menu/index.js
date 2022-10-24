import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, Switch, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globais from '../../Componentes/Globais';
import { Title } from 'react-native-paper';

export default function Menu() {   
    
    //const { userLogado } = route.params; utilizado p trazer quem logou
   
    //const [ userLogado ]=useState(Globais.usuarioLogado);

    

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isEnabledDark, setIsEnabledDark] = useState(false);
    const darkModeSwitch = () => setIsEnabledDark(previousStateDark => !previousStateDark);
    const navigation = useNavigation();

    
    useEffect(()=> { 
        checandoSalvar(Globais.salvarLogin);
    },[])
   

    const salvarRegistro = async (salvar) =>{
        try{    
            await AsyncStorage.setItem('@storage_salvarlogin', salvar);  
            Globais.salvarLogin = salvar;  
        }catch (e){
            alert('Erro ao armazenar chave no registro de login: ' + e);
        }
    }

    function checandoSalvar(value){
        if(value == 'não'){
            setIsEnabled(false);
        }else if(value == 'salvar'){
            setIsEnabled(true);
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


    //testeVariable=Globais.usuarioLogado;

    function montandoSwitch(titulo, toggleSw, enable){
        return (
            <View style={styles.containerHorizontal}>
                <View style={styles.squareLeft}>
                    <Text style={styles.titleSwitch}>{titulo}</Text>
                </View>
                <View style={styles.squareRight}>
                    <Switch 
                        labelAlignment='left'
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={enable ? "#13489E" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSw}
                        value={enable}
                    />
                </View>
            </View>
        

        );
    }

    function salvarPreferencias(value){
        //if(value != Globais.salvarLogin){
            if(value == true){
                salvarRegistro('salvar');
            }else{
                salvarRegistro('não');
            }

            alert('Preferências salvas com sucesso!')
        //}
    }
    
    return (
        <View style={styles.containerLogin}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
                <Text style={styles.textStyleH2}>{Globais.usuarioLogado}</Text>
              
            </Animatable.View>

            <Animatable.View animation="fadeInLeft" style={styles.containerFormLogin}>
            
                <Text style={styles.titleTopoSwitch}>Preferências de Sistema</Text>

                <View>

                    {montandoSwitch('Dark Mode', darkModeSwitch, isEnabledDark)}
                    
                    {montandoSwitch('Permitir salvar login', toggleSwitch, isEnabled)}

                    <TouchableOpacity onPress={ ()=>salvarPreferencias(isEnabled) } style={styles.buttonListMenu}>
                        <Text style={styles.buttonTextLogin}>Salvar Preferências</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    <Text style={styles.titleTopoSwitch}>Históricos e Cadastros</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Historico')} style={styles.buttonListMenu}>
                        <Text style={styles.buttonTextLogin}>Histórico de Veículos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ ()=>alert('Tela ainda não disponível!') } style={styles.buttonListMenu}>
                        <Text style={styles.buttonTextLogin}>Cadastro de Veículos</Text>
                    </TouchableOpacity>
                </View>

                
            </Animatable.View>
        
        </View>
    );
}
