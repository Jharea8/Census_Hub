import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SplashScreenComponent from "@/components/SplashScreenComponent";

const SplashScreen = () => {
    return (
        <View>
        <Text>SplashScreen</Text>

        <SplashScreenComponent />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({});