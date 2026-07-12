'use client';
import { useState } from 'react';

interface FAQAccordionProps {
  items: Array<{ question: string; answer: string }>;
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="faq-list" role="list">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        const answerId = `faq-answer-${index}`;
        const questionId = `faq-question-${index}`;

        return (
          <div key={index} className={`faq-item ${isActive ? 'active' : ''}`} role="listitem">
            <button
              id={questionId}
              className="faq-question"
              onClick={() => setActiveIndex(isActive ? null : index)}
              aria-expanded={isActive}
              aria-controls={answerId}
            >
              <span>{item.question}</span>
              <span className="faq-question-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <div
              id={answerId}
              className="faq-answer"
              role="region"
              aria-labelledby={questionId}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
