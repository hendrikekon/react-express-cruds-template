import React, {useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import './index.scss';

const Detail = () => {
  const {id} = useParams();
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3000/api/v2/product/${id}`)
    .then((result) => {
      setDataProduct(result.data)
    }).catch((err) => {
      console.error(err)
    });
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{dataProduct._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{dataProduct.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{dataProduct.price}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{dataProduct.status ? 'Available' : 'Unavailable'}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{dataProduct.stock}</td>
          </tr>
          <tr>
            <td>image_url</td>
            <td>{dataProduct.image_url}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;