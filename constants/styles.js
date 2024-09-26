import {Platform} from 'react-native';

const isIOS = () => {
    return Platform.OS === 'ios';
};

export const GlobalStyles = {
    colors : {
        black: "#000000",
        gray: "#1C1C1D",
        lightGray: "#242424",
        error: "#6e2f2f",
        accent: "#BAFC4F",
        white: "#ffffff",
        darkBlue: "#3A83F6",
        blue: "#51B3F8",
        azure: "#6CEACA",
        darkGreen: "#60D158",
        green: "#C6FC50",
        yellow: "#F6E653",
        darkYellow: "#ffcd00",
        beige: "#f39d5e",
        orange: "#EE8246",
        mandarin: "#ED6C59",
        brightRed: "#E13552",
        red: "#ec183e",
        brightPink: "#EA4376",
        pink: "#D08FDB",
        purple: "#A78FE8",
        darkPurple: "#7e5fd9",
    },
    fonts: {
        normal: isIOS() ? 'Outfit-Regular' : 'OutfitRegular',
        medium: isIOS() ? 'Outfit-Medium' : 'OutfitMedium',
        bold: isIOS() ? 'Outfit-Bold' : 'OutfitBold',
        extraBold: isIOS() ? 'Outfit-ExtraBold' : 'OutfitExtraBold',
    }
}
