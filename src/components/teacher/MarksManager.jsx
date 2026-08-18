import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { useAuth } from '../../context/AuthContext';
import { calculateGrade } from '../../utils/helpers';
import { Award, Save, Edit3, CheckCircle, Calculator } from 'lucide-react';

export const MarksManager = () => {
  const { user } = useAuth();
  const { students, updateStudentMarks } = useERP();

  const assignedSubjects = user?.assignedSubjects || [
    { code: 'CS501', name: 'Data Structures & Algorithms', sem: 5 },
    { code: 'CS502', name: 'Operating Systems', sem: 5 }
  ];

  const [selectedSubject, setSelectedSubject] = useState(assignedSubjects[0]?.code || 'CS501');

  const targetSubject = assignedSubjects.find((s) => s.code === selectedSubject) || assignedSubjects[0];

  const classStudents = students.filter((s) => {
    return (
      s.currentCourses?.some((c) => c.code === selectedSubject) ||
      s.currentSem === targetSubject.sem
    );
  });

  const handleScoreChange = (studentId, markType, val) => {
    updateStudentMarks(studentId, selectedSubject, markType, val);
  };

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Student Marks & Grading Desk
          </h2>
          <p className="text-sm text-slate-400">
            Enter and update internal assessments, mid-sem, end-sem, and practical scores
          </p>
        </div>
      </div>

      {/* Subject Filter Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Select Subject / Course</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3.5 py-2 rounded-xl glass-input text-sm font-semibold text-indigo-300"
          >
            {assignedSubjects.map((sub) => (
              <option key={sub.code} value={sub.code}>
                {sub.code} - {sub.name} (Semester {sub.sem})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800">
          <Calculator className="w-4 h-4 text-indigo-400" /> Auto Grading Enabled (A+ to F Scale)
        </div>
      </div>

      {/* Marks Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-4 py-4 text-center">Int 1 (25)</th>
                <th className="px-4 py-4 text-center">Int 2 (25)</th>
                <th className="px-4 py-4 text-center">Mid Sem (30)</th>
                <th className="px-4 py-4 text-center">End Sem (50)</th>
                <th className="px-4 py-4 text-center">Practical (50)</th>
                <th className="px-4 py-4 text-center">Total Score</th>
                <th className="px-6 py-4 text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-400">
                    No students enrolled for this subject.
                  </td>
                </tr>
              ) : (
                classStudents.map((s) => {
                  const m = s.currentMarks?.[selectedSubject] || {
                    internal1: 0,
                    internal2: 0,
                    midSem: 0,
                    endSem: 0,
                    practical: 0
                  };

                  const total = (m.internal1 || 0) + (m.internal2 || 0) + (m.midSem || 0) + (m.endSem || 0) + (m.practical || 0);
                  // Scaled score to 100 ratio
                  const normalizedTotal = Math.min(100, Math.round((total / 180) * 100));
                  const { letter, color } = calculateGrade(normalizedTotal);

                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.rollNo}</p>
                        </div>
                      </td>

                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={m.internal1 || 0}
                          onChange={(e) => handleScoreChange(s.id, 'internal1', e.target.value)}
                          className="w-16 px-2 py-1 text-center rounded-lg glass-input text-xs font-semibold"
                        />
                      </td>

                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={m.internal2 || 0}
                          onChange={(e) => handleScoreChange(s.id, 'internal2', e.target.value)}
                          className="w-16 px-2 py-1 text-center rounded-lg glass-input text-xs font-semibold"
                        />
                      </td>

                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={m.midSem || 0}
                          onChange={(e) => handleScoreChange(s.id, 'midSem', e.target.value)}
                          className="w-16 px-2 py-1 text-center rounded-lg glass-input text-xs font-semibold"
                        />
                      </td>

                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={m.endSem || 0}
                          onChange={(e) => handleScoreChange(s.id, 'endSem', e.target.value)}
                          className="w-16 px-2 py-1 text-center rounded-lg glass-input text-xs font-semibold"
                        />
                      </td>

                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={m.practical || 0}
                          onChange={(e) => handleScoreChange(s.id, 'practical', e.target.value)}
                          className="w-16 px-2 py-1 text-center rounded-lg glass-input text-xs font-semibold"
                        />
                      </td>

                      <td className="px-4 py-3 text-center font-bold text-white">
                        {total}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${color}`}>
                          {letter} ({normalizedTotal}%)
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
