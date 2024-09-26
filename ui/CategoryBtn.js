import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../constants/styles";


export function CategoryBtn({id, color, name, onPress, selectedCategory}) {

    return (
        <View style={styles.button}>
            <Pressable onPress={() => onPress(id)} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.container, id === selectedCategory && styles.selectedCategory]}>
                    <Text style={[styles.category, {color}]}>{name}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 4,
    },
    category: {
        fontFamily: 'Outfit-ExtraBold',
        fontSize: 14,
        minHeight: 33,
    },
    pressed: {
        opacity: 0.75,
    },
    container: {
        borderRadius: 10,
        padding: 15,
        backgroundColor: GlobalStyles.colors.gray,
    },
    selectedCategory: {
        backgroundColor: GlobalStyles.colors.lightGray,
    }
});
