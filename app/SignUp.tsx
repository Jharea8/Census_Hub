import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Checkbox } from 'react-native-paper';
import { addUser, deleteUser, getUsers, initializeDB, User } from '@/database';



const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (!isChecked) {
            Alert.alert('Error', 'Please accept the Terms of Use & Privacy Policy');
            return;
        }

        try {
            const userId = await addUser(firstName, lastName, email, password, isChecked);
            Alert.alert('Success', `You have signed up successfully! Your user ID is ${userId}`);
        } catch (error) {
            Alert.alert('Error', 'An error occurred during sign-up. Please try again.');
        }
    };

    const fetchUsers = async () => {
        // Fetch users from the database
        const allUsers = await getUsers();
        setUsers(allUsers);
    };

    useEffect(() => {
        const setupDatabase = async () => {
            await initializeDB();
            await fetchUsers();
        };
        setupDatabase();
    }, []);


    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            console.log('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setChecked(false);
    };

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')}
            style={styles.background}
        >
            <ScrollView>
                <View style={styles.container}>
                <View>
                    <Image 
                        source={require('@/assets/images/header2.png')} 
                        style={[styles.image,{ alignSelf: 'center' }]}
                    />
                </View>
                    
                    <View style={styles.main}>
                        <Text style={styles.title}>Sign Up!!</Text>
                        <Text style={styles.subtitle}>Please fill in this form to create an account!</Text>
                    </View>

                    <View style={styles.nameContainer}>
                        <TextInput
                            style={[styles.input, styles.nameInput]}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={[styles.input, styles.nameInput]}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            status={isChecked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!isChecked)}
                            color="#FFCC00"
                            uncheckedColor="#FFF"
                        />
                        <Text style={styles.checkboxLabel}>
                            I accept the <Text style={styles.linkText}>Terms of Use</Text> & <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>


                    {/* Table to display records */}
                    <View style={styles.tableContainer}>
                    {users.map((user) => (
                        <View key={user.id} style={styles.tableVerticalRow}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>First Name</Text>
                            <Text style={styles.tableRowText}>{user.firstName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Last Name</Text>
                            <Text style={styles.tableRowText}>{user.lastName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Email</Text>
                            <Text style={styles.tableRowText}>{user.email}</Text>
                        </View>

                        <View style={styles.actionButtons}>
                            {/* <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => handleUpdateClick(user)}
                            >
                            <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteUser(user.id)}
                            >
                            <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    ))}
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    main: {},
    container: {
        flex: 1, 
        padding: 30, 
        // backgroundColor: "#001f3f", // Slightly off-white for a modern clean background 
        justifyContent: "center",
        
    },
    header: { 
        fontSize: 28, 
        fontWeight: "bold", 
        color: "#ffffff", // Darker text color for contrast 
        textAlign: "center", 
        marginBottom: 50,

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'left',
        borderBottomColor: '#FFFFFF60',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        top: 15,
        width: '103.5%',
    },
    nameInput: {
        flex: 1,
        marginRight: 10, // Adds spacing between First Name and Last Name
    },

    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        height: 40,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',        
    },
    checkboxLabel: {
        marginLeft: 8,
        color: '#fff',
    },
    linkText: {
        color: '#FFCC00',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#FFCC00',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        top: -10,
    },
    buttonText: {
        color: '#001f3f',
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 90,
        maxWidth: 400,
        marginBottom: 25,
        top: 20,
    },




    tableContainer: {
        marginTop: 10,
        borderColor: "#ffffff",
    },
    tableHeader: {
        flexDirection: "row", // Remains the same for the label and data side-by-side
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    tableHeaderText: {
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 5,
        width: "40%", // Adjust width to match alignment
    },
    tableRowText: {
        color: "#FFFFFF",
        marginBottom: 5,
        width: "60%", // Adjust width to match alignment
    },
    tableVerticalRow: {
        padding: 10,
        backgroundColor: "#FFFFFF36",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    updateButton: {
        backgroundColor: "#4CAF50",
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: "#F44336", 
        padding: 5, 
        borderRadius: 5,
    },
    buttonText1: {
        color: "#fff",
        fontWeight: "bold", 
    },
});