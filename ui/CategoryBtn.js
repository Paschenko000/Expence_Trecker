import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {GrayLinearGradient} from "./GrayLinearGradient";


export function CategoryBtn({id, color, name, onPress, selectedCategory}) {

    return (
        <GrayLinearGradient styles={styles.button}>
            <Pressable onPress={() => onPress(id)} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.container, id === selectedCategory && styles.selectedCategory]}>
                    <Text style={[styles.category, {color}]}>{name}</Text>
                </View>
            </Pressable>
        </GrayLinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 4,
        padding: 5,
        borderRadius: 10,
    },
    category: {
        fontFamily: 'Outfit-ExtraBold',
        fontSize: 14,
    },
    pressed: {
        opacity: 0.75,
    },
    container: {
        padding: 10,
        minHeight: 55,
    },
    selectedCategory: {
        backgroundColor: GlobalStyles.colors.lightGray,
        borderRadius: 8,
    }
});
