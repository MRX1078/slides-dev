import React, { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './PresentationPreview.css';

function PresentationPreview({ slides, currentSlideIndex }) {
  const deckRef = useRef(null);
  const revealRef = useRef(null);
  
  // Инициализация reveal.js
  useEffect(() => {
    if (deckRef.current && !revealRef.current) {
      revealRef.current = new Reveal(deckRef.current, {
        embedded: true,
        hash: false,
        controls: true,
        progress: true,
        center: true,
        transition: 'slide'
      });
      
      revealRef.current.initialize();
    }
    
    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, []);
  
  // Обновление reveal.js при изменении слайдов
  useEffect(() => {
    if (revealRef.current) {
      revealRef.current.sync();
      revealRef.current.slide(currentSlideIndex);
    }
  }, [slides, currentSlideIndex]);
  
  return (
    <div className="preview-container">
      <h3>Предпросмотр</h3>
      <div className="reveal-container">
        <div className="reveal" ref={deckRef}>
          <div className="slides">
            {slides.map(slide => (
              <section 
                key={slide.id} 
                data-notes={slide.notes}
                dangerouslySetInnerHTML={{ __html: slide.content }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationPreview;
