import React from 'react';
import { Zap } from 'lucide-react';

const WangoCard = ({ card }) => {
  return (
    <div className={`${card.color} rounded-3xl shadow-2xl p-8 text-white transform scale-105 animate-bounce`}>
      <div className="text-center">
        <Zap className="w-20 h-20 mx-auto mb-4 animate-pulse" />
        <h2 className="text-4xl font-black mb-4 font-comic">
          WICKED WANGO CARD!
        </h2>
        <p className="text-2xl font-bold">
          {card.text}
        </p>
      </div>
    </div>
  );
};

export default WangoCard;
