import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Select, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { getAllCategory } from '../../../api/category';
import { createProduct, getOneProduct, updateProduct } from '../../../api/product';
import { useNavigate, useParams } from 'react-router-dom';
interface FormData {
  name: string;
  price: number;
  description: string;
  categories: string[];
  images: RcFile[];
}
interface Category {
  _id: string;
  name: string;
  description: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
const { Option } = Select;
const UpdateProductForm = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategoties] = useState<Category[]>([]);
  useEffect(() => {
    getAllCategory().then(res => setCategoties(res.data))
  }, [])
  useEffect(() => {
    getOneProduct(id).then(res => {
      form.setFieldsValue({ name: res.data.name, price: res.data.price, description: res.data.description, categories: res.data.categories.map((c: any) => c._id) })
    });
  }, [form, id])
  const onFinish = (data: FormData) => {
    setLoading(true);
    updateProduct({ ...data, images: data.images?.map((item: any) => item.originFileObj) }, id).then(res => navigate('/admin/products'))
    setLoading(false);
  };

  const handleUploadChange = (info: any) => {
    console.log(info);
  };
  const handleUploadCustomRequest = ({ file, onSuccess, onError }: any) => {
    // Do something with the file
    console.log(file);
    // Call onSuccess or onError depending on the outcome of the file upload
    onSuccess();
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name of the product' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price of the product' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description of the product' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="categories" label="Categories" rules={[{ required: true, message: 'Please select at least one category' }]}>
        <Select mode="multiple">
          {categories.map((item, index) => (
            <Option value={item._id} key={index}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="images" label="Images" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
        <Upload customRequest={handleUploadCustomRequest} onChange={handleUploadChange} multiple>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductForm;
