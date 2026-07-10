'use client';
import { useState } from 'react';

interface FAQAccordionProps {
  items: Array<{ question: string; answer: string }>;
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span>{item.question}</span>
            <span className="faq-question-icon">+</span>
          </button>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
