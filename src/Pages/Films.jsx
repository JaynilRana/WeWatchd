import { useState, useEffect } from 'react';
import axios from 'axios';  

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';  // For posters

function Films() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState('vote_average.desc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const tmdbPage1 = (currentPage - 1) * 2 + 1;
        const tmdbPage2 = tmdbPage1 + 1;
        let baseUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&vote_count.gte=300`;
        if (sortBy === 'release_date.desc') {
          const today = new Date().toISOString().split('T')[0];
          baseUrl += `&primary_release_date.lte=${today}`;
        }
        if (selectedGenre) baseUrl += `&with_genres=${selectedGenre}`;
        if (selectedDecade) {
          const startYear = selectedDecade;
          const endYear = (parseInt(selectedDecade) + 9).toString();
          baseUrl += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
        }
        if (selectedService) baseUrl += `&with_watch_providers=${selectedService}&watch_region=US`;
        const url1 = `${baseUrl}&page=${tmdbPage1}`;
        const url2 = `${baseUrl}&page=${tmdbPage2}`;
        const [res1, res2] = await Promise.all([
          axios.get(url1),
          axios.get(url2)
        ]);
        const combinedMovies = [...res1.data.results, ...res2.data.results];
        setMovies(combinedMovies);
        setTotalPages(Math.ceil(res1.data.total_pages / 2));
        setError(null);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, sortBy, selectedGenre, selectedDecade, selectedService]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetFilters = () => {
    setSortBy('vote_average.desc');
    setSelectedGenre('');
    setSelectedDecade('');
    setSelectedService('');
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-green-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const decades = ['2020', '2010', '2000', '1990', '1980', '1970', '1960', '1950', '1940', '1930'];
  const services = [
    { id: 8, name: 'Netflix' },
    { id: 9, name: 'Amazon Prime' },
    { id: 337, name: 'Disney+' },
    { id: 15, name: 'Hulu' },
    // Add more as needed
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-8 py-4 -mt-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Films</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="bg-gray-800 text-white px-4 py-2 rounded">
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Latest</option>
          <option value="title.asc">A-Z</option>
        </select>
        <select value={selectedGenre} onChange={(e) => { setSelectedGenre(e.target.value); setCurrentPage(1); }} className="bg-gray-800 text-white px-4 py-2 rounded">
          <option value="">All Genres</option>
          {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
        </select>
        <select value={selectedDecade} onChange={(e) => { setSelectedDecade(e.target.value); setCurrentPage(1); }} className="bg-gray-800 text-white px-4 py-2 rounded">
          <option value="">All Decades</option>
          {decades.map(decade => <option key={decade} value={decade}>{decade}s</option>)}
        </select>
        <select value={selectedService} onChange={(e) => { setSelectedService(e.target.value); setCurrentPage(1); }} className="bg-gray-800 text-white px-4 py-2 rounded">
          <option value="">All Services</option>
          {services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
        </select>
        <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Reset Filters
        </button>
      </div>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <img 
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'} 
              alt={movie.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
              <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
            </div>
          </div>
        ))}
      </div>
      
      {!loading && movies.length === 0 && (
        <p className="text-white text-center mt-8">No match found. Try changing filters.</p>
      )}
      
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default Films;