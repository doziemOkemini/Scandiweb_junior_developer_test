import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import DataContext from '../../Context/DataContext'
import ProductCard from '../PDP/ProductCard';
import './CartMondal.css'

export default class CartMondal extends Component {
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
      const {cart, currency,totalInCart} = this.context;
      const {show} = this.props;
      if(show === false){
          return null
      } else{
          return(
            <div className='overlay'>
                <div className='mondal'>
                    <div className='cart-modal'>
                        <h4>My Bag {cart.length} item</h4>
                        {cart.length === 0 && <h4>Cart is Empty</h4> }

                        {
                            cart.length >= 1 && 
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

                        <div className='checkout'>
                            <div className='checkout-price'><p>Total:</p> <span>{totalInCart.toFixed(2)}</span> </div>
                            <div className='modal-button'>
                               <button id='view-bag'><Link to={'/cart'} style={{textDecoration: 'none', color: '#1D1F22'}}>VIEW BAG</Link> </button>
                                <button>CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              
          )
      }
  }
}

CartMondal.contextType= DataContext