//#region Import external and internal libraries here
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from '../../imports/Global.import';
import ChooseDeviceScreen from '../../screens/FindMyKids/FindMyKids.ChooseDeviceScreen';
import CodeGenerateScreen from '../../screens/FindMyKids/FindMyKids.CodeGenerateScreen';
import LetGoScreen from '../../screens/FindMyKids/FindMyKids.LetGoScreen';
import MapsContainer from '../../screens/FindMyKids/FindMyKids.MapsContainer';
import MultipleChildScreen from '../../screens/FindMyKids/FindMyKids.MultipleChildScreen';
import WelcomeScreen from '../../screens/FindMyKids/FindMyKids.Welcome.screen';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import { FormStack } from '../FindMyKids/ParentStack/FormStack';
import OnboardingScreen from '../FindMyKids/ParentStack/OnboardingStack';


export const FirstTimeLaunchStack = observer((): JSX.Element => {

  React.useEffect(() => {
    console.log("FirstTimeLaunchStack")
  }, []);

  return (
      <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}
        // initialRouteName={isShow ? StackNavigatorScreenNameProvider.SecratCode : StackNavigatorScreenNameProvider.WelcomeScreen}
      >
            <Stack.Screen name={StackNavigatorScreenNameProvider.WelcomeScreen} component={WelcomeScreen} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.FormStack} component={FormStack} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.ChooseDeviceScreen} component={ChooseDeviceScreen} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.MultiChild} component={MultipleChildScreen} />
            <Stack.Screen name="MapContainer" component={MapsContainer} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.OnBoardingStack} component={OnboardingScreen} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSharedScreen} component={LetGoScreen}/>
      </Stack.Navigator>
  );
});

export default FirstTimeLaunchStack;

const styles = StyleSheet.create({
  container: {}
});
