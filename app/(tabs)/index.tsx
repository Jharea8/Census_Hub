import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getUserByEmailAndPassword } from '@/database';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    (navigation as any).navigate("SignUp");
  };

  const handleLogIn = async () => {
    try {
      // Trim whitespace from email and password inputs
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
  
      // Attempt to log in with the trimmed inputs
      const user = await getUserByEmailAndPassword(trimmedEmail, trimmedPassword);
      
      if (user) {
        Alert.alert("Success", "Logged in successfully!");
        (navigation as any).navigate("IndicativeInfoPage");
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login. Please try again.");
    }
  };

  // Function to handle forgotten passwords
  const handleForgotPassword = () => {
    if (email.trim() === '') {
      Alert.alert("Input Required", "Please enter your email to reset the password.");
    } else {
      // Navigate to ResetPassword screen or initiate password reset flow
      (navigation as any).navigate("ResetPassword", { email: email.trim() });
      Alert.alert("Reset Password", "A password reset link has been sent to your email.");
    }
  };

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '', dark: '' }}
    headerImage={
      <Image
        source={require('@/assets/images/header2.png')}
        style={styles.reactLogo}
      />
      }
      >
        <View style={{ marginTop: 20 }}>{/* Adjust the margin as needed */}</View> 
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome Back!!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Log into your account to continue
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {/* Input Field */}
          <TextInput 
            placeholder='Enter Email' 
            style={styles.textInput}
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            placeholder='Enter Password' 
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View>
            {/* On Press of this text, call the forgot password handler */}
            <TouchableOpacity onPress={handleForgotPassword}>
              <ThemedText style={styles.linkText}>Forget password?</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
        <ThemedView>
          <View style={styles.btnContainer}>
            <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={handleLogIn}
            >
              <ThemedText style={styles.loginText}>Log In</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>{/* Adjust the margin as needed */}</View> 
          <View>
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={handleSignUp}
            >
              <ThemedText style={styles.checkboxLabel}>
                New User? <ThemedText style={styles.linkText}>Sign up!</ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
        <ThemedView style={styles.subContainer}>
          <ThemedText type='subtitle' style={{ color: 'orange' }}>Get Started</ThemedText>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  subContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 110,
  },
  btnContainer: {},
  reactLogo: {
    height: 100,
    width: 360,
    bottom: 0,
    left: 15,
    position: 'absolute',
    top: 10,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ffffff',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
  },
  buttonSecondary:{

  },
  Label: {
    textAlign: 'right',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -18,
  },
  checkboxLabel: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FFCC00',
    marginBottom: 30,
  },
  loginText: {
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FFCC00',
    borderRadius: 6,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});