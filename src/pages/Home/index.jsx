import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import fetchProduct from '../../connection/api'
import Axios from 'axios';
import './index.scss';

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [cari, setCari] = useState('');
  // const columns = ["Image", "Name", "Price", "Status", "Stock"];


  const getData = async () => {
    const products = await fetchProduct();
    setDataProduct(products);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      Axios.delete(`http://localhost:3000/api/v2/product/${id}`)
        .then((response) => {
          console.log('Product deleted:', response.data);
          getData();
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }}

    const handleSearch = (e) => {
      setCari(e.target.value);
    };

    const CariProducts = dataProduct.filter((product) =>
      product.name.toLowerCase().includes(cari.toLowerCase())
    );


  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input
         type="text" 
         placeholder="Masukan kata kunci..."
          id="search"
          className="form-control"
          value={cari}
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Status</th>
            <th className="text-center">Stock</th>
            <th className="text-center">image_url</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {CariProducts.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="text-right">{item.price}</td>
              <td className="text-center">{item.status ? 'Available' : 'Unavailable'}</td>
              <td className="text-center">{item.stock}</td>
              <td className="text-center">{item.image_url}</td>
              <td className="text-center">
                <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;