import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function PlateDetail() {
  const { id } = useParams();
  
  // State to hold the plate details and loading status 
  const [plate, setPlate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching plate details from the API when the page loads
  useEffect(() => {
    api.get(`/plates/${id}`)
      .then(response => {
        setPlate(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching plate details:", error);
        setLoading(false);
      });
  }, [id]);

  // Loading state UI
  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-[#7cfc00] text-xl font-black animate-bounce uppercase tracking-widest">
          Loading Plate...
        </div>
      </div>
    );
  }

  // Error state if plate not found or API error
  if (!plate) {
    return (
      <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-black mb-6">Plate Not Found!</h2>
        <Link to="/plates" className="text-[#7cfc00] font-bold underline">Return to Menu</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation - Back to Menu Link */}
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
          
          {/* Left Area: Dynamic Image from API */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px] bg-gray-800">
            <img 
              src={plate.image ? `http://localhost:8000/storage/${plate.image}` : 'https://via.placeholder.com/1200'} 
              alt={plate.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/90" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-black/60 backdrop-blur-md text-white border border-gray-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Plate #{plate.id}
              </span>
            </div>
          </div>
          
          {/* Right Area: Real Details & Actions */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-4 inline-block">
              <span className={`border px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${plate.is_available ? 'bg-[#7cfc00]/10 text-[#7cfc00] border-[#7cfc00]/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                {plate.is_available ? "Chef's Recommendation" : "Currently Unavailable"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter uppercase">
              {plate.name}
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl font-light mb-10 leading-relaxed border-l-4 border-gray-800 pl-6">
              {plate.description}
            </p>

            {/* Price and Action Section */}
            <div className="mt-auto pt-10 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Price</span>
                <p className="text-5xl font-black text-white">
                  {plate.price} <span className="text-[#7cfc00] text-2xl font-bold ml-1">MAD</span>
                </p>
              </div>
              
              <button 
                disabled={!plate.is_available}
                className={`w-full sm:w-auto px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${plate.is_available ? 'bg-[#7cfc00] hover:bg-[#5daf00] text-white hover:scale-105 shadow-[#7cfc00]/20' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
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