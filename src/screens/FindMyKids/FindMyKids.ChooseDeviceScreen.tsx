import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { _Global_Images } from '../../imports/Image.import';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import StackNavigatorScreenNameProvider from '../../services/StackScreenNameProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChooseDeviceScreen = () => {
    const navigation = useNavigation();

    React.useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={style.mainContainer}>
            <BackgroundImage imageUrl={_Global_Images.BackgroundImage} opacity={1} />
            {/* Start of Content */}
            <View style={style.contentContainer}>
                <Text style={style.header}>
                    Choose your child's device to see it on the map
                </Text>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => {
                        navigation.navigate(StackNavigatorScreenNameProvider.FormStack as never, { screen: StackNavigatorScreenNameProvider.FindMyKidsSignin } as never)
                    }}
                >
                    <View style={style.selectButton}>
                        <Feather
                            name="smartphone"
                            color="#0080FF"
                            size={20}
                            style={style.leftIcon}
                        />
                        <Text style={style.selectButtonText}>Connect your kid's phone</Text>
                        <MaterialIcons
                            name="arrow-forward-ios"
                            size={20}
                            style={style.rightIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* End of Content */}
        </SafeAreaView >
    );
}

const style = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    selectButton: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
        // alignItems: 'center',
    },
    selectButtonText: {
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 15,
    },
    leftIcon: {
        marginRight: 0,
    },
    rightIcon: {
        marginLeft: 80,
    },
});

export default ChooseDeviceScreen;
