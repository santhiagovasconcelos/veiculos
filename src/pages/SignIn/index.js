import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import config from "../../../config/config.json";
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { styles } from '../../assets/css/Css';//importando o estilo feito em outra pagina
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';// adicionado para colocar login back
import Globais from '../../Componentes/Globais';
import MicrosoftLogin from "react-microsoft-login";//login microsoft




export default function SignIn() {   
    const navigation = useNavigation();
    const [input, setInput] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [user,setUser]=useState(null);
    const [password,setPassword]=useState(null);
    const [message,setMessage]=useState(null);
    const [usuarioLogado,setUsuarioLogado]=useState(null);
    const [supportedTouch, setSupportedTouch]=useState(5);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

            
            Globais.usuarioLogado = await AsyncStorage.getItem('@storage_realname');
            //pegando registros p logar
            setUser(await AsyncStorage.getItem('@storage_user'));
            setPassword(await AsyncStorage.getItem('@storage_password'));

            //caso seja zero, ir?? para p??gina de login
            if(Globais.salvarLogin == 'n??o'){

                //navigation.navigate("SignIn");
                console.log('vida q segue. n??o ?? p logar sem login e senha')
                setUser('');
                setPassword('');

            }/*else if(Globais.salvarLogin == 'salvar'){//caso seja um, ir?? chamar o login pegando dados do registro  
                console.log('Entrou pelo pegarRegistro e deveria passar direto sem erro de usuario')
                doLogin();
            }*/
        }catch(e){
            alert('Erro ao recuperar chave armazenada: ' + e);
        }
    }

    //antigo storeData
    const salvarRegistro = async (usuario, senha, nomeusuario, salvar) =>{
        try{
            //console.log('Armazenando registro de chave: ' + value)
            //await AsyncStorage.setItem('@storage_key', value);
            
            //Verificando se quer salvar usu??rio e senha
            await AsyncStorage.setItem('@storage_user', usuario);
            await AsyncStorage.setItem('@storage_password', senha); 
            await AsyncStorage.setItem('@storage_usuariologado', nomeusuario);     
            await AsyncStorage.setItem('@storage_salvarlogin', salvar);  
            
            //Globais.salvarLogin = salvar;
            Globais.salvarLogin = salvar;

            
        }catch (e){
            alert('Erro ao armazenar chave no registro de login: ' + e);
        }
    }

    async function doLogin(){
        const obj = {user, password};
        const res = await axios.post(config.apiLogar, obj);
        if(res.data.success == false){
            //mensagemDadosIncorretos();
            //Alert('Login incorreto!');
            //{ ()=>limparCampos };
            setMessage('Usu??rio ou senha inv??lidos');
            setTimeout(()=>{
                setMessage(null);
            },3000);
          
        }else{

            //caso j?? tenha perguntado se quer salvar a senha, ele n??o pergunta mais
            if(Globais.salvarLogin == 'n??o'){
                Globais.usuarioLogado = res.data.usuario;
                navigation.navigate("Painel");
            }else{

                //chamando alert p perguntar se deseja salvar os dados ou n??o caso n??o tenha perguntado ainda
                if(Globais.salvarLogin = ''){
                    Alert.alert("Alerta!", "Deseja salvar usu??rio e senha?", [
                        {
                            text: "N??o",
                            onPress: () => {
                                salvarRegistro('', '', '', 'n??o');
                                console.log('Clicou no n??o e N??O salvou registros: ');
                                //setUsuarioLogado(res.data.usuario);
                                Globais.usuarioLogado = res.data.usuario;
                                navigation.navigate("Painel");  
                            },
                            style: "cancel"
                        },
                        { text: "Sim", onPress: () => {
                            salvarRegistro(user, password, res.data.usuario, 'salvar');
                            console.log('Clicou no sim e salvou registros: ');
                            Globais.usuarioLogado = res.data.usuario;
                            navigation.navigate("Painel");
        
                            }
                        }
                    ]);
                }else{
                    salvarRegistro(user, password, res.data.usuario, 'salvar');
                    Globais.usuarioLogado = res.data.usuario;
                    navigation.navigate("Painel");
                }
            }

            
        }
      }



    return (
    <View style={styles.containerLogin}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderLogin}>
            <Text style={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.containerFormLogin}>
            <Text style={styles.titleLogin}>Login</Text>
            <TextInput
                placeholder="Digite seu login..."
                style={styles.inputLogin}
                value={user}
                onChangeText={(texto) => setUser(texto)}
            />
            <Text style={styles.titleLogin}>Senha</Text>
            <View style={styles.inputAreaLogin}> 
                <TextInput
                    placeholder="Digite sua senha..."
                    style={styles.inputLogin}
                    //value={input}
                    value={password}
                    //onChangeText={(texto) => setInput(texto)}
                    onChangeText={(texto) => setPassword(texto)}
                    secureTextEntry={hidePass}
                />
                <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                    { hidePass ?//aqui ?? mesmo q um if p ver se ta true ou false
                        <Ionicons name="eye" color="#13489E" size={25}/>
                        :
                        <Ionicons name="eye-off" color="#13489E" size={25}/> 
                    }   
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={doLogin} style={styles.buttonLogin}>
                <Text style={styles.buttonTextLogin}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegisterLogin}>
                <Text 
                style={styles.registerTextLogin}>N??o possui uma conta? Cadastre-se</Text>
            </TouchableOpacity>
            {message &&(
                <Animatable.Text animation="fadeInUp" style={styles.loginMessage}>{message}</Animatable.Text>
            )}

        </Animatable.View>
    </View>
    );
}
