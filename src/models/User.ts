import mongoose, { Schema, models, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface untuk mendefinisikan tipe data dokumen User
export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// Skema untuk User
const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true }); // timestamps akan otomatis membuat createdAt dan updatedAt

// Middleware (pre-hook) yang berjalan SEBELUM dokumen user disimpan
// Ini digunakan untuk mengenkripsi password
UserSchema.pre<IUser>('save', async function (next) {
  // Hanya jalankan fungsi ini jika password diubah (atau baru)
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    // Generate salt dan hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

// Method untuk membandingkan password yang dimasukkan saat login dengan hash di database
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Cek apakah model User sudah ada, jika belum, buat model baru
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
