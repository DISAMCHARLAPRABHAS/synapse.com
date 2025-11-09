import { useState, FormEvent, useEffect } from 'react';
import { X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setError('');
      setName('');
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setError('');

    // This is a mock submission.
    // In a real app, you would call:
    // const { error } = await supabase.from('waitlist').insert({ name, email });
    // For now, we just simulate a success or error.

    setTimeout(() => {
      if (email.includes('error')) {
        setError('This email address seems invalid.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    }, 1500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md m-4 p-8 rounded-2xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">You're on the list!</h2>
            <p className="text-gray-600 mb-6">Thank you for joining the waitlist. We'll be in touch soon!</p>
            <button
              onClick={onClose}
              className="w-full bg-[#40E0D0] text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
              <p className="text-gray-600">Be the first to know when SynapseHub goes live.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">{error || 'Something went wrong. Please try again.'}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#40E0D0] text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all disabled:bg-gray-400"
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  'Join Now'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitlistModal;
