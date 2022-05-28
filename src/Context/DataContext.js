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
        totalInCart: 0,
        currentProduct: '',
        attribute:[]
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

      if(this.state.totalInCart > 0){
        this.setState({
          totalInCart: this.state.tax
        })
        console.log(this.state.totalInCart)

        this.state.cart.forEach( item => {
          console.log(this.state.cart)
          const itemPrice = item.prices.find(price => price.currency.label === this.state.currency)
          console.log(itemPrice)

           this.addToTotal(itemPrice) //needs work
        })
      }
  }

  addToTotal = (price) =>{
    console.log(this.state.totalInCart)
    this.setState({
    totalInCart: this.state.totalInCart + price.amount
    })
    console.log(this.state.totalInCart)
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
 
  setItems = (data, selectedAttribute) => {
    //Initializing cart products and adding product to cart in state
    const currentCurrency = data.prices.find(price => price.currency.label === this.state.currency);
    // console.log(currentCurrency)
    const exist = this.state.cart.find( item => item.id === data.id);
    if (exist){
      return
    } else {
      this.setState({
        cart: [...this.state.cart, {...data, selectedAttribute, qty: 1}],
        cartQty: this.state.cartQty + 1,
        totalInCart: this.state.totalInCart + currentCurrency.amount + this.state.tax,
        currentProduct: data
      })
      console.log(this.state.cart)
    }
    console.log(this.state.cart)
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