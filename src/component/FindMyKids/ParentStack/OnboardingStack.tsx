import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { _Global_Images } from '../../../imports/Image.import';
import {useNavigation} from "@react-navigation/native";
import StackNavigatorScreenNameProvider from '../../../services/StackScreenNameProvider';

const data = [
    {
      title: 'Location Tracking',
      text: 'This feature enables you to monitor your child\'s location from anywhere.',
      image: _Global_Images.RouteImage,
      backgroundColor: '#59b2ab',
    },
    {
      title: 'Application Usage Status',
      text: 'Wondering if your child is glued to their phone in class?',
      image: _Global_Images.RouteImage,
      backgroundColor: '#febe29',
    },
    {
      title: 'Surrounding voice',
      text: 'Your child is not answering the phone. Let\'s make sure everything\'s ok.',
      image: _Global_Images.RouteImage,
      backgroundColor: '#22bcb5',
    },
    {
      title: 'Send Loud Signals',
      text: 'By the way, you can send a loud signal. It can even be heard in silent mode.',
      image: _Global_Images.RouteImage,
      backgroundColor: '#22bcb5',
    },
  ];
  const OnboardingScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: any }) => (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  
    const keyExtractor = (item: any) => item.title;
  
    return (
      <AppIntroSlider
        renderItem={renderItem}
        data={data}
        keyExtractor={keyExtractor}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showPrevButton={true}
        showNextButton={true}
        showSkipButton={true}
        showDoneButton={true}
        onDone={()=>{
            navigation.navigate(StackNavigatorScreenNameProvider.ChooseDeviceScreen as never);
        }}
      />
    );
  };
  
  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 30,
    },
    text: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginTop: 20,
    },
    dotStyle: {
      backgroundColor: 'rgba(255, 255, 255, .2)',
    },
    activeDotStyle: {
      backgroundColor: '#fff',
    },
  });
    
  export default OnboardingScreen;
