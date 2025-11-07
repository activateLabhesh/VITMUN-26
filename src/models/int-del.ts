import { Schema, model, Document, models } from 'mongoose';

const internalDelegateSchema = new Schema({
  // Inferred core fields (highly likely to exist)
  participant_name: { type: String, required: true },
  email_id: { type: String, required: true },
  registration_number: { type: String, required: true, unique: true },
  contact_number: { type: String },

  // Allotment fields (from admin/update-delegate)
  allotment_committee: { type: String, default: null },
  allotment_portfolio: { type: String, default: null },
  
  // Status fields
  paid: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false }, // From admin/update-lunch
}, {
  timestamps: true,
  // This makes Mongoose more flexible if you have other fields
  // not defined in this schema.
  strict: false 
});

const InternalDelegate = models.InternalDelegate || model('InternalDelegate', internalDelegateSchema, 'internal');

export default InternalDelegate;