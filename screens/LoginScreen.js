import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);


    const signIn = () => {
            auth
            .signInWithEmailAndPassword(email, password)
            .catch(error => alert(error));
    }
    return (
        <KeyboardAvoidingView behavior='padding' style ={styles.container}>
            <StatusBar style ="light" />
            <Image source = {{
                uri:
                "https://icon-library.com/images/photo-icon/photo-icon-7.jpg",
            }}
            style={{width: 200, height: 200}}
            />

            <View style ={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                autoFocus 
                type = 'email'
                value={email}
                onChangeText={(text) => setEmail(text)}  
                />
                <Input 
                placeholder='Password'
                secureTextEntry 
                type ='password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle = {styles.button} onPress={signIn} title="Login"/>
            <Button containerStyle = {styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register"/>
            <FontAwesome5.Button style={styles.googleButton} name="google" onPress={() => this.googleLogIn()}
        //any other customization you want, like borderRadius, color, or size
            >
            <Text style={styles.googleText}>Log In With Google</Text>
            </FontAwesome5.Button>
            <View style = {{ height: 100}}/>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
    },

    container:{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    button: {
        width: 200,
        marginTop: 10,
    },
})
