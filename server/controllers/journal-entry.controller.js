import JournalEntry from '../models/journal-entry.model.js';

const journalEntryController = {};

journalEntryController.create = async (req, res) => {
  try {
    const { name, details = '', note = '', catName, genericDate } = req.body;

    if (!name?.trim() || !catName) {
      return res.status(400).json({ message: 'Name and category are required' });
    }

    const entry = await JournalEntry.create({
      user: req.user.id,
      name: name.trim(),
      details,
      note,
      catName,
      ...(genericDate ? { genericDate } : {}),
    });

    return res.status(201).json({ entry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Could not create journal entry' });
  }
};

journalEntryController.list = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id })
      .sort({ genericDate: -1, createdAt: -1 });

    return res.json({ entries });
  } catch {
    return res.status(500).json({ message: 'Could not load journal entries' });
  }
};

journalEntryController.remove = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    return res.status(204).send();
  } catch {
    return res.status(400).json({ message: 'Invalid journal entry id' });
  }
};

export default journalEntryController;
