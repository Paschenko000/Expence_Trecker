import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ManageExpense} from "./screens/ManageExpense";
import {RecentExpenses} from "./screens/RecentExpenses";
import {AllExpenses} from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from '@expo/vector-icons';
import {BlurView} from "expo-blur";
import {StyleSheet} from "react-native";
import {IconButton} from "./ui/IconButton";
import {ExpensesContext, ExpensesContextProvider} from "./store/expenses-context";
import {CategoryExpenses} from "./screens/CategoryExpenses";
import {useEffect, useState} from "react";
import {WelcomeScreen} from "./screens/WelcomeScreen";
import {getItem, storeData} from "./utils/storage";
import {ExpensesCategories} from "./constants/expensesCategories";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
      <BottomTabs.Navigator screenOptions={({navigation}) => ({
          headerStyle: {
              backgroundColor: GlobalStyles.colors.gray,
              shadowColor: "transparent",
          },
          headerTitleStyle: {
              fontFamily: 'Outfit-Medium',
          },
          headerRight: () => <IconButton
              icon="add"
              size={30}
              color={GlobalStyles.colors.accent}
              onPress={() => navigation.navigate("ManageExpense")}
          />,
          headerTintColor: GlobalStyles.colors.white,
          tabBarStyle: {
              position: "absolute",
              borderTopWidth: 0,

          },
          tabBarActiveTintColor: GlobalStyles.colors.accent,
          tabBarBackground: () => (
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}/>
          ),
          tabBarLabelStyle: {
              fontFamily: 'Outfit-Medium',
          }
      })}>
        <BottomTabs.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
                title: "All Expenses",
                tabBarLabel: "All Expenses",
                tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}/>

            }}
        />
        <BottomTabs.Screen
            name="RecentExpenses"
            component={RecentExpenses}
            options={{
                title: "Recent Expenses",
                tabBarLabel: "Recent",
                tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color}/>

            }}
        />
      </BottomTabs.Navigator>
  );
}

export default function App() {
    const [hasLaunched, setHasLaunched] = useState(false);
    const HAS_LAUNCHED = "HAS_LAUNCHED";
    const CATEGORIES = "CATEGORIES";

    // TODO: Fix WelcomeScreen so it wouldn't be visible on app every app reload.
    useEffect(() => {
        const getData = async () => {
            const hasLaunched = await getItem(HAS_LAUNCHED);
            if (hasLaunched) {
                setHasLaunched(true);
            } else {
                await storeData(HAS_LAUNCHED, true);
            }
            const category = await getItem(CATEGORIES);

            if (!category) {
                await storeData(CATEGORIES, ExpensesCategories);
            }
        }

        getData().catch((error) => {console.log(error)});
    }, []);

    return (
      <>
        <StatusBar style="light" />
          <ExpensesContextProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerStyle: {
                      backgroundColor: GlobalStyles.colors.gray,
                      shadowColor: "transparent",
                  },
                  headerTintColor: GlobalStyles.colors.accent,
                  headerTitleStyle: {
                      fontFamily: 'Outfit-Medium',
                      color: GlobalStyles.colors.white
                  },

              }}>
                  {!hasLaunched &&
                  <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{headerShown: false, headerTitleStyle: {
                            fontFamily: 'Outfit-Medium'}}}
                  />
                  }
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{headerShown: false}}
                    />

                  <Stack.Screen
                    name="ManageExpense"
                    component={ManageExpense}
                    options={{
                        headerBackTitle: "Back",
                        headerBackTitleStyle: {fontFamily: 'Outfit-Medium'}
                    }}
                  />
                  <Stack.Screen
                    name="CategoryExpenses"
                    component={CategoryExpenses}
                    options={{
                        headerBackTitle: "Back",
                        headerBackTitleStyle: {fontFamily: 'Outfit-Medium'}
                        // headerRight: () => <IconButton
                        //     icon="add"
                        //     size={30}
                        //     color={GlobalStyles.colors.accent}
                        //     onPress={() => navigation.navigate("ManageExpense")}
                        // />
                    }}
                  />

              </Stack.Navigator>
            </NavigationContainer>
          </ExpensesContextProvider>
      </>

  );
}


