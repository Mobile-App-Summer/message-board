import React, {useState, useLayoutEffect, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import { auth, db } from '../firebase';

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

    const register = () => {
        if(!email || !password || !firstName || !lastName) {
            alert("Please enter your")
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: `${firstName} ${lastName}`,
                photoURL: imagesURL || "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",

            })
            db.collection('Users').doc(authUser.user.uid).set({
                uid: authUser.user.uid,
                firstName: firstName,
                lastName: lastName,
                role: "customer",
                registrationDateTime: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: imagesURL || "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",
            })
            .then(() => console.log("Profile info saved"))
            .catch((error) => console.log("Profile info not saved: " + error))
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
