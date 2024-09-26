import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import {Currencies} from "../constants/currencies";
import {GlobalStyles} from "../constants/styles";
import {LinearGradient} from "expo-linear-gradient";

export function Select ({ selectedCurrency, setSelectedCurrency }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setModalVisible(false);
    };

    return (
        <View>
            {/* Selected Currency Button */}
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectedText}>Selected Currency: {selectedCurrency}</Text>
            </TouchableOpacity>

            {/* Modal for Currency Selection */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <LinearGradient
                    // Background Linear Gradient
                    colors={[GlobalStyles.colors.lightGray, GlobalStyles.colors.gray]}
                    style={{position: 'absolute', left: 0, bottom: 0, height: 370, right: 0, borderRadius: 20}}
                />
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Currency</Text>
                        {Currencies.map((currency) => (
                            <>
                                <TouchableOpacity
                                    key={currency.code}
                                    style={styles.currencyOption}
                                    onPress={() => handleCurrencySelect(currency.code)}
                                >
                                    <Text style={styles.currencyText}>{currency.label}</Text>
                                </TouchableOpacity>
                            </>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



const styles = StyleSheet.create({
    selectButton: {
        backgroundColor: GlobalStyles.colors.accent,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        minHeight: 50,
        justifyContent: "center",
        marginVertical: 10,
        minWidth: 200,
        alignContent: "center",
    },
    selectedText: {
        color: GlobalStyles.colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
    },
    modalTitle: {
        color: GlobalStyles.colors.white,
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    currencyOption: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    currencyText: {
        fontSize: 16,
        color: GlobalStyles.colors.white
    },
    closeButton: {
        marginVertical: 15,
        alignItems: 'center',
    },
    closeText: {
        fontSize: 16,
        color: GlobalStyles.colors.accent,
    },
});
