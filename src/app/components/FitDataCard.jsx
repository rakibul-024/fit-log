import React from 'react';
import Image from 'next/image';
import { Clock, Flame, Star } from 'lucide-react';

const FitDataCard = ({ item }) => {
  return (
    <div className="bg-[#121316] border border-[#1f2128] rounded-xl overflow-hidden hover:border-[#2e323d] transition duration-300 flex flex-col justify-between">
      

      <div className="relative w-full h-[260px] overflow-hidden bg-[#1a1c23]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top hover:scale-105 transition duration-500"
          priority={false}
        />
      </div>

     
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
        
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {item.muscleGroups && item.muscleGroups.map((group, index) => (
              <span
                key={index}
                className="bg-[#c2fd12] text-black text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

       
          <h3 className="text-white font-black text-sm uppercase tracking-wide mb-1 line-clamp-1">
            {item.name}
          </h3>

       
          <p className="text-gray-400 text-xs mb-3">
            {item.equipment}
          </p>
        </div>

     
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-[#1f2128] pt-3 mt-1">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{item.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{item.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-300 font-semibold">{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitDataCard;