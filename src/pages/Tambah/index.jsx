import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: false,
    image_url: ''
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!dataProduct.name) {
      newErrors.name = 'Nama produk tidak boleh kosong';
    }
    if (dataProduct.price <= 1000) {
      newErrors.price = 'Harga produk harus lebih dari 1000';
    }
    if (dataProduct.stock < 0) {
      newErrors.stock = 'Stock produk tidak boleh kurang dari 0';
    }
    return newErrors;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    const formData = new FormData();
    formData.append('name', dataProduct.name);
    formData.append('price', dataProduct.price);
    formData.append('stock', dataProduct.stock);
    formData.append('status', dataProduct.status);
    if (image) {
      formData.append('image', image);
    }
  
    Axios.post(`http://localhost:3000/api/v2/product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Product Added:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error Adding product:', error);
      });
  };

  const handleChange = (e) =>{
    const { name, value, type, checked } = e.target;
    setDataProduct((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={dataProduct.name} onChange={handleChange}/>
          {errors.name && <p className="error">{errors.name}</p>}
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={dataProduct.price} onChange={handleChange}/>
          {errors.price && <p className="error">{errors.price}</p>}
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={dataProduct.stock} onChange={handleChange}/>
          {errors.stock && <p className="error">{errors.stock}</p>}
          <Input name="status" type="checkbox" label="Active" checked={dataProduct.status} onChange={handleChange}/>
          
          <div className="form-group">
            <label htmlFor="image">Image</label>
            {dataProduct.image_url && (
              <div>
                <img src={dataProduct.image_url} alt={dataProduct.name} width="200" />
              </div>
            )}
            <input type="file" id="image" name="image" onChange={handleImageChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;