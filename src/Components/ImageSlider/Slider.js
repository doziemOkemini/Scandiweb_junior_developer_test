import React, { Component } from 'react'
import './Slider.css'

export default class Slider extends Component {
    state = {
        current: 0
    }

    nextSlide = (length) =>{
        if(this.state.current === length -1){
            this.setState({
                current : 0
            })
        }  else{
             this.setState({
                current: this.state.current + 1
             })
        }
    }

    prevSlide = (length) =>{
        if(this.state.current === 0){
            this.setState({
                current: length -1
            })
        }  else{
             this.setState({
                current: this.state.current - 1
             })
        }
    }
    
  render() {
    const {slides} = this.props
    const length = slides.length

    if(!Array.isArray(slides) || slides.length <= 0){
        return null
    }

    return (
      <section className='slider'> 
        <img src={slides[this.state.current]} alt='Product' className='border'/>
        <svg width={15} height={15} fill="#f9fafa" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"className='border left-arrow' onClick={()=> this.prevSlide(length)}>
            <path d="M8.079 12.77a1.2 1.2 0 1 1 1.844-1.537l6 7.2a1.2 1.2 0 1 1-1.844 1.536l-6-7.2Z" />
            <path d="M9.923 12.768a1.2 1.2 0 1 1-1.844-1.537l6-7.2a1.2 1.2 0 1 1 1.844 1.537l-6 7.2Z" />
        </svg>

        <svg width={15} height={15} fill="#f9fafa" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='border right-arrow' onClick={()=> this.nextSlide(length)}>
            <path d="M14.079 11.233a1.2 1.2 0 1 1 1.844 1.536l-6 7.2a1.2 1.2 0 1 1-1.844-1.536l6-7.2Z" />
            <path d="M8.079 5.568A1.2 1.2 0 0 1 9.923 4.03l6 7.2a1.2 1.2 0 1 1-1.844 1.537l-6-7.2Z" />
        </svg>
      </section>
    )
  }
}
