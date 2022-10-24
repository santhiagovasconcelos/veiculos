
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    containerMenu: {
        flex:2, //pegar todo o tamanho da tela
        backgroundColor: '#13489E'
    },
    container: {
        flex:2, //pegar todo o tamanho da tela
        backgroundColor: '#FFFAFA'
    },
    containerHorizontal: {
        //pegar todo o tamanho da tela
        flexDirection: 'row',
    },
    squareLeft: {
        flex: 3,
        height: 50,
        textAlign: 'left',
        justifyContent: 'center',
    },
    squareRight: {
        flex: 1,
        height: 50,
    },
    tableRow: {
        //backgroundColor: 'white'
    }, 
    tableCell: {
        width: 150,
        paddingEnd: 3,
        paddingStart: 3,
        //backgroundColor: 'white'
    },
    containerTable: {
        paddingTop: 100,
        paddingHorizontal: 30,
      },
    containerLogoCarro:{
        flex:1,
        backgroundColor: '#FFFAFA',
        justifyContent: 'center',
        alignItems: 'center' 

    },
    containerLogo:{
        flex:0.3,
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 35,
        backgroundColor: 'white'
    },
    containerFotoVeiculo:{
        flex:0.4,
        alignItems: 'center',
        marginBottom: 35,
    },
    containerForm:{
        flex:1,
        backgroundColor: 'white',//#13489E
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderTopColor: '#D3D3D3',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    tittle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#13489E',
        
    },
    tittleHistoricos: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
        textAlign: 'center',
        color: '#13489E',
    },
    tittleLogado: {
        fontSize: 15,
        marginEnd: 10,
        marginBottom: 5,
        textAlign: 'right',
        color: 'white',
    },
    text: {
        fontSize: 20,
        color: '#a1a1a1',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#13489E',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },    
    containerLogin: {
        flex:1,
        backgroundColor: '#13489E'
    },   
    containerRodape: {
        flex:0.5,
        backgroundColor: 'pink',
        marginBottom: 5,
        alignSelf: "flex-end"

    },
    containerHeaderLogin: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',

    },
    
    textStyleH2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    },
    containerFormLogin: {
        backgroundColor: 'white',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    titleLogin: {
        fontSize: 20,
        marginTop: 28,
    },
    titleSwitch: {
        fontSize: 22,
        alignItems: 'center'
    },
    titleTopoSwitch: {
        fontSize: 20,
        marginTop: 28,
        marginBottom: 25,
        borderColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    
    titleRodape: {
        fontSize: 20,
        marginTop: 28,
        marginBottom: 25,
        borderColor: '#D3D3D3',
        borderTopWidth: 1,
        textAlign: 'center'
    },
    inputAreaLogin:{
        flexDirection: 'row',
        width: '90%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center'
    },
    inputLogin:{
        width: '98%',
        height: 50,
        padding: 8,
        fontSize: 18,
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    icon: {
        width: '11%',
        //height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogin: {
        backgroundColor: '#13489E',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',//alinha horizontalmente
        color: 'white'
    },
    buttonListMenu: {
        backgroundColor: '#13489E',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    buttonDevolver: {
        backgroundColor: '#2E8B57',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',//alinha horizontalmente
        color: 'white'
    },
    buttonMenu: {
        marginStart: 20,
        marginTop: 20,
        color: 'white'
    },
    buttonIndisponivel: {
        backgroundColor: '#C0C0C0',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',//alinha horizontalmente
        color: 'white'
    },
    buttonTextLogin: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegisterLogin: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerTextLogin: {
        color: '#A1A1A1'
    },
    alertaText: {
        color: '#FA8072',
        textAlign: 'center',
        paddingTop: 10
    },
    loginMessage:{
        color: 'red',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        alignSelf: 'center'
    },
    containerCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderTopColor: '#D3D3D3',
        borderBottomColor: 'white',
        borderLeftColor: '#D3D3D3',
        borderRightColor: '#D3D3D3',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    card: {
        backgroundColor: 'white',
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 5,
        marginBottom: 5
    },
    veiculo: {
        width: 300,
        height: 300,
    },
    //abaixo o css do modal
    centeredView: {
        flex:2,
        height: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      modalView: {
        margin: 20,
        backgroundColor: "red",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

      //CSS do modal do route
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export {styles};//aqui é utilizado para poder ser recebido por outra página