import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import request from 'supertest';

process.env.JWT_SECRET = 'recipe-test-secret';

const createdRecipe = {
  _id: 'recipe-1',
  user: 'user-1',
  name: 'Morning coffee',
  category: 'Hot',
  ingredients: 'Coffee, water',
  notes: 'Keep it simple.',
  rating: 5,
};

const Recipe = { create: jest.fn(), find: jest.fn(), findOneAndDelete: jest.fn() };
jest.unstable_mockModule('../models/recipe.model.js', () => ({ default: Recipe }));

const { default: app } = await import('../app.js');
const authHeader = () => `Bearer ${jwt.sign({ id: 'user-1' }, process.env.JWT_SECRET)}`;

test('creates an authenticated recipe through the API', async () => {
  Recipe.create.mockResolvedValue(createdRecipe);

  const response = await request(app)
    .post('/api/recipes')
    .set('Authorization', authHeader())
    .send(createdRecipe);

  expect(response.status).toBe(201);
  expect(response.body.recipe).toEqual(createdRecipe);
  expect(Recipe.create).toHaveBeenCalledWith(expect.objectContaining({ user: 'user-1' }));
});
