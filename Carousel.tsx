import React, { useRef, useEffect } from 'react';
import './carousel.scss'

interface CarouselProps {
    src: string[];
    cfg: {
      width: string;
      spaces: string;
      nonActiveColor: string;
      activeColor: string;
    };
}

export default function Carousel(props: CarouselProps) {
    let slideIndex = 1;
    let currentLength = 0;

    const nextSlideButton = useRef<HTMLDivElement>(null);
    const prevSlideButton = useRef<HTMLDivElement>(null);
    const slidesWrapper = useRef<HTMLDivElement>(null);
    const sliderInner = useRef<HTMLDivElement>(null);
    const slideIndicators = useRef<HTMLDivElement>(null);
    const fullBlock = useRef<HTMLDivElement>(null);

    function prevSlide(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        if (!sliderInner.current || !slidesWrapper.current || !slideIndicators.current) {
            return;
        }

        const sliderInnerNode = sliderInner.current;
        const slideWidth = window.getComputedStyle(slidesWrapper.current).width;

        // Check if the current slide is the first slide and reset if needed
        if (currentLength === 0) {
            currentLength = +(slideWidth.split('px')[0]) * (sliderInnerNode.childElementCount - 1);
            slideIndex = sliderInnerNode.childElementCount;
        } else {
            currentLength -= +(slideWidth.split('px')[0]);
            slideIndex -= 1;
        }
        

        // Update the indicator elements
        if (slideIndicators.current.children[slideIndex - 1]) {
            const indicatorElement = slideIndicators.current.children[slideIndex - 1] as HTMLElement;
            indicatorElement.style.backgroundColor = props.cfg.activeColor;
        }
        if (slideIndicators.current.children[slideIndex]) {
            const prevIndicatorElement = slideIndicators.current.children[slideIndex] as HTMLElement;
            prevIndicatorElement.style.backgroundColor = props.cfg.nonActiveColor;
        }
        
        updateIndicators()

        // Update the slider position
        sliderInnerNode.style.transform = `translateX(-${currentLength}px)`;
    }
    
    
    function nextSlide(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        if (!sliderInner.current || !slidesWrapper.current || !slideIndicators.current) {
            return;
        }
    
        const sliderInnerNode = sliderInner.current;
        const slideWidth = window.getComputedStyle(slidesWrapper.current).width;
    
        // Check if the current slide is the last slide and reset if needed
        if (currentLength === +(slideWidth.split('px')[0]) * (sliderInnerNode.childElementCount - 1)) {
            currentLength = 0;
            slideIndex = 1;
        } else {
            currentLength += +(slideWidth.split('px')[0]);
            slideIndex += 1;
        }
    
        // Update the indicator elements
        if (slideIndicators.current.children[slideIndex - 1]) {
            const indicatorElement = slideIndicators.current.children[slideIndex - 1] as HTMLElement;
            indicatorElement.style.backgroundColor = props.cfg.activeColor;
        }
        if (slideIndicators.current.children[slideIndex - 2]) {
            const prevIndicatorElement = slideIndicators.current.children[slideIndex - 2] as HTMLElement;
            prevIndicatorElement.style.backgroundColor = props.cfg.nonActiveColor;
        }
        
        updateIndicators()

        // Update the slider position
        sliderInnerNode.style.transform = `translateX(-${currentLength}px)`;
    }
    
    function updateIndicators() {
        if (!slideIndicators.current) {
            return;
        }
    
        for (let i = 0; i < slideIndicators.current.children.length; i++) {
            const indicatorElement = slideIndicators.current.children[i] as HTMLElement;
            if (i === slideIndex-1) {
                indicatorElement.style.backgroundColor = props.cfg.activeColor;
            } else {
                indicatorElement.style.backgroundColor = props.cfg.nonActiveColor;
            }
        }
    }

    useEffect(() => {
        const handlePrevSlideClick = (e: any) => {
            e.stopPropagation();
            prevSlide(e);
        };
    
        const handleNextSlideClick = (e: any) => {
            e.stopPropagation();
            nextSlide(e);
        };
    
        if (prevSlideButton.current && nextSlideButton.current) {
            prevSlideButton.current.addEventListener('click', handlePrevSlideClick);
            nextSlideButton.current.addEventListener('click', handleNextSlideClick);
    
            return () => {
                prevSlideButton.current?.removeEventListener('click', handlePrevSlideClick);
                nextSlideButton.current?.removeEventListener('click', handleNextSlideClick);
            };
        }
    }, [prevSlideButton, nextSlideButton]); // Make sure to include the dependencies here if you use any inside the useEffect
    

    return(
        <div className="main_block" ref={fullBlock} style={{ width: props.cfg.width }}>
            <div className="slides_wrapper" ref={slidesWrapper}>
                <div className="slider_inner" ref={sliderInner}>
                    {props.src.map((img: string, index: number) => (
                        <img src={img} key={index} className='slide' alt={`slide-${index}`} style={{ width: props.cfg.width, height: props.cfg.width}}/>
                    ))}
                </div>
            </div>
            <div className="slide_indicators" ref={slideIndicators} style={{ width: +(props.cfg.spaces.split('px')[0]) * (slideIndicators.current?.childElementCount || 0) / 2 + 100 + 'px' }}>
                {props.src.map((img: string, index: number) => (
                    <div key={index} className='currentSlide'></div>
                ))}
            </div>
            <div className="slide_controllers" style={{ width: +(props.cfg.width.split('px')[0]) - 50 + 'px' }}> 
                <div className="prevSlide" onClick={prevSlide} ref={prevSlideButton}></div>
                <div className="nextSlide" onClick={nextSlide} ref={nextSlideButton}></div>
            </div>
        </div>
    );
}