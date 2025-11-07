import { Schema, model, Document, models } from 'mongoose';

// --- Sub-Schemas (from api/collection route) ---
const CommitteePreferenceSchema = new Schema({
  preference_1: { type: String, default: null },
  preference_2: { type: String, default: null },
  preference_3: { type: String, default: null },
}, { _id: false });

const ExperienceEntrySchema = new Schema({
  muns: { type: Number, default: 0 },
  experience: { type: String, default: "" },
}, { _id: false });

const ExperienceSchema = new Schema({
  delegate: { type: ExperienceEntrySchema, default: () => ({}) },
  eb: { type: ExperienceEntrySchema, default: () => ({}) },
}, { _id: false });

// --- Main Schema ---
const externalDelegateSchema = new Schema({
  // Core fields (from admin/ext-del)
  participant_name: { type: String, required: true },
  email_id: { type: String, required: true },
  contact_number: { type: String, required: true },
  
  // Allotment fields (from admin/update-delegate & admin/ext-del)
  allotment_committee: { type: String, default: null },
  allotment_portfolio: { type: String, default: null },
  
  // Status fields
  paid: { type: Boolean, default: false }, // Defaulted from update-delegate
  lunch: { type: Boolean, default: false }, // From admin/update-lunch

  // Optional fields (from api/collection POST)
  gender: { type: String, default: null },
  organisation_name: { type: String, default: null },
  accommodation: { type: String, default: null },
  committee_preferences: { type: CommitteePreferenceSchema, default: null },
  experience: { type: ExperienceSchema, default: null },
  
  // Optional field (from admin/ext-del POST)
  registration_number: { type: String, default: null },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// This line prevents Mongoose from recompiling the model if it already exists
const ExternalDelegate = models.ExternalDelegate || model('ExternalDelegate', externalDelegateSchema, 'external');

export default ExternalDelegate;