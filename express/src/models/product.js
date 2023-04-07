import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import Category from "./category";

const plugins = [mongoosePaginate, mongooseDelete];

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        images: [{
            url: {
                type: String,
                required: true
            },
            alt: {
                type: String
            }
        }],
        description: {
            type: String
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
        deleteAt: {
            type: Date,
            default: null
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, versionKey: false }
);

plugins.forEach((plugin) => {
    productSchema.plugin(plugin);
});

export default mongoose.model("Product", productSchema);