import './Header.css'
import React from 'react';
import DataContext from '../../Context/DataContext';
import { Link } from 'react-router-dom';
import CartMondal from '../Cart/CartMondal';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
        this.mondalToggle = this.mondalToggle.bind(this)
        this.handleHome= this.handleHome.bind(this)
    }

    handleChange(e){
        const newTitle = e.target.value;
        this.context.handleClick(newTitle);
    }

    handleChangeCurrency({target}){
        this.context.handleChange(target.value);
    }

    mondalToggle(){
        this.context.showMondal()
    }

    handleHome(){
        this.context.handleChangeDefault()
    }


    render() { 
        const {cart, mondalIsClicked} = this.context;

        return (
            <div className='header'>
                <div className='filter-links'>
                    <ul className='links'>
                        <li><button className='filter-link' onClick={this.handleChange} value='ALL'> All </button></li>
                        <li><button className='filter-link' onClick={this.handleChange} value='TECH'> TECH </button></li>
                        <li><button className='filter-link' onClick={this.handleChange} value='CLOTHES'> CLOTHES </button></li>
                    </ul>
                </div>

                <Link to={'/'}>
                    <div className='home-icon' onClick={this.handleHome}>
                        <svg width={28} height={28} fill="none" stroke="#3aa175" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <path d="M9 22V12h6v10" />
                        </svg>
                    </div>
               </Link>
                
                <div className='switcher-and-cart'>
                    <div className='switcher'>
                        <select  name="currency-switcher" id='currency-switcher' onChange={this.handleChangeCurrency} >
                            <option value={this.context.currency}>{this.context.currency}</option> 
                            <option value="USD">$ USD</option>
                            <option value="GBP">£ GBP</option>
                            <option value="JPY">¥ JPY</option>
                        </select>
                    </div>

                    <div className='cart-mondal'>
                        <div>
                            <button onClick={this.mondalToggle} className='cart-icon'>
                                <svg width={25} height={25} fill="none" stroke="#3aa175" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                                    <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                <div className='cart-items-counter'>
                                    { cart.length > 0 && <span className='cart-count'>{cart.length}</span> }
                                </div>
                            </button>
                        </div>
                        <div className='mondal-position'>
                            <CartMondal show={mondalIsClicked} />
                        </div>
                    </div>
                    
                    
                </div>
                
               
                
            </div>
        );
    }
}

Header.contextType = DataContext;

export default Header;