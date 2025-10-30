import { Schema, model } from 'mongoose';
import { RegistrationData } from '../allotments/individual'; // We can still use the interface for type-safety

// Define the schema for the Committee Preference sub-document
const CommitteePreferenceSchema = new Schema({
    committee: { type: String, required: true },
    allotment1: { type: String, required: true },
    allotment2: { type: String, required: true },
    allotment3: { type: String, required: true },
}, { _id: false }); // _id: false because this is a sub-document

// Define the main registration schema
const registrationSchema = new Schema<RegistrationData>({
    participantName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    participantType: { type: String, required: true },
    committeePreference1: { type: CommitteePreferenceSchema, required: true },
    committeePreference2: { type: CommitteePreferenceSchema, required: true },
    committeePreference3: { type: CommitteePreferenceSchema, required: true },
    delegateExpCount: { type: String, required: true },
    delegateExpNames: { type: String, required: true },
    ebExpCount: { type: String, required: true },
    ebExpNames: { type: String, required: true },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the Mongoose model
const Registration = model<RegistrationData>('Registration', registrationSchema);
export default Registration;
