import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const SplashScreenComponent = () => {
    const navigation = useNavigation();

    // Shared values for animations
    const opacity = useSharedValue(0); // Opacity starts at 0 (invisible)
    const translateY = useSharedValue(50); // Y position starts slightly off-screen

    useEffect(() => {
        // Start animation
        opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
        translateY.value = withTiming(0, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        });

        // Navigate to the next screen after 3 seconds
        const timeout = setTimeout(() => {
        (navigation as any).navigation.navigate("index"); // Replace Splash screen with Home
        }, 6000);

        return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
    }, []);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')} // Use your image path here
            style={styles.background}
        >
            <View style={styles.container}>
            {/* Animated Text with Emojis */}
            <Animated.View style={animatedStyle}>
            <Image source={require('@/assets/images/splashscreen.png')} style={styles.splash}/>
                {/* <Text style={styles.emoji}>🚀</Text>
                <Text style={styles.text}>Welcome to PNG's One and Only</Text>
                <Text style={styles.emoji}>✨🎉</Text> */}
            </Animated.View>
            </View>
        </ImageBackground>
    );
};

// Styling for splash screen
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        // backgroundColor: "#4CAF50", // Green background color for a modern splash
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff", // White text for contrast
        textAlign: "center",
        marginTop: 10,
    },
    emoji: {
        fontSize: 64, // Large emoji size
        textAlign: "center",
    },
    splash: {
        width: 350,
        height: 600,
        top: 50,
    },
});

export default SplashScreenComponent;
