import { X } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertClasses = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${alertClasses[type]} relative`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:opacity-70"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
