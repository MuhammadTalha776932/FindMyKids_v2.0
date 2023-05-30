//#region Import external and internal libraries here
import { observer } from 'mobx-react';
import * as React from 'react';
import { Stack } from '../../imports/Global.import';
import CodeGenerateScreen from '../../screens/FindMyKids/FindMyKids.CodeGenerateScreen';
import MapsContainer from '../../screens/FindMyKids/FindMyKids.MapsContainer';
import MultipleChildScreen from '../../screens/FindMyKids/FindMyKids.MultipleChildScreen';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import { UserContext } from '../../stores/userStore';
import AddChildStack from '../FindMyKids/ParentStack/AddChildStack';
import { AuthContext } from '../FirebaseManagement/AuthProvider';



export const WhenUserIsAuthStack = observer((): JSX.Element => {

    const { user } = React.useContext(AuthContext);
    const { ispaired } = React.useContext(UserContext);
    React.useEffect(() => {
        console.log("WhenUserIsAuthStack")
      }, []);
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}
        // initialRouteName={isShow ? StackNavigatorScreenNameProvider.SecratCode : StackNavigatorScreenNameProvider.WelcomeScreen}
        >
            {ispaired ? (
                <Stack.Group>
                    <Stack.Screen name="multi-child" component={MultipleChildScreen} />
                    <Stack.Screen name="addChilds" children={() => <AddChildStack />} />
                    <Stack.Screen name="MapContainer" component={MapsContainer} />
                </Stack.Group>
            ):null}

            {!ispaired ? (
                <Stack.Screen name={StackNavigatorScreenNameProvider.SecratCode} component={CodeGenerateScreen} />
            ): null}
        </Stack.Navigator>
    );
});

export default WhenUserIsAuthStack;
