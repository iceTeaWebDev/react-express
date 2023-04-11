import Category from "../models/category";
import { categorySchema } from "../schemas/category";
import Product from "../models/product";
export const getAll = async (req, res) => {
    const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc", _embed } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { [_sort]: _order === "desc" ? -1 : 1 },
    };
    const populateOptions = _embed ? [{ path: "categories", select: "name" }] : [];
    try {
        const result = await Category.paginate(
            {},
            { ...options, populate: populateOptions }
        );
        if (result.docs.length === 0) {
            return res.status(404).json({
                message: "No products found in this category",
            });
        }
        if (_embed) {
            return res.json({
                data: {
                    products: result.docs,
                },
                pagination: {
                    currentPage: result.page,
                    totalPages: result.totalPages,
                    totalItems: result.totalDocs,
                },
            });
        } else {
            return res.status(200).json({
                data: result.docs,
                pagination: {
                    currentPage: result.page,
                    totalPages: result.totalPages,
                    totalItems: result.totalDocs,
                },
            });
        }
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}
export const get = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = req.query._embed ? await Category.findOne({ _id: categoryId }).populate({path: 'products'}) : await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        return res.status(200).json({message: "abc", data: category});
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const add = async (req, res) => {
    try {
        // validate
        const body = req.body;
        const { error } = categorySchema.validate(body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            })
        }

        // check category exist
        const categoryExist = await Category.findOne({ name: body.name });
        if (categoryExist) {
            return res.status(400).json({
                message: "Danh mục đã tồn tại"
            })
        }

        // add category
        const category = new Category(body);
        const result = await Product.updateMany({ _id: { $in: category.products } }, { $push: { categories: category._id } });
        const newCategory = await category.save();
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            newCategory
        })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id })
        return res.status(200).json({ message: "Xóa danh mục thành công", data: category });
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}