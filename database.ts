import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string; // Previously "date"
    gender: string;
    maritalStatus: string;
    isPNGCitizen: boolean;
    isNonPNGCitizen: boolean;
    citizenshipDetails: string;
}

export interface IndicativeInfo {
    id: number;
    province: string;
    district: string;
    llg: string;
    censusUnit: string; // Changed to string to represent "true" or "false"
    censusUnitType: string; // Changed from boolean to string
    workLoad: string;
    locality: string;
    section: string; // Changed from boolean to string
    structureNo: string; // Changed from boolean to string
    lot: string;
    pdNo: string;
    householdNo: string;
}

export interface Comment {
    id: number;
    comment: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
}


export const initializeDB = async () => {
    try{
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS person (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                firstName TEXT NOT NULL,
                middleName TEXT, -- Remove NOT NULL to allow flexibility for existing rows
                lastName TEXT NOT NULL,
                relationship TEXT NOT NULL,
                dateOfBirth TEXT NOT NULL, 
                gender TEXT NOT NULL,
                maritalStatus TEXT NOT NULL,
                isPNGCitizen INTEGER NOT NULL,  
                isNonPNGCitizen INTEGER NOT NULL, 
                citizenshipDetails TEXT
            );

            CREATE TABLE IF NOT EXISTS indicativeInfo (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                province TEXT NOT NULL,
                district TEXT NOT NULL,
                llg TEXT NOT NULL,
                censusUnit TEXT NOT NULL, -- Changed from INTEGER to TEXT
                censusUnitType TEXT NOT NULL, -- Changed from INTEGER to TEXT
                workLoad TEXT NOT NULL,
                locality TEXT NOT NULL,
                section TEXT NOT NULL, -- Changed from INTEGER to TEXT
                structureNo TEXT NOT NULL, -- Changed from INTEGER to TEXT
                lot TEXT NOT NULL,
                pdNo TEXT NOT NULL,
                householdNo TEXT
            );

            CREATE TABLE IF NOT EXISTS comment (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                comment TEXT
            );

            -- Existing tables initialization code...

            -- Add new table for users
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                acceptedTerms INTEGER NOT NULL -- 1 for true, 0 for false
            );
        `);
        console.log ("Tables initialized successfully:")
    }
    catch (error) {
        console.log ("Error initializing the database:", error)
    }
};

// PERSONAL INFORMATION

export const addPerson = async (
    firstName: string,
    middleName: string,
    lastName: string,
    relationship: string,
    dateOfBirth: string,
    gender: string,
    maritalStatus: string,
    isPNGCitizen: boolean,
    isNonPNGCitizen: boolean,
    citizenshipDetails: string
) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO person 
                (firstName, middleName, lastName, relationship, dateOfBirth, gender, maritalStatus, isPNGCitizen, isNonPNGCitizen, citizenshipDetails) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            firstName,
            middleName,
            lastName,
            relationship,
            dateOfBirth,
            gender,
            maritalStatus,
            isPNGCitizen ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
            isNonPNGCitizen ? 1 : 0, // Convert boolean to integer
            citizenshipDetails
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error adding person:", error);
        throw error;
    }
};

export const updatePerson = async (
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    relationship: string,
    dateOfBirth: string,
    gender: string,
    maritalStatus: string,
    isPNGCitizen: boolean,
    isNonPNGCitizen: boolean,
    citizenshipDetails: string
) => {
    try {
        await db.runAsync(
            `UPDATE person 
            SET 
                firstName = ?, 
                middleName = ?, 
                lastName = ?, 
                relationship = ?, 
                dateOfBirth = ?, 
                gender = ?, 
                maritalStatus = ?, 
                isPNGCitizen = ?, 
                isNonPNGCitizen = ?, 
                citizenshipDetails = ? 
            WHERE id = ?`,
            firstName,
            middleName,
            lastName,
            relationship,
            dateOfBirth,
            gender,
            maritalStatus,
            isPNGCitizen, // Use "true" or "false" as string values
            isNonPNGCitizen,
            citizenshipDetails,
            id
        );
    } catch (error) {
        console.error("Error updating person:", error);
    }
};

export const deletePerson = async (id: number) => {
    try {
        await db.runAsync('DELETE FROM person WHERE id = ?', id);
    } catch (error) {
        console.error("Error deleting person:", error);
    }
};

export const getPersons = async (): Promise<Person[]> => {
    try {
        const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
        return allRows;
    } catch (error) {
        console.error("Error getting persons:", error);
        return [];
    }
};


// INDICATIVE INFORMATION

export const addIndicativeInfo = async (
    province: string,
    district: string,
    llg: string,
    censusUnit: string,
    censusUnitType: string,
    workLoad: string,
    locality: string,
    section: string,
    structureNo: string,
    lot: string,
    pdNo: string,
    householdNo: string
) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO indicativeInfo
                (province, district, llg, censusUnit, censusUnitType, workLoad, locality, section, structureNo, lot, pdNo, householdNo)
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            province,
            district,
            llg,
            censusUnit, // Store "true" or "false" as strings
            censusUnitType,
            workLoad,
            locality,
            section,
            structureNo,
            lot,
            pdNo,
            householdNo
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.log("Error adding indicativeInfo", error);
        throw error;
    }
};

export const updateIndicativeInfo = async (
    id: number,
    province: string,
    district: string,
    llg: string,
    censusUnit: string,
    censusUnitType: string,
    workLoad: string,
    locality: string,
    section: string,
    structureNo: string,
    lot: string,
    pdNo: string,
    householdNo: string
) => {
    try {
        await db.runAsync(
            `UPDATE indicativeInfo
            SET 
                province = ?, 
                district = ?, 
                llg = ?, 
                censusUnit = ?, 
                censusUnitType = ?, 
                workLoad = ?, 
                locality = ?, 
                section = ?, 
                structureNo = ?, 
                lot = ?, 
                pdNo = ?, 
                householdNo = ? 
            WHERE 
                id = ?`,
            province,
            district,
            llg,
            censusUnit,  // Store "true" or "false" as strings
            censusUnitType,
            workLoad,
            locality,
            section,
            structureNo,
            lot,
            pdNo,
            householdNo,
            id
        );
    } catch (error) {
        console.error("Error updating indicativeInfo:", error);
    }
};

export const deleteIndicativeInfo = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM indicativeInfo WHERE id = ?`, id);
    } catch (error) {
        console.log("Error deleting Information", error)
    }
};

export const getIndicativeInfos = async (): Promise<IndicativeInfo[]> => {
    try {
        const allRows = await db.getAllAsync(`SELECT * FROM indicativeInfo`) as IndicativeInfo[];
        return allRows;
    } catch (error) {
        console.log("Error getting indicativeInfos:", error);
        return [];
    }
};


// FEEDBACK

export const saveCommentToDB = async (
    comment: string,
) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO comment
                (comment)
            VALUES 
                (?)`,

            comment
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.log("Error adding comment", error);
        throw error;
    }
};

export const updateCommentToDB = async (
    id: number, 
    comment: string) => {
    try {
        await db.runAsync(
            `UPDATE comment
            SET 
                comment = ? 
            WHERE 
                id = ?`,
            comment,
            id
        );
    } catch (error) {
        console.error("Error updating comment:", error);
    }
};

export const getComments = async (): Promise<Comment[]> => {
    try {
        const allRows = await db.getAllAsync(`SELECT * FROM comment`) as Comment[];
        return allRows;
    } catch (error) {
        console.log("Error getting comments:", error);
        return [];
    }
};

export const deleteCommentToDB = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM comment WHERE id = ?`, id);
    } catch (error) {
        console.log("Error deleting comment", error)
    }
};

// REGISTRATION
export const addUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptedTerms: boolean
) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO users 
                (firstName, lastName, email, password, acceptedTerms) 
            VALUES 
                (?, ?, ?, ?, ?)`,
            firstName,
            lastName,
            email,
            password,
            acceptedTerms ? 1 : 0
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const allRows = await db.getAllAsync(`SELECT * FROM users`) as User[];
        return allRows;
    } catch (error) {
        console.error("Error getting users:", error);
        return [];
    }
};

export const deleteUser = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM users WHERE id = ?`, id);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// GET EMAIL & PASSWORD
// Database functions file

export const getUserByEmailAndPassword = async (email: string, password: string) => { 
    try {
        const result = await db.getAllAsync(
            `SELECT * FROM users WHERE email = ? AND password = ?`,
            email,
            password
        );
        return result; // Will return the user data if found, or undefined if not
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};
