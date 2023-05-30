import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MD2Colors, Text } from 'react-native-paper';

interface ILoadingScreenProps {
    message:string,
}

const LoadingScreen = ({ message }:ILoadingScreenProps) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color={MD2Colors.blue500} />
    {message && <Text style={{ marginTop: 16 }}>{message}</Text>}
  </View>
);

export default LoadingScreen;