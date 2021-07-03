import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({id, boardName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
        .collection('Boards')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    });


    return (
        <ListItem onPress={() => enterChat(id, boardName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL || 
                "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {boardName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>

            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
