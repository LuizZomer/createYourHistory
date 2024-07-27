import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import FireLogin from './login';

type LoginScreenNavigationProp = StackNavigationProp<ParamListBase, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {

    const [mail,setMail] = React.useState("");
    const [senha,setSenha] = React.useState("");

    function handleClick(){

        
        return (navigation.navigate('history'))
    }

    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Your History</Text>

            <TextInput 
            label="Email" 
            style={styles.element}
            value={mail}
            onChangeText={text=>setMail(text)}
            />

            <TextInput 
            label="Senha" 
            style={styles.element}
            value={senha}
            onChangeText={text=>setSenha(text)}
            />

            <Button
                title="Login"
                onPress={() => { handleClick() }} 
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    element:{
        margin:10,

    }
});

export default Login;