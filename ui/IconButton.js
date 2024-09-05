import {Pressable, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";

export function IconButton({icon, size, color, onPress}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon}  size={size} color={color}/>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {

        paddingRight: 20,
    },
    pressed: {
        opacity: 0.75,
    }
})
