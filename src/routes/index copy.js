import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Painel from '../pages/Painel'
import Reserva from '../pages/Reserva'
import Indisponivel from '../pages/Indisponivel'
import Devolver from '../pages/Devolver'
import Erro from '../pages/Erro'
import LoginCheck from '../pages/LoginCheck'

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
                name="LoginCheck"
                component={LoginCheck}
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
                options={{ headerShown: false}}//linha adicionada para retirar o header
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