import React from 'react';
import './PresentationEditor.css';

function PresentationEditor({ 
  slides, 
  currentSlideIndex, 
  setCurrentSlideIndex, 
  updateSlide, 
  addSlide, 
  deleteSlide 
}) {
  const currentSlide = slides[currentSlideIndex];
  
  const handleContentChange = (e) => {
    updateSlide(currentSlide.id, e.target.value, currentSlide.notes);
  };
  
  const handleNotesChange = (e) => {
    updateSlide(currentSlide.id, currentSlide.content, e.target.value);
  };
  
  return (
    <div className="editor-container">
      <div className="slides-sidebar">
        <button className="add-slide-btn" onClick={addSlide}>
          + Добавить слайд
        </button>
        <div className="slides-list">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slide-thumbnail ${index === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(index)}
            >
              <div dangerouslySetInnerHTML={{ __html: slide.content }} />
              <button 
                className="delete-slide-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSlide(slide.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="slide-editor">
        <h3>Редактирование слайда {currentSlideIndex + 1}</h3>
        <div className="editor-fields">
          <div className="content-editor">
            <label>HTML-содержимое:</label>
            <textarea
              value={currentSlide.content}
              onChange={handleContentChange}
              rows={10}
            />
          </div>
          <div className="notes-editor">
            <label>Заметки докладчика:</label>
            <textarea
              value={currentSlide.notes}
              onChange={handleNotesChange}
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationEditor;
