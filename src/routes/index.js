import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button } from 'react-native';

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Painel from '../pages/Painel'
import Reserva from '../pages/Reserva'
import Indisponivel from '../pages/Indisponivel'
import Devolver from '../pages/Devolver'
import Erro from '../pages/Erro'
import Menu from '../pages/Menu'
import PaginaNaoEncontrada from '../pages/PaginaNaoEncontrada';
import Historico from '../pages/Configuracoes/Historico';
//import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
//import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native'
//import { Painel } from '../pages/Painel';
//import { useNavigation } from '@react-navigation/native'

//const [modalVisible, setModalVisible] = useState(false);

//const navigation = useNavigation();
const Stack = createNativeStackNavigator();

export default function Routes(){


    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false}}//linha adicionada para retirar o header
            />
            <Stack.Screen
                name="Menu"
                component={Menu}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />
             <Stack.Screen
                name="Historico"
                component={Historico}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />
            <Stack.Screen
                name="PaginaNaoEncontrada"
                component={PaginaNaoEncontrada}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false}}//linha adicionada para retirar o header
            />

            <Stack.Screen
                name="Painel"
                component={Painel}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Reserva"
                component={Reserva}
                options={{title: "Reserva de Veículo"}}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />

            <Stack.Screen
                name="Indisponivel"
                component={Indisponivel}
                options={{title: "Veículo já em uso"}}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />

            <Stack.Screen
                name="Erro"
                component={Erro}
                options={{title: "Algo deu errado"}}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />
            
            <Stack.Screen
                name="Devolver"
                component={Devolver}
                options={{title: "Devolução de Veículo"}}
                //options={{ headerShown: false}}//linha adicionada para retirar o header
            />
        </Stack.Navigator>

    )
}