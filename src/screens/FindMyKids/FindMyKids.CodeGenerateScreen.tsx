import React from 'react';
import { Alert, useWindowDimensions, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Replace with your desired icon library
import { CopyCodeScreenData } from '../../data/CopyCodeScreen.data';
import { useScreenOrientation } from '../../Helper/UseScreenOrientation';
import { observer } from 'mobx-react';
import Clipboard from '@react-native-clipboard/clipboard';
import { UserContext } from '../../stores/userStore';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backgroundImage = require("../../assets/images/background.png");

const CodeGenerateScreen = observer(() => {

    const {width,height} = useWindowDimensions();
    
    let navigation = useNavigation()
    
    const { storePairingCode } = React.useContext(UserContext);
    const [isPortraitScreen, setIsPortraitScreen] = React.useState<boolean>(height > width)
    const [isCodeExist, setIsCodeExist] = React.useState<boolean>(false);

    const handleCopyToClipboard = (code: string[]) => {
        Clipboard.setString(code[0]);
        Alert.alert('Code copied to clipboard!', `Here is Code ${code}`);
    };

    const handleBackPage = () => {
        navigation?.goBack();
    }

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
        
    }, [storePairingCode])
    return (
        <SafeAreaView style={styles.SuperContainer}>
            <BackgroundImage imageUrl={backgroundImage} opacity={1}/>
            <View style={height > width ? { ...styles.container, height: "50%" } : { ...styles.container, height: "60%" }}>
                <View style={styles.BodyContainer}>
                    <Ionicons name="arrow-back-outline" size={25} color="#0080FF" style={styles.iconStyle} onPress={handleBackPage}/>
                    <Text style={styles.title}>{CopyCodeScreenData.title}
                    </Text>
                    {
                        isCodeExist ? <TouchableOpacity activeOpacity={0.7} onPress={() => handleCopyToClipboard(storePairingCode)}>
                            <Text style={styles.code}>{storePairingCode}</Text>
                        </TouchableOpacity> : <>
                            <ActivityIndicator style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignSelf: "center"
                            }} animating={true} color={MD2Colors.red800} />
                        </>
                    }
                    <Text style={styles.subtitle}>{CopyCodeScreenData.subTitle}
                    </Text>
                    <Text style={styles.text}>{CopyCodeScreenData.text}</Text>
                </View>
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
        marginVertical: 30
    },
    container: {
        marginTop: 40, // Add desired margin from top
        marginLeft: 20, // Add desired margin from left
        marginRight: 20, // Add desired margin from right
        backgroundColor: "#FFFFFF",
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "300",
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
        textAlign: "center",
        color: "#303B45",
    },
    text: {
        fontSize: 18,
        marginTop: 20,
        textAlign: "center",
        color: "#0080FF",
        fontWeight: 'bold',
    }
});
export default CodeGenerateScreen;
