import { Schema, model } from 'mongoose';
import { InviteRequestData } from '../allotments/delegation';

const inviteRequestSchema = new Schema<InviteRequestData>({
    organizationName: { type: String, required: true },
    headDelegateName: { type: String, required: true },
    emailId: { type: String, required: true },
    contactNumber: { type: String, required: true },
    delegationStrength: { type: String, required: true },
}, {
    timestamps: true
});

const InviteRequest = model<InviteRequestData>('InviteRequest', inviteRequestSchema);
export default InviteRequest;
