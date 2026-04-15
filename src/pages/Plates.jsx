import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // getting data with React Query
import PlateCard from '../MyComponents/PlateCard';
import api from '../api/axios';

// 1. function to fetch plates data from the backend (Laravel API)
const fetchPlates = async () => {
  const { data } = await api.get('/plates');
  return data;
};

export default function Plates() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. replace  existing data fetching logic with React Query's useQuery hook
  const { 
    data: plates = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['plates'], // unique key for this query (can be used for caching and refetching)
    queryFn: fetchPlates,
    staleTime: 1000 * 60 * 5, // data is considered fresh for 5 minutes
  });

  // 3. dynamically generate categories from the fetched plates data
  const categories = ["All", ...new Set(plates.map(plate => {
    if (!plate.category) return null;
    return typeof plate.category === 'object' ? plate.category.name : plate.category;
  }).filter(Boolean))];

  // 4. filter plates based on search input and selected category
  const filteredPlates = plates.filter((plate) => {
    const matchesSearch = plate.name.toLowerCase().includes(search.toLowerCase()) || 
                          plate.description.toLowerCase().includes(search.toLowerCase());
    
    const plateCat = plate.category ? (typeof plate.category === 'object' ? plate.category.name : plate.category) : null;
    const matchesCategory = selectedCategory === "All" || plateCat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 5. loading state: show a spinner or loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#7cfc00] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-[#7cfc00] text-2xl font-black uppercase tracking-widest animate-pulse">
            Syncing Menu...
          </h2>
        </div>
      </div>
    );
  }

  // 6. error state: show an error message if the data fetching fails
  if (isError) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 p-8 rounded-[2rem] text-center">
          <h2 className="text-red-500 text-2xl font-black mb-2">Connection Failed</h2>
          <p className="text-gray-400">{error.message}</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-white underline">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 pb-20">
      
      
      <div className="bg-gray-950 border-b border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative z-10">
        <div className="max-w-[1500px] mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                Our Premium <span className="text-[#7cfc00]">PLATES</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl font-light max-w-lg">
                Experience culinary excellence with our fresh, seasonal menu.
              </p>
            </div>
            
            <div className="w-full md:w-[400px]">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Find your taste..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 focus:border-[#7cfc00] rounded-2xl py-4 pl-12 pr-6 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-4 focus:ring-[#7cfc00]/20 shadow-inner"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#7cfc00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-800/50">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-[#7cfc00] text-gray-950 shadow-[0_0_15px_rgba(124,252,0,0.4)] border border-[#7cfc00]' 
                      : 'bg-gray-950 text-gray-400 border border-gray-800 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Layout Area */}
      <div className="max-w-[1500px] mx-auto px-6 pt-16">
        {filteredPlates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
            {filteredPlates.map(plate => (
              <PlateCard 
                key={plate.id} 
                {...plate} 
                image={plate.image ? `http://localhost:8000/storage/${plate.image}` : null}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-4 rounded-[3rem] bg-gray-900/50 border border-gray-800 mt-10">
            <h2 className="text-3xl font-black text-white mb-4">No Plates Found</h2>
            <button 
              onClick={() => {setSearch(""); setSelectedCategory("All");}} 
              className="bg-[#7cfc00] text-black px-8 py-3 rounded-full font-bold transition-transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}