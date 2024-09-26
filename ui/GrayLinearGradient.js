import {GlobalStyles} from "../constants/styles";
import {LinearGradient} from "expo-linear-gradient";

export function GrayLinearGradient({styles}) {
    return (
        <LinearGradient
            colors={[GlobalStyles.colors.lightGray, GlobalStyles.colors.gray]}
            style={[{position: 'absolute', left: 0, bottom: 0, right: 0}, styles]}
        />
    );
}
