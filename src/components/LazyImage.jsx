import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({src, alt, placeholderColor }) => {
    const [isLoading, setIsLoading] = useState(true); //로딩여부
    const [isInView, setIsInView] = useState(false); // 화면 노출 여부
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    setIsInView(true);  // 화면에 보이면 이미지 로드 시작
                    observer.unobserve(entry.target); // 한 번 로드하면 감시 중단
                
                }
            })
        })

        if(imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        }

    },[])
  return (
    <div ref={imgRef}
        style={{ backgroundColor: placeholderColor, borderRadius: '16px', overflow: 'hidden' }}
    >
        {isInView && (
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoading(false)} // 로드 완료 시
                style={{ 
                    opacity: isLoading ? 0 : 1, 
                    transition: 'opacity 0.3s ease-in-out',                    
                }}
            />
      )}
    </div>
  )
}

export default LazyImage