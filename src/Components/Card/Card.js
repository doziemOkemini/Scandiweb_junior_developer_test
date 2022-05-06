import React from "react";
import './Card.css';
import { Link  } from 'react-router-dom';
import DataContext from "../../Context/DataContext";

export default class Card extends React.Component {
  render() {
    return ( //display Each category Item
            <div className="card-item" >
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
                    <Link to={`/product/${this.props.id}`} style={{ textDecoration: 'none' }}>
                        <p>{this.props.name}</p>
                        <p className="card-price">{this.props.symbol} {this.props.amount}</p>
                    </Link>
                </div>
            </div>
    )
  }
}

Card.contextType = DataContext