import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react"
import { StyleSheet,Text } from "react-native";

import { Stack } from "../../../imports/Global.import";
import StackNavigatorScreenNameProvider from "../../../services/StackScreenNameProvider";
import ParentStack from "./ParentStack";
import LoadingScreen from "../../../screens/FindMyKids/FindMyKids.LoadingScreen";

const StackContainer = () => {
    const [isVisited, setIsVisited] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                let isVisited = await AsyncStorage.getItem("isVisit").then(res => typeof res === "string" && JSON.parse(res));
                let isShow = await AsyncStorage.getItem("isShow").then(res => typeof res === "string" && JSON.parse(res));
                console.log(`... async store ${isVisited}`)
                console.log(`... async store isShow ${isShow}`)
                setIsVisited(isVisited);
                setIsShow(isShow);
                setIsLoading(false); // set isLoading to false once isVisited is set
            } catch (error) {
                console.error(`Error occurred in the app useeffect method ${error}`);
            }
        }
        )();
    }, [isLoading]);

    return (
        <>
            {
                !isLoading ?
                    <Stack.Navigator

                        screenOptions={({ navigation, route }) => ({ header: () => null })}
                        children={<Stack.Screen name={StackNavigatorScreenNameProvider.FindMyKids} children={() => <ParentStack route={{ isVisited: isVisited,isShow:isShow }} />} />}
                    />:
                    (<><LoadingScreen message="Loading something owesome..."/></>)
        }
        </>

    )
}

export default StackContainer;