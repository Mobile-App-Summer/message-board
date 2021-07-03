import React, { useLayoutEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    // LOG OUT //
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    // LOG OUT //

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "MessageBoard",
            headerStyle : {backgroundColor: 'purple'},
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (<View style={{ marginLeft: 20}}>
                <TouchableOpacity onPress={signOutUser} activeOpacity = {0.5}>
                <Avatar rounded source = {{ uri: auth?.currentUser?.photoURL}} />
                </TouchableOpacity>
            </View>
        ),
        headerRight: () => (
            <View style= {{
                flexBasis:'row',
                justifyContent: 'space-between',
                width:80,
                marginRight: 20,
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                    <SimpleLineIcons name="pencil" size={24} color='black'/>
                </TouchableOpacity>
            </View>
        ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})
