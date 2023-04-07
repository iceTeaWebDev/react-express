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

categorySchema.pre("save", async function (next) {
    const category = this;
    try {
        // Update all products that belong to the category with the new category ID
        const result = await Product.updateMany({ _id: { $in: category.products } }, { $push: { categories: category._id } });
        next();
    } catch (err) {
        next(err);
    }
})

plugins.forEach((plugin) => {
    categorySchema.plugin(plugin);
});

export default mongoose.model("Category", categorySchema);