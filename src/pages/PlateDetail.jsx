import { useParams, Link } from 'react-router-dom';

export default function PlateDetail() {
  // Extract dynamic 'id' parameter from react-router v6 hook
  const { id } = useParams();
  
  // Premium Placeholder image for UI visual demonstration
  const placeholderImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200';

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
          
          {/* Left/Top Area: Large Image Display */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px] bg-gray-800">
            <img 
              src={placeholderImage} 
              alt={`Plate ID ${id}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/90" />
            
            {/* Tag Overlay */}
            <div className="absolute top-6 left-6">
              <span className="bg-black/60 backdrop-blur-md text-white border border-gray-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Plate #{id}
              </span>
            </div>
          </div>
          
          {/* Right/Bottom Area: Details & Actions */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-4 inline-block">
              <span className="bg-[#7cfc00]/10 text-[#7cfc00] border border-[#7cfc00]/30 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Chef's Recommendation
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              Premium <br/> <span className="text-[#7cfc00]">Signature Dish</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl font-light mb-10 leading-relaxed border-l-4 border-gray-800 pl-6">
              Discover unparalleled flavors in this signature dish. We use the finest ingredients paired with innovative culinary techniques to bring you an unforgettable dining experience straight from the heart of La Brigade.
            </p>

            {/* Price and Action Section */}
            <div className="mt-auto pt-10 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Price</span>
                <p className="text-5xl font-black text-white">
                  140 <span className="text-[#7cfc00] text-2xl font-bold ml-1">MAD</span>
                </p>
              </div>
              
              <button className="w-full sm:w-auto bg-[#7cfc00] hover:bg-[#5daf00] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(124,252,0,0.3)] hover:shadow-[0_0_30px_rgba(124,252,0,0.5)] transform hover:scale-105">
                Place Order
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
