import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim()) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Insert into database
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            user_type: formData.userType || null
          }
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          setError(insertError.message || 'Failed to join waitlist');
        }
        setIsLoading(false);
        return;
      }

      // Show success state
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', userType: '' });

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-[#1A202C]">Join the Waitlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="bg-[#4ECDC4] rounded-full p-3">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A202C] mb-2">You're on the Waitlist!</h3>
              <p className="text-gray-600">
                We'll notify you when SynapseHub goes live 🚀
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-[#FF6B6B] rounded-lg p-3">
                  <p className="text-sm text-[#FF6B6B]">{error}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#40E0D0] focus:ring-2 focus:ring-[#40E0D0]/20 transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#40E0D0] focus:ring-2 focus:ring-[#40E0D0]/20 transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#40E0D0] focus:ring-2 focus:ring-[#40E0D0]/20 transition-colors"
                />
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1A202C] mb-2">
                  Type of User (Optional)
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#40E0D0] focus:ring-2 focus:ring-[#40E0D0]/20 transition-colors"
                >
                  <option value="">Select one...</option>
                  <option value="Traveler">Traveler</option>
                  <option value="Shopper">Shopper</option>
                  <option value="Student">Student</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#40E0D0] text-white font-semibold py-3 rounded-lg hover:bg-[#2BC4BC] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitlistModal;
