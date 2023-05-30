//#region Import external and internal libraries here
import { observer } from 'mobx-react';
import * as React from 'react';
import { Stack } from '../../imports/Global.import';
import CodeGenerateScreen from '../../screens/FindMyKids/FindMyKids.CodeGenerateScreen';
import LetGoScreen from '../../screens/FindMyKids/FindMyKids.LetGoScreen';
import MapsContainer from '../../screens/FindMyKids/FindMyKids.MapsContainer';
import MultipleChildScreen from '../../screens/FindMyKids/FindMyKids.MultipleChildScreen';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import { UserContext } from '../../stores/userStore';
import { FormStack } from '../FindMyKids/ParentStack/FormStack';
import { AuthContext } from '../FirebaseManagement/AuthProvider';



export const WhenUserNotAuthStack = observer((): JSX.Element => {

    const { user } = React.useContext(AuthContext);
    const { ispaired } = React.useContext(UserContext);

    React.useEffect(() => {
        console.log("WhenUserNotAuthStack")
      }, []);

    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}
        // initialRouteName={isShow ? StackNavigatorScreenNameProvider.SecratCode : StackNavigatorScreenNameProvider.WelcomeScreen}
        >
            <Stack.Screen name={StackNavigatorScreenNameProvider.FormStack} component={FormStack} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.PingoSharedScreen} component={LetGoScreen} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.MultiChild} component={MultipleChildScreen} />
            <Stack.Screen name="MapContainer" component={MapsContainer} />
            <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
        </Stack.Navigator>
    );
});

export default WhenUserNotAuthStack;
