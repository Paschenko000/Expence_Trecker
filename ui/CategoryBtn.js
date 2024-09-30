import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {GrayLinearGradient} from "./GrayLinearGradient";


export function CategoryBtn({id, color, name, onPress, selectedCategory}) {

    return (
        <View style={styles.button}>
            <Pressable onPress={() => onPress(id)} style={({pressed}) => pressed && styles.pressed}>
                {id === selectedCategory ? (
                    <View style={[styles.container, styles.selectedCategory]}>
                        <Text style={[styles.category, {color}]}>{name}</Text>
                    </View>

                    ) : (
                    <GrayLinearGradient styles={styles.container}>
                        <Text style={[styles.category, {color}]}>{name}</Text>

                    </GrayLinearGradient>
                    )
                }
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
        minHeight: 65,
        padding: 15,
        borderRadius: 10,
    },
    selectedCategory: {
        opacity: 0.60,
        backgroundColor: GlobalStyles.colors.lightGray,
    }
});
