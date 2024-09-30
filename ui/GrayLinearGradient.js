import {GlobalStyles} from "../constants/styles";
import {LinearGradient} from "expo-linear-gradient";

export function GrayLinearGradient({styles, children}) {
    return (
        <LinearGradient
            colors={[GlobalStyles.colors.gray, GlobalStyles.colors.darkGray]}
            style={styles}
        >
            {children}
        </LinearGradient>
    );
}
