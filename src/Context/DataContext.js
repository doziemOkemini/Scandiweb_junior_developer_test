import React from "react";
const DataContext = React.createContext();

export class DataProvider extends React.Component{
  //Declaring State in data Context Api
    state = {
        title: "ALL",
        currency: "USD",
        mondalIsClicked: false,
        cart: [],
        cartQty: 0,
        tax: 15.00,
        totalInCart: 0
    }

  
  //Declaring and Initializing state Functions 
  handleClick = (data) => {
    //handling section filter variable in state
    this.setState({
      title: data
    })
  }

  handleChangeDefault = () =>{
    //Setting Default filter value
    this.setState({
      title: 'ALL'
    })
  }

  handleChange = (value) =>{
    //handling currency filter variable in state
      this.setState({
          currency: value
      })
  }

  showMondal = () =>{
    //Setting mondal Varable in state
    this.setState({
      mondalIsClicked: !this.state.mondalIsClicked
    })
  }

  showMondalTrue = () =>{
    //Setting mondal Varable in state
    this.setState({
      mondalIsClicked: true
    })
  }
 
  setItems = (data) => {
    //Initializing cart products and adding product to cart in state
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
    //Setting total price of cart Items addition
   this.setState({
     totalInCart: this.state.totalInCart + price
   })
  }

  onRemove = (price) => { 
    //Setting total price of cart Items Subtraction 
    this.setState({
      totalInCart: this.state.totalInCart - price
    })

  }

 

  render(){
    //Setting functions and variables used globally
      const {title, currency, cart, mondalIsClicked,  totalInCart, cartQty} = this.state;
      const {handleClick, handleChange, setItems, showMondal, onAdd, onRemove, handleChangeDefault, showMondalTrue} = this;
      return(
        // DataContext Provider passes methods and variables as props
               <DataContext.Provider value={{
                    title, currency, cart, mondalIsClicked,  totalInCart, cartQty, onAdd,
                    handleClick, handleChange, setItems, showMondal, onRemove, handleChangeDefault,
                    showMondalTrue
                }}> 
                    {this.props.children}
               </DataContext.Provider>
         
      )
  }
}

export default DataContext;