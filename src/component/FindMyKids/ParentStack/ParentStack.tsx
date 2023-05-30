//#region Import external and internal libraries here
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"

import { sendPostRequest } from '../../../Helper/SendToServer';
import { CoordinateProvider, CoordinateProviderComponent } from '../../../stores/useCoordinateStore';
import { observer } from 'mobx-react';

import { Stack } from '../../../imports/Global.import';


import MainAppStack from '../../common/MainAppStack';
import FirstTimeLaunchStack from "../../common/FirstTimeLaunchStack"
import { UserContext } from '../../../stores/userStore';

//#endregion
/**
 * ParentStack is the mobx observalbe component that contains the other stacks components
 * 
 * Flow: if User(Not Authenticated) => AuthStack(After Authenticated) => (AfterAuthenticate)=>
 * if isPaied( 1.true | 2.false) => 1. MultiChildScreenStack() => MapContainer(selected Childs)
 *                      |
 *                      => 2. CodeScreen(isPaird:true) => MultiChildScreenStack => MapContainer(selected Childs)
 */

export const ParentStack = observer(({ route }: { route: any }): JSX.Element => {
  const { user, setUser, Signout, setIsAuthenticated, isAuthenticated } = React.useContext(AuthContext);

  const { updateTheCoordinate } = React.useContext(CoordinateProvider);
  const { ispaired, updateData, setIsPaired, setIsPairingCode } = React.useContext(UserContext);
  const [isLogout, setIsLogout] = React.useState(false);
  const { isVisited, isShow } = route;

  // const [isVisited, setIsVisited] = React.useState<boolean>(route.params.isVisited)

  const onAuthStateChanged = (user: any) => {
    console.log(user);
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      updateData(user);
      if (user) sendPostRequest(user, "Parent")
    }
    else {
      setIsLogout(true);
    }
  }

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    console.log("ParentStack")
    return () => { unsubscribe() }; // unsubscribe on unmount
  }, [isVisited]);

  return (
    <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}
      initialRouteName={isVisited ? "MainStack" : "FirstTimeLaunch"}
    >
      {
        isVisited ? <Stack.Screen name={"MainStack"} children={() => <MainAppStack route={{ isAuthenticated: isAuthenticated }} />} initialParams={{ isAuthenticated: isAuthenticated }} /> : null
      }
      {
        !isVisited ? <Stack.Screen name={"FirstTimeLaunch"} children={() => <FirstTimeLaunchStack />} /> : null
      }
    </Stack.Navigator>
  );
});

export default ParentStack;

const styles = StyleSheet.create({
  container: {}
});




// {(!isVisited) && (
//   <>
//     <Stack.Screen name={StackNavigatorScreenNameProvider.WelcomeScreen} component={WelcomeScreen} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.FormStack} component={FormStack} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.ChooseDeviceScreen} component={ChooseDeviceScreen} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.MultiChild} component={MultipleChildScreen} />
//     <Stack.Screen name="MapContainer" component={MapsContainer} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.OnBoardingStack} component={OnboardingScreen} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSharedScreen} component={LetGoScreen} />
//   </>
// )}

// {(isVisited && user && ispaired) && (
//   <Stack.Group>
//     <Stack.Screen name="multi-child" component={MultipleChildScreen} />
//     <Stack.Screen name="addChilds" children={() => <AddChildStack />} />
//     <Stack.Screen name="MapContainer" component={MapsContainer} />
//   </Stack.Group>
// )}

// {(isVisited && !user) &&
//   <>
//     <Stack.Screen name={StackNavigatorScreenNameProvider.FormStack} component={FormStack} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSharedScreen} component={LetGoScreen} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.MultiChild} component={MultipleChildScreen} />
//     <Stack.Screen name="MapContainer" component={MapsContainer} />
//     <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
//   </>
// }

// {(isVisited && user && !ispaired) && (
//   <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
// )}