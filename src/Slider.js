
import './Slider.css';
import { useState, useEffect, useCallback, useRef } from "react";

export default function Slider({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const delay = 3000; 

    const prevSlide = () => {
      setCurrentIndex(currentIndex === 0 ? images.length -1 : currentIndex - 1);
    };
  
    const nextSlide = useCallback(() => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
      }, [currentIndex, images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
      };
    
    const startInterval = useCallback(() => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current); 
    }
    intervalRef.current = setInterval(nextSlide, delay);
    }, [nextSlide, delay]);

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [nextSlide, startInterval]);
    

    useEffect(() => {
        startInterval();
    }, [currentIndex, startInterval]);

    return (
        <div className="slider">
            <div className='image-container' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                   <a 
                        key={image.id}
                        href={image.link}
                        target="_blank"
                        rel="noreferrer"
                        className={index === currentIndex ? 'image-link active' : 'image-link'}
                    >
                        {index === currentIndex && (
                            <img 
                                src={image.url}
                                className="image"
                                alt={image.alt}
                            />
                        )}
                        
                    </a> 
                ))}
            </div>
            
            <button onClick={prevSlide} className='arrow-button-left'>❮</button>
            <button onClick={nextSlide} className='arrow-button-right'>❯</button>
            
            <div className='circle-container'>
                {images.map((_, index) => (
                    <button 
                        onClick={() => goToSlide(index)} 
                        key={index} 
                        className={`circle-button ${currentIndex === index ? "active" : ""}`}
                    >
                    </button>
                ))}
            </div>


        </div>
    );
}

