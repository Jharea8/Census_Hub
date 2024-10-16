import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

// Assuming you have some database handling functions imported
import { Comment, deleteCommentToDB, getComments, initializeDB, saveCommentToDB, updateCommentToDB } from '@/database'; 

const CensusCommentScreen = () => {
    const navigation = useNavigation();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]); // Manage comment state
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);


    const fetchComments = async () => {
        // Fetch comments from database here
        const allComments = await getComments();
        setComments(allComments);
    };

    useEffect(() => {
        const setupDatabase = async () => {
            await initializeDB();
            await fetchComments();
        };
        setupDatabase();
    }, []);


    const handleComplete = async () => {
        // Save comment to database here
        if (
            !comments
        ) {
            Alert.alert("Error", "Please enter a comment");
            return;
        }
        Alert.alert("Success", "Comment saved successfully");
        (navigation as any).navigate('Signout');
        try {
            if (editingCommentId) {
                // Update existing comment
                await updateCommentToDB(
                    editingCommentId,
                    comment
                );
                console.log("Comment updated successfully");
            } else {
                // Save new comment
                const id = await saveCommentToDB(
                    comment
                );
                console.log("Comment saved successfully", id);
            }
            resetForm();
            fetchComments();
        } catch (error) {
            console.error("Error saving comment:", error);
        }
    };

    const handleUpdateClick = (comment: Comment) => {
        // Update comment in database here
        saveCommentToDB(comment.comment);
        setEditingCommentId(comment.id);
    };

    const handleDeleteClick = async (id: number) => {
        try {
            await deleteCommentToDB(id);
            console.log("Comment deleted successfully");
            fetchComments();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const resetForm = () => {
        // Clear the form after saving or update
        setComments([]);
        setEditingCommentId(null);
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
            >

            </ImageBackground>

            {/* Comment Section */}
            <View style={styles.commentSection}>
                <Text style={styles.title}>Comment/ Remarks</Text>
                <Text style={styles.subtitle}>
                    (Note in the space below type any comments/questions if you have).
                </Text>

                {/* Input Text Area */}
                <TextInput
                    style={styles.textArea}
                    placeholder="Add text here..."
                    placeholderTextColor="#9b9b9b"
                    multiline
                    numberOfLines={6}
                    value={comment} // Bind the comment state to input
                    onChangeText={(text) => setComment(text)} // Update state when user types
                />

                {/* Complete Button */}
                <TouchableOpacity style={styles.button} onPress={handleComplete}>
                    <Text style={styles.buttonText}>Complete</Text>
                </TouchableOpacity>



            {/* Table to display records */}
            <View style={styles.tableContainer}>
                {comments.map((comment) => (
                    <View key={comment.id} style={styles.tableVerticalRow}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>COMMENT / FEEDBACK</Text>
                        <Text style={styles.tableRowText}>{comment.comment}</Text>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => handleUpdateClick(comment)}
                        >
                        <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteClick(comment.id)}
                        >
                        <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                ))}
                </View>
            </View>
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
        
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    header: {
        width: '100%',
        height: '30%', // Adjust based on actual logo image size
        top: -40,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentSection: {
        width: '90%',
        top: -80,
        alignItems: 'center',
        marginTop: -30, // Moves the comment section up slightly
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 50,
        paddingBottom: 20,
        borderBottomColor: '#FFFFFF60',
        borderBottomWidth: 1,
        width: 320,
        textAlign: 'center', 
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        marginBottom: 15,
        textAlign: 'left',
    },
    textArea: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top',
        height: 150,
        borderColor: '#4A4A4AFF',
        borderWidth: 3,
    },
    button: {
        backgroundColor: '#ffcc00', // Yellow button
        borderRadius: 10,
        marginTop: 20,
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#001a4b', // Text color matching background
        fontWeight: 'bold',
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
});

export default CensusCommentScreen;
