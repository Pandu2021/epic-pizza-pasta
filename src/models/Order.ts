import mongoose, { Schema, models, Document, Model, Types } from 'mongoose';

// Interface untuk satu item di dalam pesanan
interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
  menuItemId: Types.ObjectId; // Referensi ke MenuItem
}

// Interface untuk alamat pengiriman
interface IShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// Interface untuk dokumen Order
export interface IOrder extends Document {
  user: Types.ObjectId; // Referensi ke model User
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  menuItemId: { type: Schema.Types.ObjectId, required: true, ref: 'MenuItem' },
});

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [OrderItemSchema],
  // --- PERBAIKAN DI SINI ---
  // Mendefinisikan skema alamat langsung di sini untuk memastikan validasi yang benar
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
}, { timestamps: true });

const Order: Model<IOrder> = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
