import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, Switch, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../../config/config.json";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../assets/css/Css';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globais from '../../../Componentes/Globais';
import { Title, DataTable } from 'react-native-paper';

export default function Historico() {   
    

    const navigation = useNavigation();
    
    const [retornoBancoHistorico,setRetornoBancoHistorico]=useState([]); 
    const [qtdHistorico, setQtdHistorico]=useState(50); //alterar número do padrão do useState para alterar qtd de linhas do historico para carregar
    

    
    useEffect(()=> { 
        listarDadosHistorico();
    },[])
   

    async function listarDadosHistorico(){
        const res = await axios.get(config.apiListarHistorico + "?qtd="+qtdHistorico);
        if(res.data.success == true){
            setRetornoBancoHistorico(res.data.result);
        }
    }
    

    
    function doHistorico(data_retirada, condutor, descricao, data_devolucao, destino, obs_retirada, obs_devolucao){
        return (
            <DataTable.Row  style={styles.tableRow}>
                <DataTable.Cell style={styles.tableCell}>{ data_retirada }</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ condutor }</DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ descricao } </DataTable.Cell>
                <DataTable.Cell style={styles.tableCell}>{ data_devolucao }</DataTable.Cell>              
                <DataTable.Cell style={styles.tableCell}>{ destino }</DataTable.Cell>             
                <DataTable.Cell style={styles.tableCell}>{ obs_retirada }</DataTable.Cell>             
                <DataTable.Cell style={styles.tableCell}>{ obs_devolucao }</DataTable.Cell>
            </DataTable.Row>

        );
    }
    
    return (

        <ScrollView>
            <View style={styles.containerLogin}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
                    <Text style={styles.textStyleH2}>Histórico de Veículos</Text>
                
                </Animatable.View>

                <View style={styles.container}>
                    <ScrollView horizontal>
                        <DataTable style={styles.tableRow}>
                            <DataTable.Header>
                            <DataTable.Title style={styles.tableCell}>Retirada</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Condutor</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Veículo</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Devolução</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Destino</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Observação Retirada</DataTable.Title>
                                <DataTable.Title style={styles.tableCell}>Observação Devolução</DataTable.Title>
                            </DataTable.Header>

                            {retornoBancoHistorico.map(itemHistorico => (

                                <View key={itemHistorico.id_historico}>
                                    {doHistorico(itemHistorico.data_retirada, itemHistorico.condutor, itemHistorico.descricao, itemHistorico.data_devolucao)}
                                </View>
                            ))}

                        </DataTable>
                    </ScrollView>

                </View>
                
            
            </View>
        </ScrollView>
    );
}
