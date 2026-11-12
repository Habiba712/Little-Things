import mongoose from 'mongoose';

const RECIPE_CATEGORIES = ['Hot', 'Iced', 'Tea', 'Favorite', 'Experimental', 'Never Again'];

const RecipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true, enum: RECIPE_CATEGORIES },
  ingredients: { type: String, trim: true, default: '', maxlength: 3000 },
  notes: { type: String, trim: true, default: '', maxlength: 5000 },
  rating: { type: Number, min: 1, max: 5, default: 1 },
}, { timestamps: true });

RecipeSchema.index({ user: 1, createdAt: -1 });

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe;
