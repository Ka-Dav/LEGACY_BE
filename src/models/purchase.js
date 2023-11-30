import mongoose, { Schema } from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  drug: { type: mongoose.SchemaTypes.ObjectId, ref: 'Drug' },
});

const purchaseModel = mongoose.model('Purchase', purchaseSchema);

export default purchaseModel;
