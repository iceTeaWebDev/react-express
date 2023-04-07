import { productSchema } from "../schemas/product";
import Product from "../models/product";
import Category from "../models/category";
import cloudinary from "../config/cloudinary";

export const get = async (req, res) => {
    const { _page = 1, _limit = 10, _sort = "createAt", _order = "asc", _embed } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { [_sort]: _order === "desc" ? -1 : 1 }
    }
    const populateOptions = _embed ? [{ path: "categories", select: "name" }] : [];

    try {
        if (req.params.id) {
            const product = populateOptions.length !== 0 ? await Product.findById(req.params.id).populate({ path: "categories", select: "name" }) : await Product.findById(req.params.id);
            if (!product) throw new Error("Product not found!");
            return res.status(200).json({ data: product });
        }

        const result = await Product.paginate({}, { ...options, populate: populateOptions })

        if (result.docs.length === 0) throw new Error("No products found!");

        return res.status(200).json({
            data: result.docs,
            pagination: {
                currentPage: result.page,
                totalPages: result.totalPages,
                totalItems: result.totalDocs
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const add = async (req, res) => {
    try {
        const { name, price, description, categories } = req.body;

        const body = {
            name,
            price,
            images: req.files.map(item => { return { url: item.path, alt: item.originalname } }),
            description,
            categories: JSON.parse(categories)
        }

        // validate
        const { error } = productSchema.validate(body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }

        // // create product
        const product = new Product(body);

        const updateCategories = await Category.updateMany({_id: {$in: body.categories}}, {$push: {products: product._id}});

        if(!updateCategories) {
            return res.status(400).json({
                message: "Update categories thất bại"
            })
        }

        const newProduct = await product.save();

        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            newProduct
        })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

export const update = async (req, res) => {
    try {

        const id = req.params.id;
        const { name, price, description, categories } = req.body;
        let body;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        if (req.files.length !== 0) {
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.uploader.destroy(product.images[i]._id);
            }
            body = {
                name,
                price,
                images: req.files.map(item => { return { url: item.path, alt: item.originalname } }),
                description,
                categories: JSON.parse(categories)
            }
        } else {
            body = {
                name,
                price,
                images: product.images.map(item => { return { url: item.url, alt: item.alt } }),
                description,
                categories: JSON.parse(categories)
            }
        }

        const { error } = productSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({ errors });
        }
        const removeCategories = await Category.updateMany({_id: {$in: product.categories}}, {$pull: {products: product._id}});
        const updateCategories = await Category.updateMany({_id: {$in: body.categories}}, {$push: {products: product._id}});
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const { isHardDelete } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }

        if(isHardDelete === "true") {
            const categories = Category.find({
                products: id
            });
            for(let i = 0; i < categories.length; i++) {
                const category = categories[i];
                category.products.pull(id);
                await category.save();
            }
            await product.forceDelete();
        } else {
            await product.delete();
        }

        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
}

export const restore = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        if (!product.deleted) {
            return res.status(400).json({
                message: "Sản phẩm chưa bị xóa mềm"
            })
        }

        product.deleted = false;
        product.deleteAt = null;

        const restoredProduct = await product.save();
        return res.status(200).json({
            message: "Phục hồi sản phẩm thành công",
            data: restoredProduct
        })
    } catch (error) {
        res.status(400).json({
            message: "Phục hồi sản phẩm không thành công",
        });
    }
}

