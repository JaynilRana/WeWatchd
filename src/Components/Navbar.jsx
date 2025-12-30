function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-10 px-8 py-6 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">
        WeWatchd
      </h1>

      <div className="flex gap-6 text-sm">
        <button className="hover:text-green-400">Films</button>
        <button className="hover:text-green-400">Lists</button>
        <button className="hover:text-green-400">Login</button>
        <button className="bg-green-500 text-black px-4 py-1 rounded font-medium hover:bg-green-400">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
