function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-10 px-8 py-6 flex justify-between items-center">

      {/* LOGO + TITLE */}
      <div className="flex items-center gap-3">
        {/* Logo placeholder */}
        <div className="w-35 h-20 rounded flex items-center justify-center font-bold text-black">
          <img src="src\assetsPictures\LOGO-1_text.png" alt="" />
        </div>

        {/* Website title */}
        <h1 className="text-xl font-bold tracking-wide">
          WeWatchd
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-6 text-sm items-center">
       {["Films", "Lists", "Login"].map((item) => (
        <button
          key={item}
          className=" px-3 py-1.5 rounded-md text-white font-medium transition-all duration-200 ease-out hover:text-green-400  hover:bg-[#1f2329]  hover:-translate-y-[1px]focus:outline-none focus:ring-2 focus:ring-green-400/50" >
          {item}
        </button>
        )
          ) 
            }

        <button className="px-4 py-1.5 rounded-md font-semibold bg-green-500 text-black transition-all duration-200 ease-out hover:bg-[#1f2329] hover:text-green-400 hover:ring-2 hover:ring-green-400 hover:-translate-y-[1px] focus:outline-none  focus:ring-2 focus:ring-green-400/60" >
         Sign Up
        </button>

      </div>

    </nav>
  );
}

export default Navbar;