import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {GrayLinearGradient} from "./GrayLinearGradient";


export function CategoryBtn({id, color, name, onPress, selectedCategory}) {

    return (
        <View style={styles.button}>
            <Pressable onPress={() => onPress(id)} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.container, id === selectedCategory && styles.selectedCategory]}>
                    {id !== selectedCategory && <GrayLinearGradient styles={{height: 60, borderRadius: 10,}}/>}

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
    },
    pressed: {
        opacity: 0.75,
    },
    container: {
        height: 60,
        padding: 15,
    },
    selectedCategory: {
        opacity: 0.60,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.lightGray,
    }
});
