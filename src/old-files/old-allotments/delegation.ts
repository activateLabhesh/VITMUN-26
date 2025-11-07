import InviteRequest from '../models/invite_request'; // <-- Import Mongoose Model
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

const FILE_PATH = path.join(__dirname, '..', '..', 'data', 'invite_requests.xlsx'); // Adjusted path
const SHEET_NAME = 'Invite Requests';
const HEADERS = [
    'Organization Name', 'Head Delegate Name', 'Email ID', 'Contact Number', 'Delegation Strength'
];

// --- Excel Helper (no change)---
async function getInviteWorksheet(workbook: ExcelJS.Workbook): Promise<ExcelJS.Worksheet> {
    const sheet = workbook.getWorksheet(SHEET_NAME);
    if (sheet) { return sheet; }
    const newSheet = workbook.addWorksheet(SHEET_NAME);
    newSheet.addRow(HEADERS);
    return newSheet;
}

/**
 * Saves one invite request to BOTH MongoDB and Excel.
 */
export const saveInviteRequest = async (data: InviteRequestData): Promise<void> => {
    
    // --- Task 1: Save to MongoDB ---
    const newInvite = new InviteRequest(data);
    const mongoPromise = newInvite.save();

    // --- Task 2: Save to Excel (no change) ---
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
            data.organizationName, data.headDelegateName, data.emailId, data.contactNumber, data.delegationStrength
        ];
        
        worksheet.addRow(rowData);
        await workbook.xlsx.writeFile(FILE_PATH);
    })();

    // --- Run both tasks in parallel (no change) ---
    try {
        await Promise.all([mongoPromise, excelPromise]);
        console.log('Successfully saved invite request to MongoDB and Excel');
    } catch (error) {
        console.error('Error saving invite request to one or more services: ', error);
        throw new Error('Failed to save invite request to one or more destinations.');
    }
};
