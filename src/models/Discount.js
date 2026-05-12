import mongoose from 'mongoose';

const DiscountSchema = new mongoose.Schema({
    conference: { type: String, default: 'polymat', index: true }, // 'polymat' | 'foodagri'
    coupon: { type: String, required: true, uppercase: true, trim: true },
    category: { type: String, default: 'registration' }, // 'registration' | 'accommodation' | 'both'
    percentage: { type: Number, required: true, min: 1, max: 100 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Compound index so same coupon can exist for different conferences
DiscountSchema.index({ conference: 1, coupon: 1 }, { unique: true });

export default mongoose.models.Discount || mongoose.model('Discount', DiscountSchema);
