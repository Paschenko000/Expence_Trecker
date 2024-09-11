import {FlatList, Pressable, ScrollView, Text, View, VirtualizedList} from "react-native";
import {Input} from "./Input";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {CategoryBtn} from "../../ui/CategoryBtn";
import {useState} from "react";

export function ExpenseForm() {

    const [selectedCategory, setSelectedCategory] = useState('');

    function categorySelectionHandler(id) {
        setSelectedCategory(id);
    }

    function amountChangeHandler() {

    }

    function renderCategory(itemData) {
        return (
            <CategoryBtn
                {...itemData.item}
                onPress={categorySelectionHandler}
                selectedCategory={selectedCategory}
            />
        );
    }

    const getItemCount = (data) => data.length;

    return (
        <View style={styles.form}>
            <View style={styles.categoriesContainer}>
                <Text style={styles.title}>Select Category</Text>
                <FlatList
                    // getItemCount={getItemCount}
                    data={ExpensesCategories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>

            <Text style={styles.title}>Type Your Expense</Text>

            <View style={styles.inputsRow}>
                <Input label="Amount" style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: amountChangeHandler,
                }}/>
                <Input label="Date" style={styles.rowInput} textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: () => {},
                }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color:  GlobalStyles.colors.white,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1,
    },
    categoriesContainer: {
        marginBottom: 20,
    },
})
