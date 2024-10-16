import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ImageBackground } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Checkbox, RadioButton as PaperRadioButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { initializeDB, addPerson, Person, getPersons, deletePerson, updatePerson } from "@/database"; // Import database functions
import { useNavigation } from "expo-router";

export default function CensusForm() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [relationship, setRelationship] = useState("");
    const [dateOfBirth, setDob] = useState(""); // Date of birth
    const [gender, setGender] = useState(""); // Updated from "sex"
    const [maritalStatus, setMaritalStatus] = useState("");
    const [isPNGCitizen, setIsPNGCitizen] = useState(false);
    const [isNonPNGCitizen, setIsNonPNGCitizen] = useState(false);
    const [citizenshipDetails, setCitizenshipDetails] = useState("");

    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [editingPersonId, setEditingPersonId] = useState<number | null>(null); // Track if updating a person


    // Create the table when the component mounts
    useEffect(() => {
        const setupDatabase = async () => {
            await initializeDB();
            fetchPersons();
        };

        setupDatabase();
    }, []);

    const fetchPersons = async () => {
        const allPersons = await getPersons();
        setPersons(allPersons);
    };


    // Save form data into the database
    // const saveData = async () => {
    //     const censusData = {
    //         firstName,
    //         middleName,
    //         lastName,
    //         relationship,
    //         dateOfBirth: dob, // Updated to match the database field name
    //         gender,
    //         maritalStatus,
    //         isPNGCitizen,
    //         isNonPNGCitizen,
    //         citizenshipDetails
    //     };
        
    //     const success = await addPerson(
    //         censusData.firstName,
    //         censusData.middleName,
    //         censusData.lastName,
    //         censusData.relationship,
    //         censusData.dateOfBirth,
    //         censusData.gender,
    //         censusData.maritalStatus,
    //         censusData.isPNGCitizen,
    //         censusData.isNonPNGCitizen,
    //         censusData.citizenshipDetails
    //     );

    //     if (success) {
    //         Alert.alert("Success", "Data saved successfully");
    //         // Optionally reset form fields here
    //         resetFormFields();
    //     } else {
    //         Alert.alert("Error", "Failed to save data");
    //     }
    // };

    
    const handleSavePress = async () => {
        // Check for required fields
        if (
            !firstName || 
            !middleName || 
            !lastName || 
            !dateOfBirth || 
            !gender || 
            !relationship
        ) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }
        Alert.alert('Saved', 'Your information has been saved successfully.');
        
        try {
            if (editingPersonId) {
                // Update existing Indicative Information
                await updatePerson(
                    editingPersonId,
                    firstName,
                    middleName,
                    lastName,
                    relationship,
                    dateOfBirth,
                    gender,
                    maritalStatus,
                    isPNGCitizen,
                    isNonPNGCitizen,
                    citizenshipDetails,
                );
                console.log("Person update successfully")
            } else {
                // Add new Indicative Information
                const id = await addPerson(
                    firstName,
                    middleName,
                    lastName,
                    relationship,
                    dateOfBirth,
                    gender,
                    maritalStatus,
                    isPNGCitizen,
                    isNonPNGCitizen,
                    citizenshipDetails
                );
                console.log("Person created successfully with ID:", id);
            }
            resetForm();
            fetchPersons();
        } catch (error) {
            console.error("Error saving Person:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePerson(id);
            console.log("Person deleted successfully");
            fetchPersons(); // Refresh the list after deleting
        } catch (error) {
            console.error("Error deleting person:", error);
        }
    };

    const handleUpdateClick = (person: Person) => {
        // Populate the form with the selected person's data
        setFirstName(person.firstName);
        setMiddleName(person.middleName); 
        setLastName(person.lastName);
        setRelationship(person.relationship);
        setDob(person.dateOfBirth);
        setGender(person.gender);
        setMaritalStatus(person.maritalStatus);
        setIsPNGCitizen(person.isPNGCitizen);
        setIsNonPNGCitizen(person.isNonPNGCitizen);
        setCitizenshipDetails(person.citizenshipDetails);
        setEditingPersonId(person.id); // Set ID for updating
    };
    

    const resetForm = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setRelationship("");
        setDob("");
        setGender("");
        setMaritalStatus("");
        setIsPNGCitizen(false);
        setIsNonPNGCitizen(false);
        setCitizenshipDetails("");
        setEditingPersonId(null); // Reset ID for creating new entries
    };

    const handleNextPress = () => {

        // If all validations pass, navigate to the next page
        (navigation as any).navigate('Feedback'); // Navigate to the 'Feedback' screen
    };
    

    return (
        <ImageBackground
            source={require('@/assets/images/BG.png')} // Use your image path here
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
                    <StatusBar style="auto" />
                    <Text style={styles.title}>Personal Information</Text>
                    
                    <View style={styles.box1}>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Middle Name"
                            value={middleName}
                            onChangeText={setMiddleName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />

                    </View>

                    <View style={styles.box2}>
                        <Picker
                            selectedValue={relationship}
                            style={styles.picker}
                            onValueChange={(itemValue) => setRelationship(itemValue)}
                        >
                            <Picker.Item label="Select Relationship" value="" />
                            <Picker.Item label="Head of Household" value="Head of Household" />
                            <Picker.Item label="Husband/Wife" value="Husband/Wife" />
                            <Picker.Item label="Own Son" value="Own Son" />
                            <Picker.Item label="Own Daughter" value="Own Daughter" />
                            <Picker.Item label="Son/Daughter in-law" value="Son/Daughter in-law" />
                            <Picker.Item label="Adopted/Step Child" value="Adopted/Step Child" />
                            <Picker.Item label="Father/Mother" value="Father/Mother" />
                            <Picker.Item label="Brother/Sister" value="Brother/Siste" />
                            <Picker.Item label="Grand/Great Grandchild" value="Grand/Great Grandchild" />
                            <Picker.Item label="Father/Mother in-law" value="Father/Mother in-law" />
                            <Picker.Item label="Brother/Sister in-law" value="Brother/Sister in-law" />
                            <Picker.Item label="Other Relatives" value="Other Relatives" />
                            <Picker.Item label="Non-relative" value="Non-relative" />
                        </Picker>

                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/YYYY"
                            value={dateOfBirth}
                            onChangeText={setDob}
                        />

                        <View style={styles.radioGroup}>
                            <Text style={{ color: "#FFFFFFFF", fontWeight: 'bold' }}>Gender:</Text>
                            <View style={styles.radioButton}>
                                <PaperRadioButton
                                    value="male"
                                    status={gender === "male" ? "checked" : "unchecked"}
                                    onPress={() => setGender("male")}
                                    color="#FFCC00"
                                    uncheckedColor="#FFF"   
                                />
                                <Text style={{ color: "#FFFFFFFF" }}>Male</Text>
                            </View>
                            <View style={styles.radioButton}>
                                <PaperRadioButton
                                    value="female"
                                    status={gender === "female" ? "checked" : "unchecked"}
                                    onPress={() => setGender("female")}
                                    color="#FFCC00"
                                    uncheckedColor="#FFF"   
                                />
                                <Text style={{ color: "#FFFFFFFF" }}>Female</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.box3}>
                        <Picker
                            selectedValue={maritalStatus}
                            style={styles.picker}
                            onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                        >
                            <Picker.Item label="Select Marital Status" value="" />
                            <Picker.Item label="Single" value="single" />
                            <Picker.Item label="Married" value="married" />
                            <Picker.Item label="Complicated" value="complicated" />
                        </Picker>

                        <View style={styles.checkboxContainer}>
                            <Text style={{ color: "#FFFFFFFF", fontWeight: 'bold' }}>Citizenship:</Text>
                            <View style={styles.checkbox}>
                                <Checkbox 
                                    status={isPNGCitizen ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setIsPNGCitizen(true);
                                        setIsNonPNGCitizen(false); // Ensure only one can be selected
                                        setCitizenshipDetails("PNG Citizen"); // Update citizenshipDetails
                                    }}
                                    color="#FFCC00"
                                    uncheckedColor="#FFF"   
                                />
                                <Text style={{ color: "#FFFFFFFF" }}>PNG Citizen</Text>
                            </View>
                            <View style={styles.checkbox}>
                                <Checkbox
                                    status={isNonPNGCitizen ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setIsNonPNGCitizen(true);
                                        setIsPNGCitizen(false); // Ensure only one can be selected
                                        setCitizenshipDetails("Non-PNG Citizen"); // Update citizenshipDetails
                                    }}
                                    color="#FFCC00"
                                    uncheckedColor="#FFF"                              
                                />
                                <Text style={{ color: "#FFFFFFFF" }}>Non-PNG Citizen</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
                            <Text style={styles.buttonText1}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                            <Text style={styles.buttonText1}>Next</Text>
                        </TouchableOpacity>
                    </View>



                    {/* Table to display records */}
                    <View style={styles.tableContainer}>
                    {persons.map((person) => (
                        <View key={person.id} style={styles.tableVerticalRow}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>First Name:</Text>
                            <Text style={styles.tableRowText}>{person.firstName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Middle Name:</Text>
                            <Text style={styles.tableRowText}>{person.middleName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Last Name:</Text>
                            <Text style={styles.tableRowText}>{person.lastName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Relationship:</Text>
                            <Text style={styles.tableRowText}>{person.relationship}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>DOB:</Text>
                            <Text style={styles.tableRowText}>{person.dateOfBirth}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Gender:</Text>
                            <Text style={styles.tableRowText}>{person.gender}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Marital Status:</Text>
                            <Text style={styles.tableRowText}>{person.maritalStatus}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Citizenship:</Text>
                            <Text style={styles.tableRowText}>{person.citizenshipDetails}</Text>
                        </View>

                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => handleUpdateClick(person)}
                            >
                            <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(person.id)}
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
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        // backgroundColor: "#001f3f",
        padding: 20,
    },
    image: {
        width: '100%',
        height: 90,
        maxWidth: 400,
        marginBottom: 25,
        top: 10,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    box1: {
        backgroundColor: '#FFFFFF46',
        padding: 15,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginBottom: 20,
    },
    box2: {
        backgroundColor: '#FFFFFF46',
        padding: 15,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginBottom: 20,
    },
    box3: {
        backgroundColor: '#FFFFFF46',
        padding: 15,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        fontSize: 16,
    },
    picker: {
        backgroundColor: "#fff",
        marginVertical: 8,
        padding: 10,
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxContainer: {
        marginVertical: 8,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#ffcc00",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },




    tableContainer: {
        marginTop: 20,
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
    buttonText: {
        color: "#fff",
        fontWeight: "bold", 
    },
    buttonText1: {
        color: "#000000FF",
        fontWeight: "bold",
    },
});
