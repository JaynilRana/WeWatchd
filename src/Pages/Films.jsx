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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setError(null);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  return (
    <section className="min-h-screen bg-black text-white px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Popular Films</h1>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <img 
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'} 
              alt={movie.title} 
              className="w-full h-64 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
              <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
            </div>
          </div>
        ))}
      </div>
      
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