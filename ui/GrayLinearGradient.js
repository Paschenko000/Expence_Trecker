import {GlobalStyles} from "../constants/styles";
import {LinearGradient} from "expo-linear-gradient";

export function GrayLinearGradient({styles, children}) {
    return (
        <LinearGradient
            colors={[GlobalStyles.colors.lightGray, GlobalStyles.colors.gray]}
            style={styles}
        >
            {children}
        </LinearGradient>
    );
}
