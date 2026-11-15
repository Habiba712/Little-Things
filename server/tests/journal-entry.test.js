import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import request from 'supertest';

process.env.JWT_SECRET = 'journal-entry-test-secret';

const createdEntry = {
  _id: 'entry-1',
  user: 'user-1',
  name: 'A quiet cup of coffee',
  details: 'Coffee',
  note: 'A small promise in the morning.',
  catName: 'Coffee',
  genericDate: '2026-11-12T08:30:00.000Z',
};

const JournalEntry = {
  create: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

jest.unstable_mockModule('../models/journal-entry.model.js', () => ({ default: JournalEntry }));

const { default: app } = await import('../app.js');

const authHeader = () => `Bearer ${jwt.sign({ id: 'user-1' }, process.env.JWT_SECRET)}`;

describe('journal entries API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates an authenticated journal entry from the example payload', async () => {
    JournalEntry.create.mockResolvedValue(createdEntry);

    const response = await request(app)
      .post('/api/journal-entries')
      .set('Authorization', authHeader())
      .send({
        name: createdEntry.name,
        details: createdEntry.details,
        note: createdEntry.note,
        catName: createdEntry.catName,
        genericDate: createdEntry.genericDate,
      });

    expect(response.status).toBe(201);
    expect(response.body.entry).toEqual(createdEntry);
    expect(JournalEntry.create).toHaveBeenCalledWith(expect.objectContaining({
      user: 'user-1',
      name: createdEntry.name,
      catName: 'Coffee',
    }));
  });

  test('rejects requests without a session token', async () => {
    const response = await request(app)
      .post('/api/journal-entries')
      .send({ name: createdEntry.name, catName: 'Coffee' });

    expect(response.status).toBe(401);
    expect(JournalEntry.create).not.toHaveBeenCalled();
  });

  test('updates an authenticated journal entry for its owner', async () => {
    const updatedEntry = { ...createdEntry, name: 'An updated cup of coffee' };
    JournalEntry.findOneAndUpdate.mockResolvedValue(updatedEntry);

    const response = await request(app)
      .patch('/api/journal-entries/entry-1')
      .set('Authorization', authHeader())
      .send({
        name: updatedEntry.name,
        details: updatedEntry.details,
        note: updatedEntry.note,
        catName: updatedEntry.catName,
      });

    expect(response.status).toBe(200);
    expect(response.body.entry).toEqual(updatedEntry);
    expect(JournalEntry.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'entry-1', user: 'user-1' },
      { $set: expect.objectContaining({ name: updatedEntry.name }) },
      { new: true, runValidators: true },
    );
  });

  test('deletes an authenticated journal entry for its owner', async () => {
    JournalEntry.findOneAndDelete.mockResolvedValue(createdEntry);

    const response = await request(app)
      .delete('/api/journal-entries/entry-1')
      .set('Authorization', authHeader());

    expect(response.status).toBe(204);
    expect(JournalEntry.findOneAndDelete).toHaveBeenCalledWith({
      _id: 'entry-1',
      user: 'user-1',
    });
  });
});
