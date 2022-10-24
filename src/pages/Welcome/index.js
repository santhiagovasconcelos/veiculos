
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../assets/css/Css'//importando o estilo feito em outra pagina

export default function Welcome() {
    const navigation = useNavigation();

    return (
    <View style={styles.container}>

            <View style={styles.containerLogoCarro}>
                <Animatable.Image
                        animation="fadeInRight"
                        source={require('../../assets/img/l200.png')}
                        style={{ width: '80%' }}
                        resizeMode="contain" //linha para pegar todo o tamanho do contain da imagem
                />
            </View>
        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                        delay={600}
                        animation="fadeInUp"
                        source={require('../../assets/img/logo-horizontal.png')}
                        style={{ width: '50%' }}
                        resizeMode="contain" //linha para pegar todo o tamanho do contain da imagem
                />
            </View>
            
            <Text style={styles.tittle}>Retire, consulte ou entregue o veículo de qualquer lugar!</Text>
            <Text style={styles.text}>Faça o login para começar</Text>
        
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}
            >
            
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
    );
}
