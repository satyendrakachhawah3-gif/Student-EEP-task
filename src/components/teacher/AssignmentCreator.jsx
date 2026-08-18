import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { BookOpen, Plus, Calendar, CheckCircle2, Clock, ExternalLink, Award, MessageSquare } from 'lucide-react';

export const AssignmentCreator = () => {
  const { user } = useAuth();
  const { assignments, createAssignment, gradeAssignment } = useERP();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [gradingSubmission, setGradingSubmission] = useState(null);

  // Form State for new Assignment
  const [newAsn, setNewAsn] = useState({
    title: '',
    subjectCode: 'CS501',
    dueDate: '2026-09-01',
    maxPoints: 50,
    description: '',
    attachments: ''
  });

  // Form state for grading submission
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createAssignment({
      ...newAsn,
      subjectName: newAsn.subjectCode === 'CS501' ? 'Data Structures & Algorithms' : 'Operating Systems',
      assignedBy: user?.name || 'Prof. Sarah Jenkins',
      attachments: newAsn.attachments ? [newAsn.attachments] : []
    });
    setIsCreateModalOpen(false);
    setNewAsn({
      title: '',
      subjectCode: 'CS501',
      dueDate: '2026-09-01',
      maxPoints: 50,
      description: '',
      attachments: ''
    });
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (selectedAssignment && gradingSubmission) {
      gradeAssignment(
        selectedAssignment.id,
        gradingSubmission.studentId,
        gradeInput,
        feedbackInput
      );
      setGradingSubmission(null);
      // Refresh selected assignment in modal
      const updated = assignments.find((a) => a.id === selectedAssignment.id);
      if (updated) setSelectedAssignment(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Assignment & Lab Desk
          </h2>
          <p className="text-sm text-slate-400">Post course assignments, view student submissions, and grade work</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      {/* Assignments List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((asn) => {
          const totalSubmissions = asn.submissions.length;
          const gradedCount = asn.submissions.filter((s) => s.status === 'GRADED').length;

          return (
            <div
              key={asn.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
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
                <p className="text-xs text-slate-300 line-clamp-2">{asn.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400">{totalSubmissions} Submissions</span> ({gradedCount} Graded)
                </div>
                <button
                  onClick={() => setSelectedAssignment(asn)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                >
                  View Submissions ({totalSubmissions})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Assignment Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Course Assignment">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Assignment Title</label>
            <input
              type="text"
              required
              value={newAsn.title}
              onChange={(e) => setNewAsn({ ...newAsn, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              placeholder="e.g. Red-Black Tree Implementation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Subject Code</label>
              <select
                value={newAsn.subjectCode}
                onChange={(e) => setNewAsn({ ...newAsn, subjectCode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                <option value="CS501">CS501 - Data Structures</option>
                <option value="CS502">CS502 - Operating Systems</option>
                <option value="CS503">CS503 - Database Systems</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Due Date</label>
              <input
                type="date"
                required
                value={newAsn.dueDate}
                onChange={(e) => setNewAsn({ ...newAsn, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Max Score Points</label>
              <input
                type="number"
                required
                value={newAsn.maxPoints}
                onChange={(e) => setNewAsn({ ...newAsn, maxPoints: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Instructions / Description</label>
            <textarea
              rows="3"
              required
              value={newAsn.description}
              onChange={(e) => setNewAsn({ ...newAsn, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              placeholder="Provide problem statement, guidelines, and submission format..."
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Attachment Resource URL (Optional)</label>
            <input
              type="text"
              value={newAsn.attachments}
              onChange={(e) => setNewAsn({ ...newAsn, attachments: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              placeholder="https://college.edu/resources/lab_guide.pdf"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25"
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>

      {/* Submissions Viewer Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={Boolean(selectedAssignment)}
          onClose={() => setSelectedAssignment(null)}
          title={`Submissions - ${selectedAssignment.title}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4">
            {selectedAssignment.submissions.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No student submissions recorded yet.</p>
            ) : (
              selectedAssignment.submissions.map((sub) => (
                <div key={sub.studentId} className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{sub.studentName}</h4>
                      <p className="text-xs text-slate-400">Submitted on {sub.submittedOn}</p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        sub.status === 'GRADED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {sub.status === 'GRADED' ? `Score: ${sub.score} / ${selectedAssignment.maxPoints}` : 'Awaiting Grade'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                    {sub.solutionNotes}
                  </p>

                  {sub.contentLink && (
                    <a
                      href={sub.contentLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {sub.contentLink}
                    </a>
                  )}

                  {sub.feedback && (
                    <div className="text-xs text-slate-400 italic">
                      <span className="font-semibold text-slate-300">Feedback:</span> "{sub.feedback}"
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setGradingSubmission(sub);
                        setGradeInput(sub.score || '');
                        setFeedbackInput(sub.feedback || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-semibold border border-indigo-500/30"
                    >
                      {sub.status === 'GRADED' ? 'Edit Grade' : 'Grade Submission'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>
      )}

      {/* Grade Submission Modal */}
      {gradingSubmission && (
        <Modal
          isOpen={Boolean(gradingSubmission)}
          onClose={() => setGradingSubmission(null)}
          title={`Grade Work: ${gradingSubmission.studentName}`}
        >
          <form onSubmit={handleSaveGrade} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Score Points (Max {selectedAssignment?.maxPoints})
              </label>
              <input
                type="number"
                required
                min="0"
                max={selectedAssignment?.maxPoints}
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm font-semibold text-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Teacher Feedback Notes</label>
              <textarea
                rows="3"
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="Provide constructive feedback..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setGradingSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25"
              >
                Save Score & Feedback
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
