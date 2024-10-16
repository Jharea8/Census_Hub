import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Button, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import Header from '@/components/Header';
import { addIndicativeInfo, deleteIndicativeInfo, getIndicativeInfos, IndicativeInfo, initializeDB, updateIndicativeInfo } from '@/database';

const IndicativeInfoScreen = () => {
    const navigation = useNavigation();
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [llg, setLLG] = useState('');
    const [censusUnit, setCensusUnit] = useState('');
    const [censusUnitType, setCensusUnitType] = useState('');
    const [workload, setWorkload] = useState('');
    const [locality, setLocality] = useState('');
    const [section, setSection] = useState('');
    const [structureNo, setStructureNo] = useState('');
    const [lot, setLot] = useState('');
    const [pdNo, setPdNo] = useState('');
    const [householdNo, setHouseholdNo] = useState('');
    const [indicativeInfos, setIndicativeInfos] = useState<IndicativeInfo[]>([]);
    const [selectedIndicativeInfo, setSelectedIndicativeInfo] = useState<number | null>(null);
    const [editingIndicativeInfoId, setEditingIndicativeInfoId] = useState<number | null>(null);


    // const handleSavePress = () => {
    //     Alert.alert('Saved', 'Your information has been saved successfully.');
    // };

    const fetchIndicativeInfos = async () => {
        const allIndicativeInfos = await getIndicativeInfos();
        setIndicativeInfos(allIndicativeInfos);
    };

    useEffect (() => {
        const setupDatabase = async () => {
            await initializeDB();
            fetchIndicativeInfos();
        };
        setupDatabase();
    },[]);

    const handleNextPress = () => {
        (navigation as any).navigate("Occupants")
    };

    const handleSavePress = async () => {
        if (
            !province ||
            !district ||
            !llg ||
            !censusUnit ||
            !censusUnitType ||
            !workload ||
            !locality ||
            !section ||
            !structureNo ||
            !lot ||
            !pdNo ||
            !householdNo
        ) {
            Alert.alert("Error", "Please fill in all fields correctly.");
            return;
        }
        Alert.alert('Saved', 'Your information has been saved successfully.');
        
        try {
            if (editingIndicativeInfoId) {
                // Update existing Indicative Information
                await updateIndicativeInfo(
                    editingIndicativeInfoId,
                    province,
                    district,
                    llg,
                    censusUnit,
                    censusUnitType,
                    workload,
                    locality,
                    section,
                    structureNo,
                    lot,
                    pdNo,
                    householdNo
                );
                console.log("Information update successfully")
            } else {
                // Add new Indicative Information
                const id = await addIndicativeInfo(
                    province,
                    district,
                    llg,
                    censusUnit,
                    censusUnitType,
                    workload,
                    locality,
                    section,
                    structureNo,
                    lot,
                    pdNo,
                    householdNo
                );
                console.log("IOnformation created successfully with ID:", id);
            }
            resetForm();
            fetchIndicativeInfos();
        } catch (error) {
            console.error("Error saving Indicative Information:", error);
        }
    };



    const handleDelete = async (id: number) => {
        try {
            await deleteIndicativeInfo(id);
            console.log("Information deleted successfully");
            fetchIndicativeInfos(); //refreshing the list after deleting
        } catch (error){
            console.error("Error deleting information:", error);
        }
    };


    const handleUpdateClick = (indicativeInfo: IndicativeInfo) => {
        //Populate the form with the selected person's data
        setProvince(indicativeInfo.province);
        setDistrict(indicativeInfo.district);
        setLLG(indicativeInfo.llg);
        setCensusUnit(indicativeInfo.censusUnit);
        setCensusUnitType(indicativeInfo.censusUnitType);
        setWorkload(indicativeInfo.workLoad);
        setLocality(indicativeInfo.locality);
        setSection(indicativeInfo.section);
        setStructureNo(indicativeInfo.structureNo);
        setLot(indicativeInfo.lot);
        setPdNo(indicativeInfo.pdNo);
        setHouseholdNo(indicativeInfo.householdNo);
        setEditingIndicativeInfoId(indicativeInfo.id); // Set ID for updating
    };


    const resetForm = () => {
        // Clear the form after saving or update
        setProvince("Select Province");
        setDistrict("Select District");
        setLLG("");
        setCensusUnit("");
        setCensusUnitType("");
        setWorkload("");
        setLocality("");
        setSection("");
        setStructureNo("");
        setLot("");
        setPdNo("");
        setHouseholdNo("");
        setEditingIndicativeInfoId(null); // Reset ID for creating new entries
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
                    <Text style={styles.title}>Indicative Information</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Province:</Text>
                        <Picker
                        selectedValue={province}
                        style={styles.picker}
                        onValueChange={(itemValue: React.SetStateAction<string>) => setProvince(itemValue)}>
                            <Picker.Item label="Select Province" value="" />
                            <Picker.Item label="Central Province" value="central" />
                            <Picker.Item label="Gulf Province" value="gulf" />
                            <Picker.Item label="Oro Province" value="oro" />
                            <Picker.Item label="Southern Highlands Province" value="southern_highlands" />
                            <Picker.Item label="Hela Province" value="hela" />
                            <Picker.Item label="Enga Province" value="enga" />
                            <Picker.Item label="Western Highlands Province" value="western_highlands" />
                            <Picker.Item label="Simbu Province" value="simbu" />
                            <Picker.Item label="Eastern Highlands Province" value="eastern_highlands" />
                            <Picker.Item label="Madang Province" value="madang" />
                            <Picker.Item label="East New Britain Province" value="east_new_britain" />
                            <Picker.Item label="West New Britain Province" value="west_new_britain" />
                            <Picker.Item label="New Ireland Province" value="new_ireland" />
                            <Picker.Item label="Bougainville Province" value="bougainville" />
                            <Picker.Item label="Sandaun Province" value="sandaun" />
                            <Picker.Item label="East Sepik Province" value="east_sepik" />
                            <Picker.Item label="West Sepik Province" value="west_sepik" />
                            <Picker.Item label="Morobe Province" value="morobe" />
                            <Picker.Item label="Madang Province" value="madang" />
                            <Picker.Item label="NCD (National Capital District)" value="ncd" />
                            <Picker.Item label="Manus Province" value="manus" />
                            <Picker.Item label="Milne Bay Province" value="milne_bay" />
                            <Picker.Item label="Western Province" value="western" />
                        {/* Add more provinces as needed */}
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>District:</Text>
                        <Picker
                        selectedValue={district}
                        style={styles.picker}
                        onValueChange={(itemValue: React.SetStateAction<string>) => setDistrict(itemValue)}>
                        <Picker.Item label="Select District" value="" /> 
                        <Picker.Item label="District 1" value="district1" />
                        <Picker.Item label="District 2" value="district2" />
                        {/* Add more districts as needed */}
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>LLG:</Text>
                        <TextInput
                        style={styles.input}
                        value={llg}
                        onChangeText={setLLG}
                        placeholder="Enter LLG"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Census Unit (CU):</Text>
                        <TextInput
                        style={styles.input}
                        value={censusUnit}
                        onChangeText={setCensusUnit}
                        placeholder="Enter Census Unit"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Census Unit Type:</Text>
                        <TextInput
                        style={styles.input}
                        value={censusUnitType}
                        onChangeText={setCensusUnitType}
                        placeholder="Enter Census Unit Type"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Workload no.:</Text>
                        <TextInput
                        style={styles.input}
                        value={workload}
                        onChangeText={setWorkload}
                        placeholder="Enter Workload Number"
                        />
                    </View>

                    {/* Second form section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Locality:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={locality}
                        onChangeText={setLocality}
                        placeholder="Enter Locality"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Section:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={section}
                        onChangeText={setSection}
                        placeholder="Enter Section"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Structure No.:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={structureNo}
                        onChangeText={setStructureNo}
                        placeholder="Enter Structure No."
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Lot:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={lot}
                        onChangeText={setLot}
                        placeholder="Enter Lot"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>PD No.:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={pdNo}
                        onChangeText={setPdNo}
                        placeholder="Enter PD No."
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Household No.:</Text>
                        <TextInput
                        style={styles.inputYellow}
                        value={householdNo}
                        onChangeText={setHouseholdNo}
                        placeholder="Enter Household No."
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                        <Text style={styles.buttonText1}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                        <Text style={styles.buttonText1}>Next</Text>
                        </TouchableOpacity>
                    </View>



                    {/* <Button
                    title={selectedIndicativeInfo ? "Update" : "Submit"}
                    onPress={handleSavePress}
                    /> */}

                    {/* Table to display records */}
                    <View style={styles.tableContainer}>
                    {indicativeInfos.map((indicativeInfo) => (
                        <View key={indicativeInfo.id} style={styles.tableVerticalRow}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Province:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.province}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>District:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.district}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>LLG:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.llg}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>CU:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.censusUnit}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>CUT:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.censusUnitType}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Workload:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.workLoad}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Locality:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.locality}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Section:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.section}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Structure No.:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.structureNo}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Lot:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.lot}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>PD No.:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.pdNo}</Text>
                            </View>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Household No.:</Text>
                                <Text style={styles.tableRowText}>{indicativeInfo.householdNo}</Text>
                            </View>
                            
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                style={styles.updateButton}
                                onPress={() => handleUpdateClick(indicativeInfo)}
                                >
                                <Text style={styles.buttonText}>Update</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(indicativeInfo.id)}
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

export default IndicativeInfoScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        // backgroundColor: '#0A2842',
        padding: 20,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 90,
        maxWidth: 400,
        marginBottom: 25,
        top: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        borderBottomColor: '#FFFFFF60',
        borderBottomWidth: 1,
        paddingBottom: 15,
        top: 10,
    },
    inputContainer: {
        marginBottom: 10,
        padding: -10,
        top: 10,
    },
    section: {
        marginBottom: 15,
        top: 10,
    },
    label: {
        fontSize: 13,
        color: '#FFFFFF',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 7,
        fontSize: 16,
        height: 40,
        color: '#000000',
    },
    inputYellow: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        padding: 7,
        fontSize: 16,
        height: 40,
        color: '#000000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        top: 3,
    },
    saveButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    nextButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
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
