import { useState } from "react";
import {
  ProductTitle,
  ProductImage,
  ProductButtons,
  ProductCard,
} from "../components";
import { Product } from '../interfaces/index';
import "../styles/custom-styles.css";

const products: Product[] = [
  {
    id: "0001",
    title: "Coffee Mug",
    img: "./coffee-mug.png",
  },
  {
    id: "0002",
    title: "Coffee Mug Meme",
    img: "./coffee-mug2.png",
  }
]; 

interface ProductInCart extends Product {
    count: number
}

export const ShoppingPage = () => {

  const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({
    // '1':  { ...products[0], count: 9 },
  });

  const onProductCountChange = ({ count, product }:{ count:number, product: Product } ) => {
    
    setShoppingCart((prevShoppingCart) => {

      if(count<=0) {

        const { [product.id]: itemToDelete, ...rest } = prevShoppingCart;  
        // console.log({itemToDelete})
        return rest;
      }

      return {
        ...prevShoppingCart,
        [product.id] : { ...product, count }
    }
  });
}

  return (
    <div>
      <h1 style={{marginBottom:25}}>Shopping Store</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {products.map((product) => (

          <ProductCard 
              key={product.id}
              product={product} 
              className="bg-dark"
              onChange = { onProductCountChange } 
            >
            <ProductImage 
              className="custom-img" 
              style={{ boxShadow:' 10px 10px 10px rgba(0,0,0, .2)' }} />
            <ProductTitle className="text-white font-bold" />
            <ProductButtons className="custom-buttons text-white font-bold" />
          </ProductCard>

))}
        
      </div>
      <div className='shopping-cart'>
          {
          // Object.values(shoppingCart).map( (product) => (
          Object.entries(shoppingCart).map( ( [key, product]) => (
          <ProductCard
            key={key}
            className="bg-dark"
            product={ product }
            style={{ width:'100px' }}
          >
            <ProductImage 
              className="custom-img" 
              style={{ boxShadow:' 10px 10px 10px rgba(0, 0, 0, .2)' }} />
            <ProductButtons className="custom-buttons text-white font-bold" />
          </ProductCard>
          ))
        }
      </div>

      <div>
          <code>
            {JSON.stringify(shoppingCart, null, 2)}
          </code>
      </div>


    </div>
  );
};
