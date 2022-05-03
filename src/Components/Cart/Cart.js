import React from 'react'
import DataContext from '../../Context/DataContext'
import ProductCard from '../PDP/ProductCard';
import './Cart.css'

class Cart extends React.Component {
 
  onAdd = (product, price) => {
    this.context.onAdd(price)
    product.qty = product.qty + 1;
  }

  onRemove = (product,price) => {
    if(product.qty === 1){
      return product
    }
    this.context.onRemove(price)
    product.qty = product.qty - 1;
  }

  render() {
    const {cart, currency, cartQty,  totalInCart} = this.context;
    const tax = 15.00;

    return (
      <div className='cart-section'>
          <h1 className='cart-header'>CART</h1>
        <div className='cart-items'>
          {
            cart.map(item => {
              const currentCurrency = item.prices.filter(price => price.currency.label === currency);
              return(
                <div className='item-list' key={item.id}>  

                  <div className='item-left'>
                    <h3>{item.brand}</h3>
                    <p>{item.name}</p>
                    <p className='price'> {currentCurrency[0].currency.symbol}{currentCurrency[0].amount}</p>
                    <div id='attributes'>
                      {
                        item && <ProductCard attributes={item.attributes}/>
                      }
                    </div>
                  </div>

                  <div className='item-right'>
                    <div className='counter'>
                       <button onClick={() => this.onAdd(item, currentCurrency[0].amount)}>  + </button>
                       <p> {item.qty} </p>
                       <button onClick={() => this.onRemove(item, currentCurrency[0].amount)} > - </button>
                    </div>
                    <img  src={item.gallery[0]} alt={item.id}/>
                  </div>

                </div>
              )
            })
          }
        </div>

        <div className='checkout'>
          <p>Tax: <span>${tax}</span></p> 
          <p>Qty: <span>{cartQty}</span> </p>
          <p>Total: <span>{totalInCart.toFixed(2)}</span> </p>
          <button className='checkout-button'>Order</button>
        </div>
          
      </div>
    )
  }
}


Cart.contextType= DataContext
export default Cart