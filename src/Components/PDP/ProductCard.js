import React, { Component } from 'react'
import DataContext from '../../Context/DataContext';
import './ProductCard.css'

export default class ProductCard extends Component {
  state = {
    attribute: []
  }

  handleChange(attribute, id){
    //making a shallow copy of the attribute list
    let updateAttribute = this.state.attribute;
    // console.log(updateAttribute)

    //finding and making a shallow copy of the object i need
     const updateItem = updateAttribute[0].find(item => item.id === id)
    console.log(updateItem)

    //mutating the copy
    updateItem.name = attribute

    //setting the new copy to our state
    this.setState({
      attribute: updateAttribute
    })

    
  }

  componentDidMount(){
    let eachAttributeItem = [] //creating empty array 
    if(this.props.attributes){ //checking for value of props
      this.props.attributes.forEach(element => { //looping through each attribute type
        eachAttributeItem.push({name: element.items[0].displayValue, id: element.id}) //pushing default value into prev Empty Array
      });
      
      // this.props.setAttributeState(eachAttributeItem)// passing the event back to parent component
      // // console.log(this.state.attribute)

      this.setState({//setting and updating attribute state
        attribute: [...this.state.attribute, eachAttributeItem]
      })

      // this.props.setData(this.state.attribute)
    }
  }
  
  render() {
    // console.log(this.state.attribute)
      const {attributes} = this.props
    return (
      <div>
        { 
         //Checking Attribute length
          attributes.length > 0 ?
            attributes.length > 1 ?
              attributes.map(element => {
                return( //mapping each attribute list
                   element.type === 'swatch' ? 
                  <div key={element.id} className='attribute-container'>  
                    <h3 className='attribute-header'>{element.name}</h3>
                    <div className='attribute-content'>
                      { 
                        element.items.map( item => { //mapping attribute with color element
                          return <button key={item.id} className='box-item' style={{ backgroundColor: item.value}} value={item.displayValue} onClick={()=>this.handleChange(item.displayValue, element.id)}></button>
                        })
                      }
                    </div>
                  </div>
                   :
                  <div key={element.id} className='attribute-container'>
                    <h3 className='attribute-header'>{element.name}</h3>
                    <div className='attribute-content'>
                      {
                        element.items.map( item => {
                            return(
                                <button key={item.id} className='box-item' value={item.value} onClick={()=>this.handleChange(item.value, element.id)}>{item.displayValue}</button>
                            )
                        })
                      }
                    </div>
                  </div>
                )
              }) :
              //mapping attribute list of length 1
              <div key={attributes[0].id} > 
                <h3 className='attribute-header'>{attributes[0].name}</h3>
                <div className='attribute-content'>
                {
                  attributes[0].items.map( item => {
                    return(
                        <button key={item.id} className='box-item' value={item.value} onClick={()=>this.handleChange(item.value, attributes[0].id)} >{item.displayValue}</button>
                    )
                  })
                }
                </div>
                
              </div>
          : ''
        }

      </div>
    )
  }
}

ProductCard.contextType= DataContext