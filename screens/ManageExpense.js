import {Text, View} from "react-native";
import {useLayoutEffect} from "react";
import {IconButton} from "../ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";
import {Button} from "../ui/Button";

export function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        navigation.goBack();

    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button  onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>

            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.pink}
                        size={30}
                        onPress={deleteExpenseHandler} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {

    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: GlobalStyles.colors.black,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        minWidth: 80,
        marginHorizontal: 5,
    }
})
