import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({boardName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
        .collection('Boards')
        .doc(boardName)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    }, [chatMessages]);

    const path={ 
        Cars: require('../assets/Cars.png'),
        Food: require('../assets/Food.png'),
        Games: require('../assets/Games.png'),
        Fashion: require('../assets/Fashion.png')
 }  

    return (
        <ListItem onPress={() => enterChat(boardName)} bottomDivider>
            <Avatar
            source={ path[boardName] }
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {boardName}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
