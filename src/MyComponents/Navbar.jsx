import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const getNavClass = ({ isActive }) => 
    `text-sm font-bold uppercase tracking-widest transition-colors duration-300 py-2 border-b-2 ${
      isActive 
        ? 'text-[#7cfc00] border-[#7cfc00]' 
        : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-lg border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black text-white tracking-tighter hover:opacity-80 transition-opacity">
              RESTO <span className="text-[#7cfc00]">BRIGADE</span>
            </Link>
          </div>
          
          {/* Main Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink to="/" className={getNavClass} end>Home</NavLink>
              <NavLink to="/plates" className={getNavClass}>Menu</NavLink>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button className="bg-transparent border-2 border-[#7cfc00] text-[#7cfc00] hover:bg-[#7cfc00] hover:text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(124,252,0,0.2)] hover:shadow-[0_0_20px_rgba(124,252,0,0.5)]">
              Sign In
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
