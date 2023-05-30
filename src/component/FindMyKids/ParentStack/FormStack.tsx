import { CardStyleInterpolators } from "@react-navigation/stack";
import * as React from "react";
import { Platform, View } from "react-native";
import { Stack } from "../../../imports/Global.import";
import MultipleChildScreen from "../../../screens/FindMyKids/FindMyKids.MultipleChildScreen";
import OnboardingScreen from "../../../screens/FindMyKids/FindMyKids.OnboardingScreen";
import FindMyKidsSignUpScreen from "../../../screens/FindMyKids/FindMyKids.SignUpScreen";
import StackNavigatorScreenNameProvider from "../../../services/StackScreenNameProvider";

interface OnboardingStackProps {

}

export const FormStack = (Props: OnboardingStackProps) => {
    return (
        <React.Fragment>
            <Stack.Navigator
                screenOptions={({ navigation, route }) => ({
                    header: () => null,
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                })}>
                <Stack.Screen name={StackNavigatorScreenNameProvider.FindMyKidsSignin} children={() => (
                    <FindMyKidsSignUpScreen as={StackNavigatorScreenNameProvider.FindMyKidsSignin}
                        params={
                            {
                                title: "Sign In",
                                linkText: "I already have account"
                            }
                        }
                    />
                )} />
                <Stack.Screen name={StackNavigatorScreenNameProvider.FindMyKidsSignup} children={() => (
                    <FindMyKidsSignUpScreen as={StackNavigatorScreenNameProvider.FindMyKidsSignup}
                        params={
                            {
                                title: "Sign up",
                                linkText: "Create a new account"
                            }
                        }
                    />
                )} />
                
            </Stack.Navigator>
        </React.Fragment>
    )
}