import request from 'supertest';
import app from '../app.js';

describe('GET /ping', () => {
  test('should return { ok: true }', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});