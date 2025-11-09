import { useState } from 'react';
import { Loader2, Mail, Phone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../supabaseClient'; // <-- Import Supabase

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert({ name, email, message });

      if (supabaseError) {
        throw supabaseError;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to submit: ${errorMessage}`);
      setStatus('error');
    }
  };

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          We'd love to hear from you. Please fill out the form below or contact us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]"
                    placeholder="How can we help?"
                    required
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
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
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#1A202C]">Contact Information</h3>
            <p className="text-lg text-gray-600">
              Find us at our office or get in touch via email or phone.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#40E0D0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Our Office</h4>
                  <p className="text-gray-600">[Placeholder] 123 Synapse St, Tech Park, India</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#40E0D0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="text-gray-600">hello@synapsehub.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#40E0D0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="text-gray-600">+91 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
