import { useState, useEffect } from 'react';
import PlateCard from '../MyComponents/PlateCard';
import api from '../api/axios'; // Ensure you have created the axios instance

export default function Plates() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Adding state for real API data
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* // Static Mock Data required by instruction - KEPT AS COMMENTED
  const STATIC_PLATES = [
    { id: 1, name: "Wagyu Signature Burger", price: 140, description: "Premium wagyu beef patty with truffle mayo and aged cheddar.", is_available: true },
    { id: 2, name: "Spicy Tuna Roll", price: 95, description: "Fresh tuna, spicy mayo, tempura flakes and premium nori.", is_available: true },
    { id: 3, name: "Truffle Pasta", price: 120, description: "Handmade fettuccine tossed in a rich black truffle cream sauce.", is_available: false },
    { id: 4, name: "Ribeye Steak", price: 250, description: "Aged ribeye steak served with asparagus and garlic butter.", is_available: true },
    { id: 5, name: "Burrata Salad", price: 85, description: "Fresh burrata, heirloom tomatoes, basil, and balsamic glaze.", is_available: true },
    { id: 6, name: "Lobster Risotto", price: 210, description: "Creamy arborio rice cooked slowly with fresh lobster chunks.", is_available: true },
    { id: 7, name: "Crispy Calamari", price: 75, description: "Lightly battered calamari rings with lemon aioli.", is_available: true },
    { id: 8, name: "Pistachio Gelato", price: 45, description: "Authentic Italian gelato made with Sicilian pistachios.", is_available: false },
  ];
  */

  // J4: Fetching real data from Laravel API
  useEffect(() => {
    api.get('/plates')
      .then(response => {
        // Assuming your API returns the plates array directly
        setPlates(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  // Extract unique categories dynamically from the plates data
  // (Assumes your Laravel API returns a 'category' string or object. Adjust if needed)
  const categories = ["All", ...new Set(plates.map(plate => {
    if (!plate.category) return null;
    return typeof plate.category === 'object' ? plate.category.name : plate.category;
  }).filter(Boolean))];

  // Filtering Logic updated to use 'plates' state and selected category
  const filteredPlates = plates.filter((plate) => {
    const matchesSearch = plate.name.toLowerCase().includes(search.toLowerCase()) || 
                          plate.description.toLowerCase().includes(search.toLowerCase());
    
    // Fallback if the category structure from the API changes
    const plateCat = plate.category ? (typeof plate.category === 'object' ? plate.category.name : plate.category) : null;
    const matchesCategory = selectedCategory === "All" || plateCat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Loading State UI
  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <h2 className="text-[#7cfc00] text-2xl font-black animate-pulse">PREPARING YOUR MENU...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 pb-20">
      
      {/* Header Section */}
      <div className="bg-gray-950 border-b border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative z-10">
        <div className="max-w-[1500px] mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                Our Premium <span className="text-[#7cfc00]">Menu</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl font-light max-w-lg">
                Discover our carefully crafted dishes made from the finest ingredients.
              </p>
            </div>
            
            {/* Search Bar Input */}
            <div className="w-full md:w-[400px]">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Rechercher un plat..." 
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
          /* Grid responsive: 1 col on mobile -> 2 tablet -> 3 lg -> 4 xl */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
            {filteredPlates.map(plate => (
              <PlateCard 
                key={plate.id} 
                {...plate} 
                // Handling storage image URL from Laravel
                image={plate.image ? `http://localhost:8000/storage/${plate.image}` : null}
              />
            ))}
          </div>
        ) : (
          /* Empty State / Not Found Template */
          <div className="flex flex-col flex-wrap items-center justify-center py-32 px-4 rounded-[3rem] bg-gray-900/50 border border-gray-800 mt-10">
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-8 border border-gray-700 shadow-inner">
              <svg className="w-12 h-12 text-[#7cfc00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">Aucun plat trouvé</h2>
            <p className="text-gray-400 text-lg text-center max-w-md mx-auto mb-8">
              We couldn't find anything matching "<span className="text-white font-bold">{search}</span>". Please try another keyword.
            </p>
            <button 
              onClick={() => setSearch("")} 
              className="bg-[#7cfc00] hover:bg-[#5daf00] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}