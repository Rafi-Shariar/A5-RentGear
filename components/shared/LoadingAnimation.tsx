'use client';

import Lottie from 'lottie-react';
import gearAnimation from '@/assets/loading.json'

export default function LoadingAnimation() {
  return (
    <div className="w-48 h-48">
      <Lottie 
        animationData={gearAnimation} 
        loop={true} 
        autoplay={true} 
      />
    </div>
  );
}