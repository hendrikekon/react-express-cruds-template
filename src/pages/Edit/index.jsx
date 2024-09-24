import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Input from "../../components/Input";

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: false,
    image_url: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:3000/api/v1/product/${id}`)
    .then((result) => {
      setDataProduct(result.data)
    }).catch((err) => {
      console.error(err)
    });
  }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', dataProduct.name);
    formData.append('price', dataProduct.price);
    formData.append('stock', dataProduct.stock);
    formData.append('status', dataProduct.status);
    if (image) {
      formData.append('image', image);
    }
  
    Axios.patch(`http://localhost:3000/api/v1/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Product updated:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };



  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={dataProduct.name} onChange={handleChange}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={dataProduct.price} onChange={handleChange}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={dataProduct.stock} onChange={handleChange}/>
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

export default Edit;