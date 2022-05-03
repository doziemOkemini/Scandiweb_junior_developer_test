import React from 'react';
import './Category.css';
import Card from '../Card/Card';
import WithQuery from './GetCategories';
import DataContext from '../../Context/DataContext';

class Category extends React.Component {

    render() { 
        const {query} = this.props;
        const {title, currency} = this.context;
        const titleLowerCase = title.toLowerCase();
        let currentCurrency = '';
        return (
            <>
                <div className='category-page'> 
                    <h1 className='category-title'>{title}</h1>
                    <div className='category-list'>
                        {query && query.categories.filter( category => category.name === titleLowerCase).map( items => {
                            return(
                                <div key={items.name} className='category-list-items'>
                                    {items.products.map( item => {
                                        
                                        currentCurrency = item.prices.filter(price => price.currency.label === currency);
                                        return(
                                            <Card name={item.name} inStock={item.inStock}  photoGallery={item.gallery} photo={item.gallery[0]} description={item.description} 
                                                amount={currentCurrency[0].amount} key={item.name} id={item.id} symbol={currentCurrency[0].currency.symbol}/>
                                        )
                                    })}
                                </div>
                                
                            )
                        }) 
                        }
                    </div>
                </div>
            </>
        );
    }
}

Category.contextType = DataContext;

export default WithQuery(Category);