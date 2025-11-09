import { useState } from 'react';
import { ArrowRight, X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../supabaseClient';

// --- Job Data ---
interface Job {
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

const openPositions: Job[] = [
  { 
    title: 'Senior Frontend Engineer (React)', 
    location: 'Remote / Bangalore',
    type: 'Full-time',
    description: 'We are seeking a passionate Senior Frontend Engineer to build and shape the user-facing side of SynapseHub. You will be responsible for turning our vision into a fast, intuitive, and beautiful product.',
    responsibilities: [
      'Develop and maintain user-facing features using React.js and TypeScript.',
      'Collaborate with designers and product managers to translate mockups into responsive, high-quality code.',
      'Optimize components for maximum performance across a vast array of web-capable devices.',
      'Write clean, scalable, and well-tested code.'
    ],
    qualifications: [
      '5+ years of experience in frontend development.',
      'Deep expertise in React, TypeScript, and Tailwind CSS.',
      'Strong understanding of modern web technologies (HTML5, CSS3, ES6+).',
      'Experience with performance optimization and browser-side debugging.'
    ]
  },
  { 
    title: 'Lead AI/ML Engineer (NLP)', 
    location: 'Bangalore',
    type: 'Full-time',
    description: 'As our Lead AI/ML Engineer, you will be at the heart of our core product. You will lead the development of the natural language processing and recommendation engines that power the SynapseHub assistant.',
    responsibilities: [
      'Design, build, and deploy NLP/NLU models for our conversational AI.',
      'Develop recommendation algorithms to personalize user experience.',
      'Collaborate with backend engineers to integrate models into our production environment.',
      'Stay up-to-date with the latest advancements in AI and Large Language Models.'
    ],
    qualifications: [
      '5+ years of experience in AI/ML with a focus on NLP.',
      'Proven experience with Python and ML frameworks (TensorFlow, PyTorch).',
      'Experience with transformer models (e.g., BERT, GPT) and fine-tuning.',
      'Strong background in data structures, algorithms, and system design.'
    ]
  },
  { 
    title: 'Product Manager - Conversational AI', 
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a Product Manager to own the roadmap for our AI assistant. You will define the user experience, prioritize features, and work closely with engineering and design to build a world-class product.',
    responsibilities: [
      'Define the product vision, strategy, and roadmap for the SynapseHub AI assistant.',
      'Gather and prioritize product and customer requirements.',
      'Work with design to create intuitive conversational flows and user interfaces.',
      'Analyze product metrics to measure success and identify areas for improvement.'
    ],
    qualifications: [
      '3+ years of Product Management experience, preferably in a B2C tech company.',
      'Experience with AI or machine learning products is a huge plus.',
      'Excellent analytical and problem-solving skills.',
      'Strong communication and leadership abilities.'
    ]
  },
];

// --- Application Form Component ---
interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;    // <-- FIX HERE
  onSuccess: () => void;  // <-- FIX HERE (This was line 76)
}

function ApplicationForm({ jobTitle, onClose, onSuccess }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  // NOTE: File upload to Supabase Storage is complex.
  // For now, we will just submit the text fields and a placeholder resume.
  // A real implementation would use storage.from('resumes').upload(...)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('job_applications')
        .insert({ 
          job_title: jobTitle, 
          name, 
          email, 
          phone, 
          cover_letter: coverLetter,
          resume_url: 'placeholder.pdf' // Placeholder for file upload
        });
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      setStatus('idle');
      onSuccess(); // Show the success message in the parent
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to submit: ${errorMessage}`);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl m-4 rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for</h2>
            <h3 className="text-xl text-[#40E0D0]">{jobTitle}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]" required />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]" />
          </div>
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
            <textarea id="coverLetter" rows={4} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
            <p className="text-sm p-4 bg-gray-50 rounded-lg border border-gray-200">
              Note: Resume upload is not implemented in this demo. Submitting will send a placeholder.
            </p>
          </div>
          
          {status === 'error' && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="pt-4">
            <button type="submit" disabled={status === 'loading'} className="w-full bg-[#40E0D0] text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all disabled:bg-gray-400">
              {status === 'loading' ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Submitting...
                </div>
              ) : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Job Description Modal Component ---
interface JobModalProps {
  job: Job;
  onClose: () => void;  // <-- FIX HERE
  onApply: () => void;  // <-- FIX HERE
}

function JobModal({ job, onClose, onApply }: JobModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl m-4 rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h2>
              <p className="text-gray-600">{job.location} • {job.type}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
          
          <h4 className="text-xl font-semibold text-gray-900">Responsibilities</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h4 className="text-xl font-semibold text-gray-900">Qualifications</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.qualifications.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={onApply}
            className="w-full bg-[#40E0D0] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Apply for this position
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Careers Component ---
function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenJob = (job: Job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(false);
    setShowSuccess(false);
  };
  
  const handleCloseModals = () => {
    setSelectedJob(null);
    setIsApplyFormOpen(false);
  };

  const handleOpenApplyForm = () => {
    if (selectedJob) {
      setIsApplyFormOpen(true);
    }
  };

  const handleApplicationSuccess = () => {
    setIsApplyFormOpen(false);
    setSelectedJob(null);
    setShowSuccess(true);
  };

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-[#F7FAFC]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We are building the future of conversational commerce and AI-powered decision making. If you are passionate about technology and innovation, we'd love to have you.
          </p>
        </div>

        {showSuccess && (
          <div className="max-w-3xl mx-auto mb-8 p-6 bg-green-50 border border-green-300 rounded-2xl text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-800">Application Submitted!</h3>
            <p className="text-green-700">Thank you for applying. We've received your application and will be in touch soon.</p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8">
            Open Positions
          </h2>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 divide-y divide-gray-100">
            {openPositions.map((job, index) => (
              <button
                key={index}
                onClick={() => handleOpenJob(job)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#1A202C]">{job.title}</h3>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="text-[#40E0D0]">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-[#1A202C] mb-4">
              Don't see your role?
            </h3>
            <p className="text-gray-600 mb-6">
              We are always looking for talented people. Send us your resume and tell us why you'd be a great fit.
            </p>
            <a href="mailto:careers@synapsehub.com" className="inline-block bg-[#40E0D0] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              Email Your Resume
            </a>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {selectedJob && !isApplyFormOpen && (
        <JobModal 
          job={selectedJob} 
          onClose={handleCloseModals} 
          onApply={handleOpenApplyForm} 
        />
      )}
      
      {selectedJob && isApplyFormOpen && (
        <ApplicationForm 
          jobTitle={selectedJob.title} 
          onClose={handleCloseModals}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </section>
  );
}

export default Careers;
