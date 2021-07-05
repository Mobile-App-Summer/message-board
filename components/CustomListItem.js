import React from 'react'
import { ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({boardName, enterChat}) => {
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