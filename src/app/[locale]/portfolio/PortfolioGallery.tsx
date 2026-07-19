"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import StaggerReveal from '../StaggerReveal';
import { X } from 'lucide-react';

type PortfolioGalleryProps = {
  images: string[];
};

export default function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <StaggerReveal className="portfolio-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="portfolio-item" 
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Portfolio ${idx + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </StaggerReveal>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px'
            }}
          >
            <X size={32} />
          </button>
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxWidth: '1200px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Expanded portfolio view"
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
