import React from "react";
import './Card.css';
import { Link  } from 'react-router-dom';
import DataContext from "../../Context/DataContext";

export default class Card extends React.Component {

  handleClick = (data) => {
    let attributeItem = [];
    console.log(data)
    if(data.attributes){
      data.attributes.forEach(element => { //looping through each attribute type
        attributeItem.push({name: element.items[0].displayValue, id: element.id}) //pushing default value into prev Empty Array
      });
    }
    this.context.setItems(data, attributeItem);
  }
  

  render() {
    // console.log(this.props.item)
    return ( 
      //display Each category Item
            <div className="card-item" >
              <div id="add-to-cart">
                {this.props.inStock ? 
                      <button id="cart-button" onClick={() => this.handleClick(this.props.item)}>
                        <svg width={18} height={18} fill="none" stroke="#f9fafa" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                          <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                  : '' 
                }
              </div>
               
              <Link to={`/product/${this.props.id}`} className='card-details-link'>
                {
                  this.props.inStock ? //checking Is inStock value true
                    <img src={this.props.photo} alt={this.props.description}/>
                  :
                  <div className='Out-of-stock'>
                    <img src={this.props.photo} alt={this.props.description} />
                    <div className="centered-text"> OUT OF STOCK </div>
                  </div>
                  
                }

                  <div className="card-details"> 
                    <p>{this.props.brand} {this.props.name}</p>
                    <p className="card-price">{this.props.symbol} {this.props.amount}</p> 
                  </div>
              </Link>
            </div>
    )
  }
}

Card.contextType = DataContext