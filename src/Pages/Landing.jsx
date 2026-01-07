function Landing() {
  return (
    <section className="min-h-screen bg-linear-to-b from-black via-gray-500 to-white text-black">

      {/* HERO DIV */}
      <div className="min-h-screen pb-15 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 drop-shadow-lg text-amber-50" >
            Track films you’ve watched.
            <br />
            Save the ones you want to see.
            <br />
            Tell your friends what’s good.
          </h1>

          <button className="bg-green-500 text-black px-8 py-3 rounded font-semibold hover:bg-green-400 transition">
            Get started — it’s free
          </button>
        </div>
      </div>

      {/* INFO DIV */}
      <div className="px-8 py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              WeWatchd lets you
            </h2>

            <p className="text-gray-400 mb-4">
              Track every movie you watch, build personal watchlists,
              rate films, and discover what others are enjoying.
            </p>

            <p className="text-gray-400">
              From casual viewers to serious cinephiles, WeWatchd
              helps you remember and share your movie journey.
            </p>
          </div>

          {/* IMAGE PLACEHOLDERS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-700 rounded"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Landing;
