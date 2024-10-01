import {FlatList, Text, View} from "react-native";
import {Input} from "./Input";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {CategoryBtn} from "../../ui/CategoryBtn";
import {useState} from "react";
import {Button} from "../../ui/Button";
import {IconButton} from "../../ui/IconButton";
import {useNavigation} from "@react-navigation/native";

export function ExpenseForm({currency, onCancel, onSubmit, isEditing, defaultValues}) {
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? new Date(defaultValues.date).toISOString().slice(0, 10) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
        category: {
            value: defaultValues ? {...defaultValues.category} : null,
            isValid: true
        }
    });

    function categorySelectionHandler(category) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                category: {value: {id: category.id, name: category.name, color: category.color}, isValid: true},
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
            category: {id: inputs.category.value.id, name: inputs.category.value.name, color: inputs.category.value.color},
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        const categoryIsValid = expenseData.category;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid || !categoryIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    category: {value: {id: curInputs.category.value.id, name: curInputs.category.value.id, color: curInputs.category.value.color}, isValid: categoryIsValid},
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            }
        });
    }

    console.log(inputs.category.value)

    function renderCategory(itemData) {

        return (
            <CategoryBtn
                {...itemData.item}
                onPress={categorySelectionHandler}
                selectedCategory={inputs.category.value}
            />
        );
    }

    function handleNavigate() {
        navigation.navigate('AddCategory');
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid ||
        !inputs.category.isValid;

    return (
        <View style={styles.form}>

            <Text style={styles.title}>Type Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label={"Amount (" + currency + ")" } invalid={!inputs.amount.isValid} style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }}/>
                <Input label="Date" invalid={!inputs.date.isValid} style={styles.rowInput} textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}/>
            </View>
            <Input label="Description" invalid={!inputs.description.isValid} textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}/>

            {formIsInvalid &&
                <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
            }
            <View style={styles.categoriesContainer}>
                <View style={styles.addCategoryContainer}>
                    <Text style={styles.title}>Select Category</Text>
                    <IconButton icon="add" color={GlobalStyles.colors.accent} size={30} onPress={handleNavigate}/>
                </View>
                <FlatList
                    data={ExpensesCategories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.name}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <Button mode="flat" color={GlobalStyles.colors.accent} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button  color={GlobalStyles.colors.accent} onPress={submitHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
    },
    title: {
        fontFamily: 'Outfit-Bold',
        fontSize: 22,
        color:  GlobalStyles.colors.white,
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
        marginTop: 20,
    },
    buttonsContainer: {
        marginTop: 10,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        minWidth: 80,
        marginHorizontal: 5,
    },
    errorText: {
        fontFamily: 'Outfit-Regular',
        textAlign: "center",
        color: GlobalStyles.colors.red,
        margin: 8,
        fontSize: 16,
    },
    addCategoryContainer: {
        flexDirection: "row",
        gap: 10,
    }
})
