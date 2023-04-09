import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ProductFormValues {
  name: string;
  price: number;
  categories: string[];
  description: string;
  images: File | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  categories: Yup.array().required('At least one category is required'),
  description: Yup.string().required('Description is required'),
  images: Yup.mixed().required('Images are required'),
});

const categoriesOptions = [
  { label: 'Category 1', value: 'category1' },
  { label: 'Category 2', value: 'category2' },
  { label: 'Category 3', value: 'category3' },
  { label: 'Category 4', value: 'category4' },
];

const ProductForm: React.FC = () => {
  const initialValues: ProductFormValues = {
    name: '',
    price: 0,
    categories: [],
    description: '',
    images: null,
  };

  const handleSubmit = (values: ProductFormValues, { resetForm }: any) => {
    // handle form submission here
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="product-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" className="form-control" />
            <ErrorMessage name="name" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" id="price" className="form-control" />
            <ErrorMessage name="price" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <Field
              as="select"
              name="categories"
              id="categories"
              multiple
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const options = event.target.options;
                const values = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    values.push(options[i].value);
                  }
                }
                setFieldValue('categories', values);
              }}
              value={values.categories}
              className="form-control"
            >
              {categoriesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="categories" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" id="description" className="form-control" />
            <ErrorMessage name="description" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images</label>
            <Field name="images">
              {({ field, form }:any) => (
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files![0];
                    form.setFieldValue(field.name, file);
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="images" className="error-message" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
