import { useState, ChangeEvent } from 'react';
import { ArrowRight, X, Loader2, CheckCircle, AlertTriangle, Upload } from 'lucide-react';
import { supabase } from '@/supabaseClient';

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
    title: 'SynapseHub Internship Program', 
    location: 'Remote',
    type: 'Internship',
    description: 'Join the SynapseHub Internship Program and be part of building India’s next-generation AI-powered booking and commerce platform. You’ll work across product development, marketing, research, and design — gaining hands-on experience in a fast-paced startup environment.',
    responsibilities: [
      'Contribute to real product modules in areas like AI development, frontend, backend, or growth marketing.',
      'Collaborate with mentors and cross-functional teams to bring innovative ideas to life.',
      'Conduct research to improve user experience and product performance.',
      'Assist in content creation, branding, and market outreach campaigns.',
      'Participate in brainstorming sessions and product roadmap discussions.'
    ],
    qualifications: [
      'Students or recent graduates passionate about startups, AI, or digital products.',
      'Strong communication, problem-solving, and teamwork skills.',
      'Self-driven and eager to learn new technologies or business processes.',
      'Ability to manage tasks independently and meet deadlines in a remote setup.'
    ]
  },
  { 
    title: 'Unpaid Learning Internship (AI & Startup Experience)', 
    location: 'Remote',
    type: 'Unpaid Internship',
    description: 'This internship is designed for learners who want to gain exposure to AI technologies, product strategy, and startup operations. It’s a mentorship-based learning experience at SynapseHub, where you’ll work on guided projects to build real-world skills and portfolio-worthy work.',
    responsibilities: [
      'Work on guided AI or web development projects with mentorship from the SynapseHub team.',
      'Participate in knowledge sessions about AI, UI/UX, product management, and entrepreneurship.',
      'Collaborate on open-source or internal components of the SynapseHub ecosystem.',
      'Shadow mentors to understand startup workflows, from ideation to product deployment.'
    ],
    qualifications: [
      'Ideal for students, early professionals, or self-learners seeking hands-on experience.',
      'A genuine interest in technology, innovation, and the startup ecosystem.',
      'Willingness to dedicate time to learn and complete assigned learning modules.',
      'This position is unpaid and focused on upskilling, networking, and mentorship.'
    ]
  }
];


// --- Application Form Component ---
interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

function ApplicationForm({ jobTitle, onClose, onSuccess }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null); // State for the file
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5242880) { // 5MB
        setError('File is too large. Please upload a PDF under 5MB.');
        setResumeFile(null);
      } else if (file.type !== 'application/pdf') {
        setError('Invalid file type. Please upload a PDF.');
        setResumeFile(null);
      } else {
        setError('');
        setResumeFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!resumeFile) {
      setError('Please upload your resume to apply.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // 1. Upload the file to Supabase Storage
      const fileExt = resumeFile.name.split('.').pop();
      const filePath = `${email}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes') // The bucket name
        .upload(filePath, resumeFile);

      if (uploadError) {
        throw new Error(`Storage Error: ${uploadError.message}`);
      }

      // 2. If upload is successful, insert application data into the database
      const { error: insertError } = await supabase
        .from('job_applications')
        .insert({ 
          job_title: jobTitle, 
          name, 
          email, 
          phone, 
          cover_letter: coverLetter,
          resume_url: uploadData.path // Save the path to the file
        });
      
      if (insertError) {
        throw new Error(`Database Error: ${insertError.message}`);
      }
      
      // 3. Success
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
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Tell us why you're interested (Optional)</label>
            <textarea id="coverLetter" rows={4} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40E0D0]" />
          </div>
          
          {/* --- NEW FILE INPUT --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV (PDF only, max 5MB)</label>
            <label 
              htmlFor="resume-upload" 
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {resumeFile ? resumeFile.name : 'Click to upload your PDF'}
              </span>
            </label>
            <input 
              type="file" 
              id="resume-upload" 
              className="hidden" 
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
          
          {error && (
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
  onClose: () => void;
  onApply: () => void;
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
          
          <h4 className="text-xl font-semibold text-gray-900">What You'll Do</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          
          <h4 className="text-xl font-semibold text-gray-900">What We're Looking For</h4>
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
            We're building the future of conversational commerce. If you're passionate about learning and innovation, we'd love to hear from you.
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
            Open Internship Positions
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
