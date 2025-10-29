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
    participantType: string; // <-- ADD THIS LINE
    committeePreference1: CommitteePreference;
    committeePreference2: CommitteePreference;
    committeePreference3: CommitteePreference;
    delegateExpCount: string;
    delegateExpNames: string;
    ebExpCount: string;
    ebExpNames: string;
}

const FILE_PATH = path.join(__dirname, '..', 'registrations.xlsx');
const SHEET_NAME = 'Delegates';


const HEADERS = [
    'Participant Name', 'Registration Number', 'Contact Number', 'Email ID',
    'Participant Type',
    'Pref 1 Committee', 'Pref 1 Allotment 1', 'Pref 1 Allotment 2', 'Pref 1 Allotment 3',
    'Pref 2 Committee', 'Pref 2 Allotment 1', 'Pref 2 Allotment 2', 'Pref 2 Allotment 3',
    'Pref 3 Committee', 'Pref 3 Allotment 1', 'Pref 3 Allotment 2', 'Pref 3 Allotment 3',
    'Delegate Exp Count', 'Delegate Exp Names', 'EB Exp Count', 'EB Exp Names'
];


async function getWorksheet(workbook: ExcelJS.Workbook): Promise<ExcelJS.Worksheet> {
    const sheet = workbook.getWorksheet(SHEET_NAME);
    if (sheet) {
        return sheet;
    }


    const newSheet = workbook.addWorksheet(SHEET_NAME);
    newSheet.addRow(HEADERS);
    return newSheet;
}


export const saveinfo = async (data: RegistrationData): Promise<void> => {
    const workbook = new ExcelJS.Workbook();
    let worksheet: ExcelJS.Worksheet;

    try {

        if (fs.existsSync(FILE_PATH)) {
            await workbook.xlsx.readFile(FILE_PATH);
            worksheet = await getWorksheet(workbook);
        } else {

            worksheet = await getWorksheet(workbook);
        }
    } catch (error) {
        console.error("Error reading or initializing workbook:", error);

        worksheet = await getWorksheet(new ExcelJS.Workbook());
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


    try {
        await workbook.xlsx.writeFile(FILE_PATH);
        console.log('Successfully saved data to Excel file');
    } catch (error) {
        console.error("Error writing Excel file:", error);
        throw new Error('Failed to save data to Excel.');
    }
};

