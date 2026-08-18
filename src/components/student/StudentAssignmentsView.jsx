import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useERP } from '../../context/ERPContext';
import { Modal } from '../common/Modal';
import { BookOpen, Calendar, CheckCircle2, Clock, Upload, ExternalLink, Award, MessageSquare } from 'lucide-react';

export const StudentAssignmentsView = () => {
  const { user } = useAuth();
  const { assignments, submitAssignment } = useERP();

  const [submittingAsn, setSubmittingAsn] = useState(null);
  const [solutionNotes, setSolutionNotes] = useState('');
  const [contentLink, setContentLink] = useState('');

  const handleSubmissionSubmit = (e) => {
    e.preventDefault();
    if (submittingAsn) {
      submitAssignment(
        submittingAsn.id,
        user.id,
        user.name,
        solutionNotes,
        contentLink
      );
      setSubmittingAsn(null);
      setSolutionNotes('');
      setContentLink('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" /> Course Assignments & Lab Tasks
        </h2>
        <p className="text-sm text-slate-400">View course assignments, submit your solutions, and track teacher grades</p>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((asn) => {
          const mySub = asn.submissions?.find((s) => s.studentId === user?.id);
          const isSubmitted = Boolean(mySub);
          const isGraded = mySub?.status === 'GRADED';

          return (
            <div
              key={asn.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {asn.subjectCode}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Due: {asn.dueDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{asn.title}</h3>
                <p className="text-xs text-slate-300">{asn.description}</p>

                {asn.attachments?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1 pt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Attached Lab Guide PDF
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                {mySub ? (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Submitted on {mySub.submittedOn}
                      </span>
                      {isGraded ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Score: {mySub.score} / {asn.maxPoints}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          Under Evaluation
                        </span>
                      )}
                    </div>

                    {mySub.feedback && (
                      <p className="text-slate-300 italic">
                        <span className="font-semibold text-slate-400">Teacher Feedback:</span> "{mySub.feedback}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-medium">Pending Submission</span>
                    <button
                      onClick={() => {
                        setSubmittingAsn(asn);
                        setSolutionNotes(mySub?.solutionNotes || '');
                        setContentLink(mySub?.contentLink || '');
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Submit Assignment
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {submittingAsn && (
        <Modal
          isOpen={Boolean(submittingAsn)}
          onClose={() => setSubmittingAsn(null)}
          title={`Submit Assignment - ${submittingAsn.title}`}
        >
          <form onSubmit={handleSubmissionSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Solution Notes / Key Highlights</label>
              <textarea
                rows="3"
                required
                value={solutionNotes}
                onChange={(e) => setSolutionNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="Describe your solution approach, algorithm details, or execution instructions..."
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Project Link / GitHub Repo / Drive URL</label>
              <input
                type="url"
                required
                value={contentLink}
                onChange={(e) => setContentLink(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="https://github.com/username/project-repo"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSubmittingAsn(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25"
              >
                Upload & Turn In
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
