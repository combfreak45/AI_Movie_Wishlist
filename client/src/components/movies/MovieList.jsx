import { useState, useEffect } from 'react';
import { moviesAPI } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import MovieCard from './MovieCard';
import AddMovie from './AddMovie';
import Loading from '../common/Loading';
import Alert from '../common/Alert';

const MovieList = ({ status, title }) => {
  const [movies, setMovies] = useState([]);
  const { data, loading, error, execute } = useApi(() => moviesAPI.getAll(status), false);

  useEffect(() => {
    loadMovies();
  }, [status]);

  useEffect(() => {
    if (data) {
      setMovies(data.data || []);
    }
  }, [data]);

  const loadMovies = async () => {
    await execute(status);
  };

  const handleMovieAdded = (newMovie) => {
    if (!status || newMovie.status === status) {
      setMovies(prev => [newMovie, ...prev]);
    }
  };

  const handleMovieUpdate = (updatedMovie) => {
    if (status && updatedMovie.status !== status) {
      // Remove from current list if status changed
      setMovies(prev => prev.filter(m => m._id !== updatedMovie._id));
    } else {
      // Update in current list
      setMovies(prev => prev.map(m => m._id === updatedMovie._id ? updatedMovie : m));
    }
  };

  const handleMovieDelete = (movieId) => {
    setMovies(prev => prev.filter(m => m._id !== movieId));
  };

  if (loading && movies.length === 0) {
    return <Loading message="Loading movies..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {title} ({movies.length})
        </h2>
        {!status && <AddMovie onMovieAdded={handleMovieAdded} />}
      </div>

      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => window.location.reload()} 
        />
      )}

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {status === 'wishlist' ? 'No movies in your wishlist yet' : 
             status === 'watched' ? 'No watched movies yet' : 
             'No movies added yet'}
          </div>
          {!status && (
            <p className="text-gray-400">
              Add your first movie or series to get started!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onUpdate={handleMovieUpdate}
              onDelete={handleMovieDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
