import React from "react";
import { useLayoutEffect,useRef } from "react";

export default function Carousel(props){
    let slideIndex = 1;
    let currentLength = 0;

    const nextSlideButton = useRef(),                         
    slidesWrapper = useRef(),                   
    sliderInner = useRef(),
    slideIndicators = useRef()                    

    useLayoutEffect(() => {
        const sliderInnerNode = sliderInner.current
        const indexes = slideIndicators.current
        document.querySelectorAll('.main_block').forEach(elem => {elem.style.width = props.cfg.width})
        document.querySelectorAll('.slide_controllers').forEach(elem => {elem.style.width = +(props.cfg.width.split('px')[0])-50 + 'px'})
        document.querySelectorAll('.slide_indicators').forEach(elem => {elem.style.width = +(props.cfg.spaces.split('px')[0]) * (slideIndicators.current.childElementCount/2) + 100 + 'px'})
        document.querySelectorAll('.currentSlide').forEach(elem => {elem.style.backgroundColor =  props.cfg.nonActiveColor})
        document.querySelectorAll('.slide_indicators :nth-child(1)').forEach(elem => {elem.style.backgroundColor =  props.cfg.activeColor})

        indexes.innerHTML = '';
        for (let j = 0; j < sliderInnerNode.childElementCount; j++) {
          let elem = document.createElement("div");
          elem.className = 'currentSlide';
          indexes.append(elem);

          sliderInnerNode.children[j].lastChild.style.width = props.cfg.width
        }
        const props1 = props.src;
        props1.forEach(element => {
            let newElem = document.createElement('div')
            newElem.classList.add('slide')
            let image = document.createElement('img')
            image.src = element
            newElem.appendChild(image)
            sliderInnerNode.append(newElem)
        });

    }, [props.src, props.cfg])

    function prevSlide(){
        const sliderInnerNode = sliderInner.current
        const slideWidth = window.getComputedStyle(slidesWrapper.current).width
        for (let i = 0; i < slideIndicators.current.children.length; i++){
            slideIndicators.current.children[i].style.backgroundColor = props.cfg.nonActiveColor
        }
        if (currentLength === 0) {
            currentLength = +(slideWidth.split('px')[0]) * (sliderInnerNode.childElementCount/2 - 1); 
            slideIndex = sliderInnerNode.childElementCount/2;
            slideIndicators.current.children[slideIndex-1].style.backgroundColor = props.cfg.activeColor
        }
        else {
            currentLength -= +(slideWidth.split('px')[0]); 
            slideIndex -= 1;
            slideIndicators.current.children[slideIndex-1].style.backgroundColor = props.cfg.activeColor
        }
        sliderInnerNode.style.transform = `translateX(-${currentLength}px)`
    }

    function nextSlide(){
        const sliderInnerNode = sliderInner.current
        const slideWidth = window.getComputedStyle(slidesWrapper.current).width
        
        for (let i = 0; i < slideIndicators.current.children.length; i++){
            slideIndicators.current.children[i].style.backgroundColor = props.cfg.nonActiveColor
        }

        if (currentLength === +(slideWidth.split('px')[0]) * (sliderInnerNode.childElementCount/2 - 1)) {
            currentLength = 0; 
            slideIndex = 1;
            slideIndicators.current.children[slideIndex-1].style.backgroundColor = props.cfg.activeColor
        }
        else {
            currentLength += +(slideWidth.split('px')[0])
            slideIndex += 1;
            slideIndicators.current.children[slideIndex-1].style.backgroundColor = props.cfg.activeColor
        }
    
        sliderInnerNode.style.transform = `translateX(-${currentLength}px)`
    }
    return(
        <div className = "main_block">
            <div className="slides_wrapper" ref = {slidesWrapper}>
                <div className="slider_inner" ref = {sliderInner}></div>
            </div>
            <div className="slide_indicators" ref = {slideIndicators}></div>
            <div className="slide_controllers"> 
                <div className="prevSlide" onClick={prevSlide}></div>
                <div className="nextSlide" onClick={nextSlide} ref = {nextSlideButton}></div>
            </div>
        </div>
    )
}