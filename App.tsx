import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { requestUserPermission } from "./src/Permissions/Notification.Permission"
import { StackNavigatorScreenNameProvider } from "./src/services/StackScreenNameProvider";
import { CoordinateProviderComponent, Trunk } from './src/stores/useCoordinateStore';
import { UserProvider, UserTrunk } from './src/stores/userStore';
import { Stack } from "./src/imports/Global.import";
import { AuthProvider } from './src/component/FirebaseManagement/AuthProvider';
import { notificationListener } from './src/Notifications/NotificationMessage';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import StackContainer from "./src/component/FindMyKids/ParentStack/StackContainer";

/**
 *  1. Here we create the root node which named is App that implement the UserPermission
 * and handle the background notifications is useEfect hook.
 *  2. Rehydrate is the promise that init the mobx stores before used.
 *  3. Hide the SplashScreen.
 *  4. Used the Stack to create the Screen which helped us to switch from parent devices to child devices
 * for testing purpose only.
 *  5. Parent Stack
 */

function App() {

  const { StackContainerScreen } = StackNavigatorScreenNameProvider;

  useEffect(() => {
    
    notificationListener();
    (async () => {
      await Trunk.init();
      await UserTrunk.init().then(() => SplashScreen.hide());
    }
    )()

  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <UserProvider>
        <CoordinateProviderComponent>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName={StackContainerScreen}
              screenOptions={({ navigation, route }) => ({ header: () => null })}>
              <Stack.Screen name={StackContainerScreen} component={StackContainer} />
            </Stack.Navigator>
          </NavigationContainer>
          </CoordinateProviderComponent>
        </UserProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
