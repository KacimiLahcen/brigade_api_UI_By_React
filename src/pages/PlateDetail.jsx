import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // importing React Query for data fetching and state management
import api from '../api/axios';

// 1. function to fetch plate details by ID from the backend (Laravel API)
const fetchPlateDetails = async (id) => {
  const { data } = await api.get(`/plates/${id}`);
  return data;
};

export default function PlateDetail() {
  const { id } = useParams();
  
  // changing from useState and useEffect to useQuery for better data fetching and state management
  const { 
    data: plate, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['plate', id], // ca
    queryFn: () => fetchPlateDetails(id),
    staleTime: 1000 * 60 * 10, // plate details are considered fresh for 10 minutes
  });

  // 3. loading state: show a spinner or loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#7cfc00] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-[#7cfc00] text-xl font-black animate-pulse uppercase tracking-widest">
            Fetching Masterpiece...
          </div>
        </div>
      </div>
    );
  }

  // 4. error state: show an error message if the data fetching fails or if the plate is not found (e.g., 404 error)
  if (isError || !plate) {
    return (
      <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center text-white px-4">
        <div className="bg-red-500/10 border border-red-500/50 p-10 rounded-[3rem] text-center">
          <h2 className="text-4xl font-black mb-4">Plate Not Found!</h2>
          <p className="text-gray-400 mb-8">{error?.message || "This dish is currently off the menu."}</p>
          <Link to="/plates" className="bg-[#7cfc00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105 inline-block">
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link 
          to="/plates" 
          className="inline-flex items-center text-gray-400 hover:text-[#7cfc00] transition-colors mb-10 text-sm font-bold uppercase tracking-widest group"
        >
          <svg className="w-5 h-5 mr-3 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back To Menu
        </Link>
        
        {/* Detail Card Container */}
        <div className="bg-gray-900 rounded-[3rem] overflow-hidden border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
          
          {/* Left Area: Dynamic Image */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px] bg-gray-800">
            <img 
              src={plate.image ? `http://localhost:8000/storage/${plate.image}` : 'https://via.placeholder.com/1200'} 
              alt={plate.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/90" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-black/60 backdrop-blur-md text-white border border-gray-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                Premium Selection
              </span>
            </div>
          </div>
          
          {/* Right Area: Content */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-4 inline-block">
              <span className={`border px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${plate.is_available ? 'bg-[#7cfc00]/10 text-[#7cfc00] border-[#7cfc00]/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                {plate.is_available ? "In Stock" : "Currently Unavailable"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter uppercase italic">
              {plate.name}
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl font-light mb-10 leading-relaxed border-l-4 border-[#7cfc00]/50 pl-6">
              {plate.description}
            </p>

            {/* Price and Action Section */}
            <div className="mt-auto pt-10 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Unit Price</span>
                <p className="text-5xl font-black text-white">
                  {plate.price} <span className="text-[#7cfc00] text-2xl font-bold ml-1 italic">MAD</span>
                </p>
              </div>
              
              <button 
                disabled={!plate.is_available}
                className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl ${plate.is_available ? 'bg-white text-black hover:bg-[#7cfc00] hover:scale-105' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                {plate.is_available ? 'Place Order' : 'Sold Out'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}