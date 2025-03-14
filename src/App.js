import React, { useState } from 'react';
import PresentationEditor from './components/PresentationEditor';
import PresentationPreview from './components/PresentationPreview';
import './App.css';

function App() {
  const [slides, setSlides] = useState([
    { id: 1, content: '<h1>Моя первая презентация</h1><p>Созданная с помощью reveal.js</p>', notes: 'Вступление' },
    { id: 2, content: '<h2>Слайд 2</h2><ul><li>Пункт 1</li><li>Пункт 2</li></ul>', notes: 'Основные пункты' }
  ]);
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      content: '<h2>Новый слайд</h2><p>Добавьте содержимое</p>',
      notes: ''
    };
    setSlides([...slides, newSlide]);
  };
  
  const updateSlide = (id, content, notes) => {
    const updatedSlides = slides.map(slide => 
      slide.id === id ? { ...slide, content, notes } : slide
    );
    setSlides(updatedSlides);
  };
  
  const deleteSlide = (id) => {
    if (slides.length <= 1) return;
    const filteredSlides = slides.filter(slide => slide.id !== id);
    setSlides(filteredSlides);
    if (currentSlideIndex >= filteredSlides.length) {
      setCurrentSlideIndex(filteredSlides.length - 1);
    }
  };
  
  return (
    <div className="app-container">
      <header>
        <h1>Редактор презентаций</h1>
      </header>
      <main>
        <PresentationEditor 
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          updateSlide={updateSlide}
          addSlide={addSlide}
          deleteSlide={deleteSlide}
        />
        <PresentationPreview 
          slides={slides}
          currentSlideIndex={currentSlideIndex}
        />
      </main>
    </div>
  );
}

export default App;



