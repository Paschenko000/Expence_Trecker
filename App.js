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

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
      <BottomTabs.Navigator screenOptions={({navigation}) => ({
          headerStyle: {
              backgroundColor: GlobalStyles.colors.gray,
              shadowColor: "transparent",
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
                      color: GlobalStyles.colors.white
                  },

              }}>
                <Stack.Screen
                    name="Expensesoverview"
                    component={ExpensesOverview}
                    options={{headerShown: false} }/>
                <Stack.Screen
                    name="ManageExpense"
                    component={ManageExpense}
                    options={{
                        headerBackTitle: "Back"
                    }}
                />
                <Stack.Screen
                    name="CategoryExpenses"
                    component={CategoryExpenses}
                    options={{
                        headerBackTitle: "Back"
                    }}
                />

              </Stack.Navigator>
            </NavigationContainer>
          </ExpensesContextProvider>
      </>

  );
}


