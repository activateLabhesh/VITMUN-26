
import Registration from '../models/registrationmodel'; // <-- Import Mongoose Model
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

interface CommitteePreference {
    committee: string;
    allotment1: string;
    allotment2: string;
    allotment3: string;
}


export interface RegistrationData {
    participantName: string;
    registrationNumber: string;
    contactNumber: string;
    emailId: string;
    participantType: string; 
    committeePreference1: CommitteePreference;
    committeePreference2: CommitteePreference;
    committeePreference3: CommitteePreference;
    delegateExpCount: string;
    delegateExpNames: string;
    ebExpCount: string;
    ebExpNames: string;
}
// --- Excel Constants (no change) ---
const FILE_PATH = path.join(__dirname, '..', '..', 'data', 'registrations.xlsx'); // Adjusted path
const SHEET_NAME = 'Delegates';
const HEADERS = [
    'Participant Name', 'Registration Number', 'Contact Number', 'Email ID',
    'Participant Type', 
    'Pref 1 Committee', 'Pref 1 Allotment 1', 'Pref 1 Allotment 2', 'Pref 1 Allotment 3',
    'Pref 2 Committee', 'Pref 2 Allotment 1', 'Pref 2 Allotment 2', 'Pref 2 Allotment 3',
    'Pref 3 Committee', 'Pref 3 Allotment 1', 'Pref 3 Allotment 2', 'Pref 3 Allotment 3',
    'Delegate Exp Count', 'Delegate Exp Names', 'EB Exp Count', 'EB Exp Names'
];

// --- Excel Helper (no change) ---
async function getRegistrationWorksheet(workbook: ExcelJS.Workbook): Promise<ExcelJS.Worksheet> {
    const sheet = workbook.getWorksheet(SHEET_NAME);
    if (sheet) { return sheet; }
    const newSheet = workbook.addWorksheet(SHEET_NAME);
    newSheet.addRow(HEADERS);
    return newSheet;
}

/**
 * Saves one registration data object to BOTH MongoDB and Excel.
 */
export const saveinfo = async (data: RegistrationData): Promise<void> => {
    
    // --- Task 1: Save to MongoDB ---
    // Create a new instance of the Mongoose model
    const newRegistration = new Registration(data);
    // save() returns a promise, perfect for Promise.all
    const mongoPromise = newRegistration.save();

    // --- Task 2: Save to Excel (no change) ---
    const excelPromise = (async () => {
        const workbook = new ExcelJS.Workbook();
        let worksheet: ExcelJS.Worksheet;
        try {
            if (fs.existsSync(FILE_PATH)) {
                await workbook.xlsx.readFile(FILE_PATH);
                worksheet = await getRegistrationWorksheet(workbook);
            } else {
                worksheet = await getRegistrationWorksheet(workbook);
            }
        } catch (error) {
            console.error("Error reading or initializing workbook:", error);
            worksheet = await getRegistrationWorksheet(new ExcelJS.Workbook());
        }

        const rowData = [
            data.participantName, data.registrationNumber, data.contactNumber, data.emailId,
            data.participantType,
            data.committeePreference1.committee, data.committeePreference1.allotment1, data.committeePreference1.allotment2, data.committeePreference1.allotment3,
            data.committeePreference2.committee, data.committeePreference2.allotment1, data.committeePreference2.allotment2, data.committeePreference2.allotment3,
            data.committeePreference3.committee, data.committeePreference3.allotment1, data.committeePreference3.allotment2, data.committeePreference3.allotment3,
            data.delegateExpCount, data.delegateExpNames,
            data.ebExpCount, data.ebExpNames
        ];
        
        worksheet.addRow(rowData);
        await workbook.xlsx.writeFile(FILE_PATH);
    })();

    // --- Run both tasks in parallel (no change) ---
    try {
        await Promise.all([mongoPromise, excelPromise]);
        console.log('Successfully saved to MongoDB and Excel');
    } catch (error) {
        console.error('Error saving data to one or more services: ', error);
        throw new Error('Failed to save data to one or more destinations.');
    }
};
