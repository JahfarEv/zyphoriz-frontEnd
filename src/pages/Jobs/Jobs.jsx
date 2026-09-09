import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Modal } from '../../components/common/Modal';
import { jobs as initialJobs } from '../../data/jobs';

export const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('Malappuram');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');

  const filteredJobs = initialJobs.filter((j) => {
    const matchesSearch =
      !searchTerm ||
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || j.jobType === selectedType;

    return matchesSearch && matchesType;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedJob(null);
      setApplySuccess(false);
      setApplicantName('');
      setApplicantPhone('');
    }, 1800);
  };

  return (
    <main className="w-full px-margin-mobile md:px-margin-desktop py-8">
      <Breadcrumb items={[{ label: 'Local Jobs & Opportunities' }]} />

      {/* Header Banner */}
      <div className="bg-primary-container rounded-3xl p-8 md:p-12 text-on-primary mb-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-3">
            <Briefcase className="w-4 h-4 text-secondary-container" /> Local Employment Opportunities
          </span>
          <h1 className="font-headline text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Find Local Jobs in Malappuram
          </h1>
          <p className="font-sans text-sm md:text-base text-on-primary/80 mb-6">
            Connect directly with hiring local businesses, stores, clinics, and service providers near you.
          </p>

          {/* Search Box */}
          <div className="bg-surface p-2 rounded-2xl shadow-md border border-outline-variant/30 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center bg-surface px-3 py-2.5 rounded-xl">
              <Search className="w-5 h-5 text-outline mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, skill, or business..."
                className="w-full bg-transparent border-none text-on-surface font-sans text-sm placeholder:text-outline focus:outline-none"
              />
            </div>
            <div className="flex-1 flex items-center bg-surface px-3 py-2.5 rounded-xl border-t sm:border-t-0 sm:border-l border-outline-variant/30">
              <MapPin className="w-5 h-5 text-outline mr-2" />
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="Location"
                className="w-full bg-transparent border-none text-on-surface font-sans text-sm placeholder:text-outline focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-outline-variant/20 flex-wrap">
        <div className="flex gap-2">
          {['All', 'Full-Time', 'Part-Time'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full font-sans text-xs font-semibold transition-colors ${
                selectedType === type
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="font-sans text-xs text-outline">
          Showing {filteredJobs.length} local opportunities
        </span>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">{job.title}</h3>
                  <p className="font-sans text-xs font-semibold text-primary">{job.businessName}</p>
                </div>
                {job.urgent && <Badge variant="trending">Urgent</Badge>}
              </div>

              <p className="font-sans text-xs text-on-surface-variant line-clamp-2 my-3">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-outline mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> {job.jobType}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-secondary font-semibold">
                  <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="font-sans text-[11px] text-outline">Posted {job.postedDate}</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedJob(job)}
              >
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={selectedJob ? `Apply for ${selectedJob.title}` : ''}
      >
        {applySuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-headline text-lg font-bold text-on-surface">Application Sent!</h4>
            <p className="font-sans text-sm text-on-surface-variant">
              Your application has been forwarded directly to {selectedJob?.businessName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="space-y-4">
            <p className="font-sans text-xs text-on-surface-variant">
              Position at <span className="font-bold text-on-surface">{selectedJob?.businessName}</span> ({selectedJob?.location})
            </p>

            <div>
              <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase mb-1 block">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 font-sans text-sm"
              />
            </div>

            <div>
              <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase mb-1 block">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                placeholder="+91 98470 00000"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 font-sans text-sm"
              />
            </div>

            <div>
              <label className="font-sans text-xs font-semibold text-on-surface-variant uppercase mb-1 block">
                Work Experience / Brief Intro
              </label>
              <textarea
                rows={3}
                placeholder="Mention your relevant qualifications or experience..."
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 font-sans text-sm"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3">
              Submit Application
            </Button>
          </form>
        )}
      </Modal>
    </main>
  );
};
