
import { db } from '../firebase'; 
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export interface InviteRequestData {
    organizationName: string;
    headDelegateName: string;
    emailId: string;
    contactNumber: string;
    delegationStrength: string;
}

const FILE_PATH = path.join(__dirname, '..','..','data', 'invite_requests.xlsx');
const SHEET_NAME = 'Invite Requests';
const HEADERS = [
    'Organization Name', 'Head Delegate', 'Email ID', 'Contact Number', 'Delegation Strength'
];

async function getInviteWorksheet(workbook: ExcelJS.Workbook): Promise<ExcelJS.Worksheet> {
    const sheet = workbook.getWorksheet(SHEET_NAME);
    if (sheet) {
        return sheet;
    }
    const newSheet = workbook.addWorksheet(SHEET_NAME);
    newSheet.addRow(HEADERS);
    return newSheet;
}

export const saveInviteRequest = async (data: InviteRequestData): Promise<void> => {
    
    const firestorePromise = db.collection('inviteRequests').add(data);

    const excelPromise = (async () => {
        const workbook = new ExcelJS.Workbook();
        let worksheet: ExcelJS.Worksheet;

        try {
            if (fs.existsSync(FILE_PATH)) {
                await workbook.xlsx.readFile(FILE_PATH);
                worksheet = await getInviteWorksheet(workbook);
            } else {
                worksheet = await getInviteWorksheet(workbook);
            }
        } catch (error) {
            console.error("Error reading or initializing invite workbook:", error);
            worksheet = await getInviteWorksheet(new ExcelJS.Workbook());
        }

        const rowData = [
            data.organizationName,
            data.headDelegateName,
            data.emailId,
            data.contactNumber,
            data.delegationStrength
        ];
        
        worksheet.addRow(rowData);
        await workbook.xlsx.writeFile(FILE_PATH);
    })();

    try {
        await Promise.all([firestorePromise, excelPromise]);
        console.log('Successfully saved invite request to Firestore and Excel');
    } catch (error) {
        console.error('Error saving invite request to one or more services: ', error);
        throw new Error('Failed to save invite request to one or more destinations.');
    }
};

