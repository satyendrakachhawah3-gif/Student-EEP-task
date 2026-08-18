import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { calculateGrade, calculateSGPA } from '../../utils/helpers';
import { Award, CheckCircle2, Send, FileSpreadsheet, Eye } from 'lucide-react';

export const ResultPublisher = () => {
  const { students, showToast } = useERP();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'STU-2023-01');
  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handlePublishResult = () => {
    showToast(`Semester ${selectedStudent.currentSem} Grade Card published for ${selectedStudent.name}!`, 'success');
  };

  // Convert current marks to preview subjects
  const currentCourses = selectedStudent?.currentCourses || [];
  const markSheetPreview = currentCourses.map((c) => {
    const m = selectedStudent?.currentMarks?.[c.code] || { internal1: 20, internal2: 20, midSem: 25, endSem: 35, practical: 0 };
    const total = (m.internal1 || 0) + (m.internal2 || 0) + (m.midSem || 0) + (m.endSem || 0) + (m.practical || 0);
    const normalizedTotal = Math.min(100, Math.round((total / 180) * 100));
    const { letter, point } = calculateGrade(normalizedTotal);

    return {
      code: c.code,
      name: c.name,
      credits: c.credits || 4,
      totalScore: normalizedTotal,
      grade: letter,
      point
    };
  });

  const previewSGPA = calculateSGPA(
    markSheetPreview.map((item) => ({
      credits: item.credits,
      internalMarks: item.totalScore,
      midSemMarks: 0,
      endSemMarks: 0
    }))
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Semester Results Publisher
          </h2>
          <p className="text-sm text-slate-400">Compile grade cards, calculate SGPA/CGPA, and publish official semester results</p>
        </div>
        <button
          onClick={handlePublishResult}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Send className="w-4 h-4" /> Publish Grade Card Now
        </button>
      </div>

      {/* Selector */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Select Student</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3.5 py-2 rounded-xl glass-input text-sm font-semibold text-indigo-300"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.rollNo}) - Sem {s.currentSem}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-xl">
          <p className="text-xs text-indigo-300 font-semibold">Calculated Semester 5 SGPA Preview</p>
          <p className="text-xl font-extrabold text-indigo-400">{previewSGPA} SGPA</p>
        </div>
      </div>

      {/* Grade Card Table Preview */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-indigo-400" /> Grade Card Draft Preview (Semester {selectedStudent.currentSem})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Course Code</th>
                <th className="px-4 py-3">Subject Name</th>
                <th className="px-4 py-3 text-center">Credits</th>
                <th className="px-4 py-3 text-center">Evaluated Score</th>
                <th className="px-4 py-3 text-center">Grade Letter</th>
                <th className="px-4 py-3 text-right">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {markSheetPreview.map((item) => (
                <tr key={item.code} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-indigo-300">{item.code}</td>
                  <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.credits}</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-200">{item.totalScore} / 100</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300">
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-400">{item.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
