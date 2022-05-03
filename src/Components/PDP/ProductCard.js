import React, { Component } from 'react'
import './ProductCard.css'

export default class ProductCard extends Component {

  render() {
      const {attributes} = this.props
    return (
      <div>
        {   
          attributes.length > 0 ?
            attributes.length > 1 ?
              attributes.map(element => {
                return(
                  element.type === 'swatch' ?
                  <div key={element.id} className='attribute-container'>  
                    <h3 className='attribute-header'>{element.name}</h3>
                    <div className='attribute-content'>
                      { 
                        element.items.map( item => {
                          return <button key={item.id} className='box-item' style={{ backgroundColor: item.value}} value={item.displayValue}></button>
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
                                <button key={item.id} className='box-item' value={item.value}>{item.displayValue}</button>
                            )
                        })
                      }
                    </div>
                  </div>
                )
              }) :
              <div key={attributes[0].id} > 
                <h3 className='attribute-header'>{attributes[0].name}</h3>
                <div className='attribute-content'>
                {
                  attributes[0].items.map( item => {
                    return(
                        <button key={item.id} className='box-item' value={item.value} >{item.displayValue}</button>
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
