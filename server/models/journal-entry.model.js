import mongoose from 'mongoose';

const JOURNAL_CATEGORIES = ['Coffee', 'Books', 'Songs', 'Tiny Treats', 'Moments'];

const JournalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  details: {
    type: String,
    trim: true,
    default: '',
    maxlength: 1000,
  },
  note: {
    type: String,
    trim: true,
    default: '',
    maxlength: 5000,
  },
  catName: {
    type: String,
    required: true,
    enum: JOURNAL_CATEGORIES,
  },
  genericDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

JournalEntrySchema.index({ user: 1, genericDate: -1 });

const JournalEntry = mongoose.models.JournalEntry
  || mongoose.model('JournalEntry', JournalEntrySchema);

export default JournalEntry;
