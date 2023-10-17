
import React, {useEffect, useState} from 'react';

import './App.css';

function App() {

  const [products, setproducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3100/api/v1/products')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setproducts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
 
 const deleteProduct = async (id) => {
  await fetch(`http://localhost:3100/api/v1/products/${id}`, {
     method: 'DELETE',
  }).then((response) => {
     if (response.status === 200) {
        setproducts(
           products.filter((product) => {
              return product.id !== id;
           })
        );
     } else {
        return;
     }
  })}


  return (
    <div className="posts-container">
      {products.map((product) => {
         return (
            <div className="product-id" key={product.id}>
               <h2 className="product-title">{product.name}</h2>
               <p className="product-price">{product.price}</p>
               <img className="product_img"
                      src={`${product.image}`}
                      alt="img-"/>
               <div className="button">
               <div className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</div>
               </div>
            </div>
         );
      })}
   </div>
  );
}
export default App;
