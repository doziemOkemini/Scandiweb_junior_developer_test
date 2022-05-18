import React from 'react'
import { WithParams } from '../../Queries/WithParams';
import './ProductDP.css'
import DataContext from '../../Context/DataContext';
import { Interweave } from 'interweave';
import ProductCard from './ProductCard';


class ProductDP extends React.Component {

  //function to passing item data to cart
  handleClick = (data) => {
    this.context.setItems(data);
  }
    
  render() {
    //destructing and declaring data
    const { id, data } = this.props;
    let product = '';
    let price = '';

    //checking data and filtering data for single item with Params
    if(data) {
      product = data.category.products.filter(item => item.id === id)
      price = product[0].prices.filter(value => value.currency.label === this.context.currency)
    }
    
    return (
      <div className='page-product'>
          <h1 className='heading'>Product page</h1>
          <div className='product-design-page'>
              <div className='image-gallery'>
                 { 
                    product &&  
                     <div className='gallery'>
                       {/* mapping image section */}
                       {
                         product[0].gallery.length <= 1 ? //Defining gallery length

                         <div className='main-gallery'>
                            <img src={product[0].gallery[0]} alt={product[0].id} className='image-item' id='main-image-alone' /> 
                         </div> :

                         <>
                          <div className='side-show'>
                            <img src={product[0].gallery[1]} alt={product[0].id}className='image-item'/>
                            <img src={product[0].gallery[2]} alt={product[0].id} className='image-item'/>
                            <img src={product[0].gallery[3]} alt={product[0].id} className='image-item'/>
                          </div>
                       
                          <div className='main-gallery'>
                            <img src={product[0].gallery[0]} alt={product[0].id} className='image-item' id='main-image' /> 
                          </div>
                        </>
                         
                       }

                     </div>
                    
                 }
              </div>   
              <div className='product-description'>
                    {
                      product && 
                      <div className='product-details'>
                        <h1>{product[0].brand}</h1>
                        <h2>{product[0].name}</h2> 
            
                        { 
                        // passing attributes to productCard Compenent
                          product[0].attributes && <ProductCard  attributes={product[0].attributes} /> 
                        }

                        <h3>PRICE:</h3>
                        {/* listing price details */}
                        <p className='price'>{price[0].currency.symbol}{price[0].amount}</p>
                        {/* button is item inStock?*/}
                        {product[0].inStock ? <button onClick={() => this.handleClick(product[0])} className='cart-button'> ADD TO CART</button> : <button className='cart-button'> OUT OF STOCK </button>}
                        <div className='description' >
                          <Interweave content={product[0].description} />
                        </div>
                      </div>
                    }
                
              </div>
          </div>

      </div>
    )
  }
}

ProductDP.contextType = DataContext;

export default WithParams(ProductDP);
