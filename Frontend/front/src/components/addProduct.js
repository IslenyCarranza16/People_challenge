import React, { useState, useEffect } from 'react';
const Add = () => {
const [name, setname] = useState('');
const [price, setprice] = useState('');
const [products, setproducts] = useState([])
// ...
const addPosts = async (name, price) => {
   await fetch('http://localhost:3100/api/v1/products', {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random().toString(36).slice(2),
        name: name,
        price: price,
        image: "https://picsum.photos/seed/oxL8zxH/640/480"
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         setproducts((product) => [data, ...product]);
         setname('');
         setprice('');
      })
      .catch((err) => {
         console.log(err.message);
      });
};

const handleSubmit = (e) => {
   e.preventDefault();
   addPosts(name, price);
};    

return (
   <div className="app">
      <div className="add-post-container">
         <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={name}
               onChange={(e) => setname(e.target.value)}
            />
              <input type="text" className="form-control" value={price}
               onChange={(e) => setprice(e.target.value)}
            />
           
            <button type="submit">Add Post</button>
         </form>
      </div>
      {/* ... */}
   </div>
);
};

export default Add;