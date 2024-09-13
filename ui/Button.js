import {Pressable, Text, View} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";

export function Button({children, onPress, mode, style, color}) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button , {backgroundColor: color}, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && {color}]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 8,
    },
    flat: {
        backgroundColor: "transparent",
    },
    buttonText: {
        fontSize: 16,
        color: GlobalStyles.colors.black,
        textAlign: "center",
        fontWeight: "500"
    },
    pressed: {
        opacity: 0.75,
    }

});
