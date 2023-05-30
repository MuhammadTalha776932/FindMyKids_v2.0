import React from 'react';
import { Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Replace with your desired icon library
import { useScreenOrientation } from '../../Helper/UseScreenOrientation';
import { observer } from 'mobx-react';
import Clipboard from '@react-native-clipboard/clipboard';
import { UserContext } from '../../stores/userStore';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import BottomButtonWithLink from '../../component/Utils/BottomButtonWithLink';
import { SharedLinkScreenData } from '../../data/SharedLinkScreen.data';
import { ColorThemes } from '../../styles/global.style';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backgroundImage = require("../../assets/images/background.png");

const SharedLinkScreen = observer(() => {

    let navigation = useNavigation()

    const { storePairingCode, ispaired } = React.useContext(UserContext);
    const { width, height } = Dimensions.get("window")
    let { isPortrait } = useScreenOrientation({ WindowWidth: width, WindowHeight: height })
    const [isPortraitScreen, setIsPortraitScreen] = React.useState<boolean>(isPortrait)
    const [isCodeExist, setIsCodeExist] = React.useState<boolean>(false);

    const handleBackPage = () => {
        // navigation?.goBack();
    }
    const BottomComponentStyle = StyleSheet.create({
        button: {
            width: width - 36,
            height: 50,
            backgroundColor: '#E0E8F0',
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
        storePairingCode.length !== 0 && setIsCodeExist(true);
        (
            async () => {
                try {
                    await AsyncStorage.setItem("isShow", JSON.stringify(true));
                    console.log("isShow", true)
                } catch (error: any) {
                    console.error(`Error occurred in the app useeffect method ${error.message}`);
                }
            }
        )();
        (
            async () => {
                try {
                    await AsyncStorage.setItem("isVisit", JSON.stringify(true));
                    console.log("isVisited true")
                } catch (error: any) {
                    console.error(`Error occurred in the app useeffect method ${error.message}`);
                }
            }
        )();
        Dimensions.addEventListener("change", ({ window: { height, width } }) => {
            let { isPortrait } = useScreenOrientation({ WindowWidth: width, WindowHeight: height });
            setIsPortraitScreen(isPortrait);
        })
    }, [Dimensions, storePairingCode, isCodeExist])

    return (
        <SafeAreaView style={styles.SuperContainer}>
            <BackgroundImage imageUrl={backgroundImage} opacity={1} />
            <ScrollView contentContainerStyle={!isPortraitScreen ? { height: "150%" } : { height: "60%" }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                centerContent={true}
                bounces={true}
            >
                <View style={
                    isPortraitScreen ? {
                        ...styles.container, height: "auto",
                    } : {
                        ...styles.container, height: "40%",
                    }
                }>
                    <View style={styles.BodyContainer}>
                        <Ionicons name="arrow-back-outline" size={25} color="#0080FF" style={styles.iconStyle} onPress={handleBackPage} />
                        <Text style={styles.title}>{SharedLinkScreenData.title}
                        </Text>
                        {/* component that show the pingo application logo with link */}
                        <View style={{
                            height: 100,
                            backgroundColor: "#E6F3FF",
                            borderRadius: 10,
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "500",
                                marginStart: 40,
                                color: "black"

                            }}>Pingo by Find My Kids</Text>
                        </View>
                        <Text style={styles.subtitle}>{SharedLinkScreenData.subTitle}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={BottomComponentStyle.container}>
                <TouchableOpacity
                    style={BottomComponentStyle.button}
                    onPress={() => {
                        if (!ispaired) navigation.navigate(StackNavigatorScreenNameProvider.SecratCode as never)
                        if (ispaired) navigation.navigate(StackNavigatorScreenNameProvider.MultiChild as never)
                    }}
                >
                    <Text style={BottomComponentStyle.buttonText}>Go Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
});
const styles = StyleSheet.create({
    SuperContainer: {
        flex: 1,
    },
    iconStyle: {
        marginTop: 5,
        marginLeft: 5
    },
    BodyContainer: {
        marginHorizontal: 10,
        marginVertical: 30,
    },
    container: {
        marginTop: 40, // Add desired margin from top
        marginLeft: 20, // Add desired margin from left
        marginRight: 20, // Add desired margin from right
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        elevation: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        textAlign: "center",
        color: "#242424"
    },
    code: {
        fontSize: 48,
        marginTop: 10,
        textAlign: "center",
        color: "#0080FF"
    },
    subtitle: {
        fontSize: 14,
        marginTop: 20,
        marginHorizontal: 10,
        textAlign: "center",
        color: "#303B45",
    }
});

export default SharedLinkScreen
    ;
