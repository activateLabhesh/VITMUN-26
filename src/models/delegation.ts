import { Schema, model, Document, models } from 'mongoose';

// I'm using the schema fields from your invite_request.ts file
const delegationSchema = new Schema({
  organizationName: { type: String, required: true },
  headDelegateName: { type: String, required: true },
  emailId: { type: String, required: true },
  contactNumber: { type: String, required: true },
  delegationStrength: { type: String, required: true },
  
  // You may want to add fields here for tracking
  // assigned delegates, paid status, etc.
  // e.g., assigned_delegates: [{ type: Schema.Types.ObjectId, ref: 'ExternalDelegate' }]

}, {
  timestamps: true
});

// This line prevents recompilation AND
// explicitly maps this model to the 'delegation' collection
const Delegation = models.Delegation || model('Delegation', delegationSchema, 'delegation');

export default Delegation;