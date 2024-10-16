import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const ThankYouScreen = () => {
    const navigation = useNavigation();





    const handleSignOut = () => {    
        // If all validations pass, navigate to the next page
        (navigation as any).navigate('index'); // Navigate to the 'Feedback' screen
    };


    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')} // Use your image path here
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Header Section with Logos */}
                <ImageBackground
                    source={require('@/assets/images/header2.png')} // Use your image path here
                    style={styles.header}
                    resizeMode="cover"
                >
                    <View style={styles.headerContent}>
                        {/* PNG Logos will be placed here */}
                        <Image 
                            source={require('@/assets/images/fireworks.png')}
                            style={styles.imgFire}
                        />
                    </View>
                </ImageBackground>

                {/* Thank You Section */}
                <View style={styles.messageSection}>
                    <Text style={styles.mainMessage}>"THANK YOU FOR YOUR PARTICIPATION"</Text>
                    <Text style={styles.mainTranslation}>"TENKYU TRU!"</Text>
                    <Text style={styles.secondaryTranslation}>"Tanikyu Bada Herea!"</Text>
                    <Text style={styles.secondaryTranslation2}>"Tanikyu Bada Herea!"</Text>
                </View>

                {/* Log Out Button */}
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>

                {/* Crowd Image Section */}
                <ImageBackground
                    source={require('@/assets/images/Diverse.png')} // Use your image path here
                    style={styles.crowdImage}
                    resizeMode="contain"
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        // backgroundColor: '#0A2842', // Dark background color
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        width: '100%',
        height: '35%', // Adjust height as per the header image size
        top: 170,
    },
    imgFire: {
        width: '50%',
        height: '70%',
        top: 35,
        left: -90,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        top: 90,
    },
    mainMessage: {
        fontSize: 29,
        color: '#ffd700', // Golden yellow color for the main message
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mainTranslation: {
        fontSize: 36,
        color: '#ffffff', // White color for "TENKYU TRU!"
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    secondaryTranslation: {
        fontSize: 24,
        color: '#000000FF', // Red color for the secondary translation
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 5,

    },
    secondaryTranslation2: {
        fontSize: 24,
        color: '#ff0000', // Red color for the secondary translation
        textAlign: 'center',
        fontWeight: 'bold',
        top: -37,
    },
    button: {
        backgroundColor: '#ffcc00', // Yellow background for the button
        borderRadius: 10,
        marginTop: 30,
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: 90,
    },
    buttonText: {
        fontSize: 18,
        color: '#001a4b', // Dark blue text for the button
        fontWeight: 'bold',
    },
    crowdImage: {
        width: '100%',
        height: '60%', // Adjust based on the crowd image size
        marginTop: 20,
        top: 75,
    },
});

export default ThankYouScreen;
