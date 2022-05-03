import React from "react";
const DataContext = React.createContext();

export class DataProvider extends React.Component{
    state = {
        title: "ALL",
        currency: "USD",
        mondalIsClicked: false,
        cart: [],
        cartQty: 0,
        tax: 15.00,
        totalInCart: 0
    }

    
  handleClick = (data) => {
    this.setState({
      title: data
    })
  }

  handleChangeDefault = () =>{
    this.setState({
      title: 'ALL'
    })
  }

  handleChange = (value) =>{
      this.setState({
          currency: value
      })
  }

  showMondal = () =>{
    this.setState({
      mondalIsClicked: !this.state.mondalIsClicked
    })
  }
 
  setItems = (data) => {
    const currentCurrency = data.prices.filter(price => price.currency.label === this.state.currency);
    const exist = this.state.cart.find( item => item.id === data.id);
    if (exist){
      return
    } else {
      this.setState({
        cart: [...this.state.cart, {...data, qty: 1}],
        cartQty: this.state.cartQty + 1,
        totalInCart: this.state.totalInCart + currentCurrency[0].amount + this.state.tax
      })
    }
  }

  onAdd = (price) =>{
   this.setState({
     totalInCart: this.state.totalInCart + price
   })
  }

  onRemove = (price) => {  
    this.setState({
      totalInCart: this.state.totalInCart - price
    })

  }

 

  render(){
      const {title, currency, cart, mondalIsClicked,  totalInCart, cartQty} = this.state;
      const {handleClick, handleChange, setItems, showMondal, onAdd, onRemove, handleChangeDefault} = this;
      return(
               <DataContext.Provider value={{
                    title, currency, cart, mondalIsClicked,  totalInCart, cartQty, onAdd,
                    handleClick, handleChange, setItems, showMondal, onRemove, handleChangeDefault
                }}> 
                    {this.props.children}
               </DataContext.Provider>
         
      )
  }
}

export default DataContext;