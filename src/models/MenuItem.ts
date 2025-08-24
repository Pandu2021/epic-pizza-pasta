import mongoose, { Schema, models, Document, Model } from 'mongoose';

// Interface untuk ukuran (misal: Small, Medium, Large)
interface ISize {
  name: string;
  price: number;
}

// Interface untuk mendefinisikan tipe data dokumen MenuItem
export interface IMenuItem extends Document {
  name: string;
  description: string;
  image: string;
  category: 'pizza' | 'pasta' | 'appetizer' | 'dessert' | 'drink';
  basePrice: number;
  sizes?: ISize[];
}

// Skema untuk Ukuran
const SizeSchema = new Schema<ISize>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Skema untuk MenuItem
const MenuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['pizza', 'pasta', 'appetizer', 'dessert', 'drink'], required: true },
  basePrice: { type: Number, required: true },
  sizes: { type: [SizeSchema], required: false }, // Ukuran bersifat opsional
}, { timestamps: true });

// Cek apakah model MenuItem sudah ada, jika belum, buat model baru
const MenuItem: Model<IMenuItem> = models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
