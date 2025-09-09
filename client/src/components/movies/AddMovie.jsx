import { useState } from 'react';
import { Plus } from 'lucide-react';
import { moviesAPI } from '../../services/api';
import Alert from '../common/Alert';

const AddMovie = ({ onMovieAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'movie'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Movie title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await moviesAPI.create({
        title: formData.title.trim(),
        type: formData.type
      });
      
      if (onMovieAdded) {
        onMovieAdded(response.data.data);
      }
      
      // Reset form
      setFormData({ title: '', type: 'movie' });
      setIsOpen(false);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add movie';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus size={20} />
        <span>Add Movie/Series</span>
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Add to Wishlist</h3>
      
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter movie or series title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Adding...' : 'Add to Wishlist'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setFormData({ title: '', type: 'movie' });
              setError('');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
