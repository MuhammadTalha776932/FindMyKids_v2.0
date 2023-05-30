import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated, useWindowDimensions, Image, ScrollView, TouchableOpacity } from 'react-native';

import { Text, View, StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import BottomButtonWithLink from '../../component/Utils/BottomButtonWithLink';
import Scrollable from '../../component/Utils/Scrollable';
import { WelcomeScreenData } from '../../data/WelcomeScreen.data';
import { IUseScreenOrientation, useScreenOrientation } from '../../Helper/UseScreenOrientation';
import { _Global_Images } from '../../imports/Image.import';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import { UserContext } from '../../stores/userStore';
import { ColorThemes, _GlobalStyles } from '../../styles/global.style';
import { CoordinateProvider } from '../../stores/useCoordinateStore';
import { observer } from 'mobx-react';


interface WelcomeScreenProps { }

let count = 0

const LetGoScreen = observer((route: any) => {

    let navigation = useNavigation()

    const { storePairingCode,} = React.useContext(UserContext);

    const {CoordinateState} = React.useContext(CoordinateProvider);

    let { width, height } = useWindowDimensions();
    const [isPortraitScreen] = React.useState<boolean>(height > width);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        ImageContainer: {
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 10,
        },
        Image: {

            position: "absolute",
            top: width / 4,
        },
        ImageLandScape: {
            position: "absolute",
            top: width / 7
        }
    });
    const BottomComponentStyle = StyleSheet.create({
        button: {
            width: width - 36,
            height: 50,
            backgroundColor: ColorThemes.ButtonBackground,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
        container: {
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 16,
            height: height * 3 / 8,
            borderRadius: 50,
            marginHorizontal: 20,
        },

    });

    React.useEffect(() => {

        (
            async () => {
                try {
                    await AsyncStorage.setItem("isShow", JSON.stringify(true));
                    console.log("isShow", true)

                    await AsyncStorage.setItem("isVisit", JSON.stringify(true));
                    console.log("isVisited ", CoordinateState[0]?.isPaired)
                } catch (error: any) {
                    console.error(`Error occurred in the app useeffect method ${error.message}`);
                }
            }
        )();
    }, [CoordinateState[0]?.isPaired, storePairingCode])

    return (
        <React.Fragment>
            <SafeAreaView style={{
                ...styles.container,
            }}>
                <BackgroundImage imageUrl={_Global_Images.BackgroundImage} opacity={1} />
                <Scrollable isPortraitScreen={isPortraitScreen}>
                    <View style={styles.Image}>
                        <Text>
                            Let's Go
                        </Text>
                    </View>
                </Scrollable>
                <View style={BottomComponentStyle.container}>
                    <TouchableOpacity
                        style={BottomComponentStyle.button}
                        onPress={() => {
                            if (!CoordinateState[0]?.isPaired) navigation.navigate(StackNavigatorScreenNameProvider.SecratCode as never)
                            if (CoordinateState[0]?.isPaired) navigation.navigate(StackNavigatorScreenNameProvider.MultiChild as never)
                        }}
                    >
                        <Text style={BottomComponentStyle.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
});

export default LetGoScreen;

