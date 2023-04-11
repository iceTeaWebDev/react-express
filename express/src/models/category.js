import mongoose from "mongoose";
import Product from "./product";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }]
    },
    { timestamps: true, versionKey: false }
);

categorySchema.pre("findOneAndDelete", async function (next) {
    try {
        const products = await Product.find({
            categories: this._conditions._id
        });
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            product.categories.pull(this._conditions._id);
            await product.save();
        }
        return next();
    } catch (error) {
        next(error)
    }
})

plugins.forEach((plugin) => {
    categorySchema.plugin(plugin);
});

export default mongoose.model("Category", categorySchema);