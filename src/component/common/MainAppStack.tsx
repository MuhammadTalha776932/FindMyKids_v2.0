//#region Import external and internal libraries here
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from '../../imports/Global.import';
import { UserContext } from '../../stores/userStore';
import { AuthContext } from '../FirebaseManagement/AuthProvider';
import WhenUserIsAuthStack from './WhenUserIsAuthStack';
import WhenUserNotAuthStack from './WhenUserNotAuthStack';


export const MainAppStack = observer(({ route }: { route: any }): JSX.Element => {

    const { user, } = React.useContext(AuthContext);
    const { ispaired } = React.useContext(UserContext);

    // const {isAuthenticated} = route.params;
    const { isAuthenticated } = route;

    React.useEffect(() => {
        console.log("MainAppStack")
      }, [user]);

    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}
        // initialRouteName={isShow ? StackNavigatorScreenNameProvider.SecratCode : StackNavigatorScreenNameProvider.WelcomeScreen}
        >
            {
                user ? <Stack.Screen name={"WhenUserIsAuth"} children={() => <WhenUserIsAuthStack />} /> : null
            }
            {
                !user ? <Stack.Screen name={"FirstTimeLaunch"} children={() => <WhenUserNotAuthStack />} /> : null
            }
        </Stack.Navigator>
    );
});

export default MainAppStack;

const styles = StyleSheet.create({
    container: {}
});




// {(user && ispaired) && (
//     <Stack.Group>
//         <Stack.Screen name="multi-child" component={MultipleChildScreen} />
//         <Stack.Screen name="addChilds" children={() => <AddChildStack />} />
//         <Stack.Screen name="MapContainer" component={MapsContainer} />
//     </Stack.Group>
// )}

// {(!user) &&
//     <>
//         <Stack.Screen name={StackNavigatorScreenNameProvider.FormStack} component={FormStack} />
//         <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSharedScreen} component={LetGoScreen} />
//         <Stack.Screen name={StackNavigatorScreenNameProvider.MultiChild} component={MultipleChildScreen} />
//         <Stack.Screen name="MapContainer" component={MapsContainer} />
//         <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
//     </>
// }

// {(user && !ispaired) && (
//     <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
// )}