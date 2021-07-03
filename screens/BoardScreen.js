import React, { useLayoutEffect, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons  } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
const BoardScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Board",
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle:()=> (
                <View
                style={{
                    flexDirection:'row',
                    alignItems: 'center',
                }}
                >
                    <Avatar 
                        rounded 
                        source={{
                            uri:
                            "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",
                        }} 
                    />
                    <Text style={{color:'white', marginLeft: 10, fontWeight: '700'}}>
                        {route.params.boardName}
                    </Text>
                </View>
            ),
            headerLeft: () =>(
                <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
        });

    }, [navigation])
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="dark"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
            />

            <>
                <ScrollView>
                    {/* CHAT */}
                </ScrollView>
            </>
            {/* <Text>{route.params.boardName}</Text> */}
        </SafeAreaView>
    )
}

export default BoardScreen

const styles = StyleSheet.create({})
