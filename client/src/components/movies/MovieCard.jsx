import { useState } from 'react';
import { Star, Eye, Trash2, RotateCcw } from 'lucide-react';
import { moviesAPI } from '../../services/api';
import RatingModal from './RatingModal';

const MovieCard = ({ movie, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMarkAsWatched = () => {
    setShowRatingModal(true);
  };

  const handleMoveToWishlist = async () => {
    try {
      setLoading(true);
      const response = await moviesAPI.update(movie._id, {
        status: 'wishlist',
        rating: null,
        comment: ''
      });
      
      if (onUpdate) {
        onUpdate(response.data.data);
      }
    } catch (error) {
      console.error('Error moving to wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      setLoading(true);
      await moviesAPI.delete(movie._id);
      
      if (onDelete) {
        onDelete(movie._id);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {movie.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                {movie.type}
              </span>
              <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {movie.status}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-red-600 hover:text-red-800 disabled:opacity-50"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Added:</span> {formatDate(movie.dateAdded)}
          </div>

          {movie.status === 'watched' && movie.dateWatched && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Watched:</span> {formatDate(movie.dateWatched)}
            </div>
          )}

          {movie.rating && (
            <div>
              <span className="font-medium text-sm text-gray-700">Rating:</span>
              <div className="mt-1">{renderStars(movie.rating)}</div>
            </div>
          )}

          {movie.comment && (
            <div>
              <span className="font-medium text-sm text-gray-700">Comment:</span>
              <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                {movie.comment}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex space-x-2">
          {movie.status === 'wishlist' ? (
            <button
              onClick={handleMarkAsWatched}
              disabled={loading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Eye size={16} />
              <span>Mark as Watched</span>
            </button>
          ) : (
            <button
              onClick={handleMoveToWishlist}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw size={16} />
              <span>Move to Wishlist</span>
            </button>
          )}

          {movie.status === 'watched' && (
            <button
              onClick={() => setShowRatingModal(true)}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              <Star size={16} />
              <span>Edit Rating</span>
            </button>
          )}
        </div>
      </div>

      <RatingModal
        movie={movie}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default MovieCard;
