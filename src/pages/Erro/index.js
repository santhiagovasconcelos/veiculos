import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';

export default function Erro({route}) {   

    //const { userLogado } = route.params; utilizado p trazer quem logou  
    const [ mensagemErro ]=useState(route.params?.mensagem);  
  
    const navigation = useNavigation();

    return (
        <View style={styles.containerLogin}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
                <Text style={styles.message}>Algo deu errado: { mensagemErro } </Text>

            </Animatable.View>
        </View>
    );
}
