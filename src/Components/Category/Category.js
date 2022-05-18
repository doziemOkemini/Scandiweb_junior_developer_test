import React from 'react';
import './Category.css';
import Card from '../Card/Card';
import WithQuery from '../../Queries/GetCategories';
import DataContext from '../../Context/DataContext';

class Category extends React.Component {

    render() { 
        //Destructing the variables passed from props and global props from dataContext
        const {query} = this.props;
        const {title, currency} = this.context;
        const titleLowerCase = title.toLowerCase();
        let currentCurrency = ''; //Intializing the currency filter variable
        console.log(query)

        return (
            <>
                <div className='category-page'> 
                    <h1 className='category-title'>{title.toUpperCase()}</h1>
                    <div className='category-list'>
                        {/* mapping the list of items on sale  */}
                        {query && query.categories.filter( category => category.name === titleLowerCase).map( items => { //using filter to map items filter by categoreis
                            return(
                                <div key={items.name} className='category-list-items'>
                                    {items.products.map( item => { //mapping items in each category or filtered category
                                        
                                        currentCurrency = item.prices.filter(price => price.currency.label === currency); //obtaining the value for the currency switcher
                                        return(
                                            //passing the data of each category item to display
                                            <Card name={item.name} inStock={item.inStock}  photoGallery={item.gallery} photo={item.gallery[0]} description={item.description} 
                                                amount={currentCurrency[0].amount} key={item.name} id={item.id} symbol={currentCurrency[0].currency.symbol} brand={item.brand} item={item}/>
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

//receving DataContext Props
Category.contextType = DataContext;

//Parsing Category Component with GetComponent HOC
export default WithQuery(Category);