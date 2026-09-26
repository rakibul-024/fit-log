import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';

const FitDataCard = ({ item }) => {
  return (
    <Link
      href={`/FitData/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1f2128] bg-[#121316] transition duration-300 hover:-translate-y-1 hover:border-[#3b414d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
      aria-label={`View details for ${item.name}`}
    >
      <div className="relative h-52 w-full overflow-hidden bg-[#1a1c23] sm:h-56 lg:h-60">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-top transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {item.muscleGroups?.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#c2fd12] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="mb-1 line-clamp-1 text-sm font-black uppercase tracking-wide text-white">
            {item.name}
          </h3>

          <p className="mb-3 text-xs text-gray-400">{item.equipment}</p>
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-[#1f2128] pt-3 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-3.5 text-gray-400" />
            <span>{item.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame aria-hidden="true" className="size-3.5 text-orange-500" />
            <span>{item.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <Star
              aria-hidden="true"
              className="size-3.5 fill-yellow-400 text-yellow-400"
            />
            <span className="text-gray-300 font-semibold">{item.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FitDataCard;