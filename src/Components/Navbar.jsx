import { Link } from 'react-router-dom';  

function Navbar() {
  return (
    <nav className="flex items-center">
      {/* Logo */}
      <img src="src/assetsPictures/LOGO-1_text.png" className="w-45 min-h-auto p-1 ml-1" alt="WeWatchd Logo" />
      <h1 className="text-white text-3xl font-bold mb-15 font-serif"> 
        WeWatchd
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-6 text-sm items-center mb-15 ml-180">
        <Link to="/films">  
          <button className="px-3 py-1.5 rounded-md text-white font-medium transition-all duration-200 ease-out hover:text-green-400 hover:bg-[#1f2329] hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-green-400/50">
            Films
          </button>
        </Link>
        {["Lists", "Login"].map((item) => (
          <button
            key={item}
            className="px-3 py-1.5 rounded-md text-white font-medium transition-all duration-200 ease-out hover:text-green-400 hover:bg-[#1f2329] hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-green-400/50">
            {item}
          </button>
        ))}
        <button className="px-4 py-1.5 rounded-md font-semibold bg-green-500 text-black transition-all duration-200 ease-out hover:bg-[#1f2329] hover:text-green-400 hover:ring-2 hover:ring-green-400 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-green-400/60">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;