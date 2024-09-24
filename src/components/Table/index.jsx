// import React from 'react';
// import { Link } from 'react-router-dom';

// const Table = ({ columns, data = [] }) => {
//   const createHeader = () => {
//     const headerCells = columns.map((col, index) => <th key={index}>{col}</th>);
//     return <thead><tr>{headerCells}<th>Actions</th></tr></thead>;
//   };

//   const createBody = () => {
//     const rows = data.map((item) => (
//       <tr key={item._id}>
//         <td><img src={item.image_url} alt={item.name} style={{ width: '50px' }} /></td>
//         <td>{item.name}</td>
//         <td className="text-right">{item.price}</td>
//         <td className="text-center">{item.status ? 'Available' : 'Unavailable'}</td>
//         <td className="text-center">{item.stock}</td>
//         <td className="text-center">
//           <Link to="/detail" className="btn btn-sm btn-info">Detail</Link>
//           <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link>
//           <Link to="#" className="btn btn-sm btn-danger">Delete</Link>
//         </td>
//       </tr>
//     ));
//     return <tbody>{rows}</tbody>;
//   };

//   return (
//     <table className='table'>
//       {createHeader()}
//       {createBody()}
//     </table>
//   );
// };

// export default Table;