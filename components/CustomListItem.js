import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';


const CustomListItem = ({id, boardName, enterChat}) => {
    return (
        <ListItem onPress={() => enterChat(id, boardName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri: "https://www.valuemomentum.com/wp-content/uploads/2021/04/anonymous-icon.jpeg",

            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {boardName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    TEST
                </ListItem.Subtitle>

            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
