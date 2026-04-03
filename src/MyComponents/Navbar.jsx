import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  
  // Check if user is signed in by checking local storage token
  const isSignedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

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

          {/* Action Button / Profile */}
          <div>
            {!isSignedIn ? (
              <Link 
                to="/login"
                className="inline-block bg-transparent border-2 border-[#7cfc00] text-[#7cfc00] hover:bg-[#7cfc00] hover:text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(124,252,0,0.2)] hover:shadow-[0_0_20px_rgba(124,252,0,0.5)]"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border-2 border-[#7cfc00] hover:bg-gray-700 transition-colors shadow-[0_0_10px_rgba(124,252,0,0.2)]"
                  title="Go to Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7cfc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  title="Log out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}
