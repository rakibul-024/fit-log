import React from 'react';
import FitDataCard from '../components/FitDataCard';

const fitData = async () => {
  try {
    const response = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Data Fetching Error:", error);
    return [];
  }
};

const Page = async () => {
  const data = await fitData();

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
    
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-wider uppercase text-white">
            THE LIBRARY
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.length > 0 ? (
            data.map((item) => (
              <FitDataCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No exercise data available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;