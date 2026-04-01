import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden px-6">
      
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#7cfc00] rounded-full mix-blend-screen mix-blend-lighten filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Main Catchy Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[1.1]">
          Experience The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7cfc00] to-[#adff2f]">Perfect Taste</span>
        </h1>
        
        {/* Description Text */}
        <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Welcome to <strong className="text-gray-200">La Brigade</strong> – Your ultimate restaurant recommendation system. 
          Discover premium dishes curated for your exceptional palate.
        </p>
        
        {/* Hero CTA Button */}
        <Link 
          to="/plates" 
          className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#7cfc00] text-white font-black text-lg uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:bg-[#5daf00] shadow-[0_0_20px_rgba(124,252,0,0.4)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explore Menu
            <svg 
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
        
      </div>
    </div>
  );
}
