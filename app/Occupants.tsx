import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';

const CensusScreen = () => {
    const navigation = useNavigation();
    const [householdCount, setHouseholdCount] = useState('');
    const [otherPersonCount, setOtherPersonCount] = useState('');

    const handleNextPress = () => {
        if (!householdCount) {
            Alert.alert('Error', 'Please enter the number of people.');
            return;
        }

        // Navigate to the next screen after validation
        Alert.alert('Submitted', `Household Count: ${householdCount}, Other Person Count: ${otherPersonCount}`);
        (navigation as any).navigate('Dashboard'); // Proceed to the next screen
    };

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')} // Use your image path here
            style={styles.background}
        >
            <View style={styles.container}>
                <View>
                    <Image 
                        source={require('@/assets/images/header2.png')} 
                        style={[styles.image, { alignSelf: 'center' }]}
                    />
                </View>
                <Text style={styles.title}>Household Number</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        How many people (including visitors), slept here in your household on the night of{' '}
                        <Text style={styles.boldText}>Sunday, 16th June 2024?</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={householdCount}
                        onChangeText={setHouseholdCount}
                        keyboardType="numeric"
                        placeholder="Enter number"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Are there any other persons (not family members), who may not have been listed?
                        <Text style={styles.note}> (Domestic Servants, lodgers, or friends)</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={otherPersonCount}
                        onChangeText={setOtherPersonCount}
                        keyboardType="numeric"
                        placeholder="Enter number"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default CensusScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,

        padding: 20,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 90,
        maxWidth: 400,
        marginBottom: 25,
        top: -50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        borderBottomColor: '#FFFFFF60',
        borderBottomWidth: 1,
        paddingBottom: 25,
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF46',
        padding: 15,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    label: {
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    note: {
        fontStyle: 'italic',
        color: '#FFD700',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: '#000000',
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
