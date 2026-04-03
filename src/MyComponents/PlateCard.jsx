import { Link } from 'react-router-dom';

export default function PlateCard({ id, name, price, description, is_available, image }) {
  // default if no image provided
  const placeholderImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
  
  // use the API image if provided
  const displayImage = image || placeholderImage;

  return (
    <div className="bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-800 flex flex-col h-full group hover:border-[#7cfc00]/60 transition-colors duration-500 shadow-xl">
      
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img 
          src={displayImage} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]"
        />
        
        {/* Dark Vignette Overlay for Premium Vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30 opacity-90"></div>
        
        {/* availability badge */}
        <div className="absolute top-5 left-5">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${
            is_available 
              ? 'bg-[#7cfc00] text-white shadow-lg' 
              : 'bg-gray-700/80 text-gray-300'
          }`}>
             {/* better to hide it if not available; i"ll handle the logic */}
            {is_available ? 'Available' : 'Coming soon'} 
          </div>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-gray-900">
        
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#7cfc00] transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-[#7cfc00] font-black whitespace-nowrap text-xl">
            {price}
            <span className="text-xs text-gray-500 ml-1 font-semibold">MAD</span>
          </p>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        {/* Action Button Links to /plates/:id */}
        <Link 
          to={`/plates/${id}`} 
          className="w-full inline-flex items-center justify-center py-3.5 rounded-xl bg-gray-800 text-white text-xs font-black uppercase tracking-widest border border-gray-700 hover:bg-[#7cfc00] hover:border-[#7cfc00] transition-all duration-300 group-hover:shadow-[0_5px_15px_rgba(124,252,0,0.2)]"
        >
          Voir Détails
        </Link>
        
      </div>
    </div>
  );
}
