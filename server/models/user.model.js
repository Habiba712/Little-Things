import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const BaseUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  avatar: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  storageUsed: {
    type: String,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const SecuritySchema = new mongoose.Schema({
  resetToken: String,
  resetTokenExpiry: Date,
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  base: {
    type: BaseUserSchema,
    required: true,
  },
  security: {
    type: SecuritySchema,
    default: () => ({}),
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('base.password')) {
    return;
  }

  const isBcryptHash = /^\$2[aby]\$\d{2}\$.{53}$/.test(this.base.password);
  if (!isBcryptHash) {
    this.base.password = await bcrypt.hash(this.base.password, 10);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.base.password);
};

UserSchema.methods.activate = async function () {
  this.base.enabled = true;
  return this.save();
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
