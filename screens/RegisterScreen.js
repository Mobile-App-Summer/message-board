import React, {useState, useLayoutEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imagesURL, setImagesURL] = useState("");
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login",
        });
    }, [navigation]);

    const register =() => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: `${firstName} ${lastName}`,
                photoURL: imagesURL || "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",

            })
        }).catch(error => alert(error.message));
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom:50}}>Let's Sign UP </Text>

            <View  style={styles.inputContainer}>
                <Input
                placeholder="First Name"
                autofocus
                type = "text"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}/>
                <Input
                placeholder="Last Name"
                autofocus
                type = "text"
                value={lastName}
                onChangeText={(text) => setLastName(text)}/>
                <Input
                placeholder="Email"
                autofocus
                type = "text"
                value={email}
                onChangeText={(text) => setEmail(text)}/>
                <Input
                placeholder="Password"
                autofocus
                type = "text"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}/>
                <Input
                placeholder="Profile picutre url (optional)"
                autofocus
                type = "text"
                value={imagesURL}
                onChangeText={(text) => setImagesURL(text)}
                onSubmitEditing={register}/>
            </View>

            <Button
            containerStyle={styles.button}
            raised
            onPress={register} 
            title="Register" />
            <View style={{ height: 100 }}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        backgroundColor: 'white',
    },

    button:{
        width: 200,
        marginTop: 10,
    },

    inputContainer: {
        width: 300,
    },
})
