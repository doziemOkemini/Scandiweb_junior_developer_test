import React from 'react'
import DataContext from '../../Context/DataContext'
import Slider from '../ImageSlider/Slider';
import ProductCard from '../PDP/ProductCard';
import './Cart.css'

class Cart extends React.Component {
  
  //Incrementing item count before passing item data to cart
  onAdd = (product, price) => {
    this.context.onAdd(price)
    product.qty = product.qty + 1;
  }

  //decreasing item count before passing item data to cart
  onRemove = (product,price) => {
    if(product.qty === 1){ //Item count should not be 0 or negative
      return product
    }
    this.context.onRemove(price)
    product.qty = product.qty - 1;
  }

  render() {
    //Destructing props and declaring variables 
    const {cart, currency, cartQty,  totalInCart} = this.context;
    const tax = 15.00; 

    return (
      <div className='cart-section'>
          <h1 className='cart-header'>CART</h1>
        <div className='cart-items'>
          {
            //mapping cart Items
            cart.map(item => {
              const currentCurrency = item.prices.filter(price => price.currency.label === currency);
              return(
                <div className='item-list' key={item.id}>  

                  <div className='item-left'>
                    <h3>{item.brand}</h3>
                    <p>{item.name}</p>
                    <p className='price'> {currentCurrency[0].currency.symbol}{currentCurrency[0].amount}</p> {/* displaying item currency*/}
                    <div id='attributes'> {/* mapping out attributes */}
                      {
                        // passing attributes to productCard Compenent
                        item && <ProductCard attributes={item.attributes}/> 
                      }
                    </div>
                  </div>

                  <div className='item-right'>
                    <div className='counter'>
                      {/* button and event handler for increment and decrement of item count  */}
                       <button onClick={() => this.onAdd(item, currentCurrency[0].amount)}>  + </button>
                       <p> {item.qty} </p>
                       <button onClick={() => this.onRemove(item, currentCurrency[0].amount)} > - </button>
                    </div>
                    <div className='cart-slider'>
                      <Slider slides={item.gallery}/>
                    </div>
                    
                  </div>

                </div>
              )
            })
          }
        </div>

        {/* Check out details and design */}
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