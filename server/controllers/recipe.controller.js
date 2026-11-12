import Recipe from '../models/recipe.model.js';

const recipeController = {};

recipeController.create = async (req, res) => {
  try {
    const { name, category, ingredients = '', notes = '', rating = 1 } = req.body;
    if (!name?.trim() || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }
    const recipe = await Recipe.create({
      user: req.user.id, name: name.trim(), category, ingredients, notes, rating,
    });
    return res.status(201).json({ recipe });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Could not create recipe' });
  }
};

recipeController.list = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json({ recipes });
  } catch {
    return res.status(500).json({ message: 'Could not load recipes' });
  }
};

recipeController.remove = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    return res.status(204).send();
  } catch {
    return res.status(400).json({ message: 'Invalid recipe id' });
  }
};

export default recipeController;
