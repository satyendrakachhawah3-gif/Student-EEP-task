import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { calculateGrade, formatCurrency, getAttendanceColor } from '../../utils/helpers';
import { BookMarked, Calendar, CheckSquare, Award, Clock, FileText, CreditCard } from 'lucide-react';

export const CurrentSemesterView = () => {
  const { user } = useAuth();

  const currentCourses = user?.currentCourses || [];
  const currentMarks = user?.currentMarks || {};
  const currentAttendance = user?.currentAttendance || {};
  const fee = user?.currentFee || {};

  // Mock weekly schedule
  const timetable = [
    { day: 'Monday', slots: ['CS501 (09:00 - 10:30 AM)', 'CS502 (11:00 - 12:30 PM)', 'CS504 Lab (02:00 - 04:00 PM)'] },
    { day: 'Tuesday', slots: ['CS503 (09:00 - 10:30 AM)', 'CS505 (11:00 - 12:30 PM)', 'Library/Self Study (02:00 PM)'] },
    { day: 'Wednesday', slots: ['CS501 (09:00 - 10:30 AM)', 'CS502 (11:00 - 12:30 PM)', 'CS503 (02:00 - 03:30 PM)'] },
    { day: 'Thursday', slots: ['CS505 (09:00 - 10:30 AM)', 'CS504 Lab (11:00 - 01:00 PM)', 'CS501 (02:00 - 03:30 PM)'] },
    { day: 'Friday', slots: ['CS502 (09:00 - 10:30 AM)', 'CS503 (11:00 - 12:30 PM)', 'Seminar & Mentorship (02:00 PM)'] }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-indigo-400" /> Current Academic Year & Semester View
        </h2>
        <p className="text-sm text-slate-400">
          Year {user?.currentYear} • Semester {user?.currentSem} ({user?.department})
        </p>
      </div>

      {/* 1. Enrolled Courses Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-indigo-400" /> Enrolled Subjects & Faculty
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Course Code</th>
                <th className="px-4 py-3">Subject Title</th>
                <th className="px-4 py-3 text-center">Credits</th>
                <th className="px-4 py-3">Assigned Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {currentCourses.map((c) => (
                <tr key={c.code} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-indigo-300">{c.code}</td>
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-200">{c.credits} Credits</td>
                  <td className="px-4 py-3 text-slate-400">{c.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Attendance & Marks Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Attendance Breakdown */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" /> Subject Attendance Breakdown
          </h3>

          <div className="space-y-3">
            {currentCourses.map((c) => {
              const att = currentAttendance[c.code] || { attended: 30, total: 34, percentage: 88 };
              const isWarning = att.percentage < 75;

              return (
                <div key={c.code} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 mr-2">{c.code}</span>
                      <span className="text-xs font-semibold text-white">{c.name}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        isWarning ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {att.percentage}%
                    </span>
                  </div>

                  {/* Attendance Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isWarning ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${att.percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>
                      Attended: <strong className="text-slate-200">{att.attended}</strong> / {att.total} Lectures
                    </span>
                    {isWarning && <span className="text-rose-400 font-bold">Shortage Warning!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Internal Scores */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" /> Internal Evaluation & Test Marks
          </h3>

          <div className="space-y-3">
            {currentCourses.map((c) => {
              const m = currentMarks[c.code] || { internal1: 22, internal2: 23, midSem: 26, endSem: 38, practical: 0 };
              const total = (m.internal1 || 0) + (m.internal2 || 0) + (m.midSem || 0) + (m.endSem || 0) + (m.practical || 0);

              return (
                <div key={c.code} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 mr-2">{c.code}</span>
                      <span className="text-xs font-semibold text-white">{c.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Total: {total} / 100</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    <div className="bg-slate-800/60 p-1.5 rounded border border-slate-800">
                      <p className="text-slate-400">Int 1</p>
                      <p className="font-bold text-white">{m.internal1 || 0}</p>
                    </div>
                    <div className="bg-slate-800/60 p-1.5 rounded border border-slate-800">
                      <p className="text-slate-400">Int 2</p>
                      <p className="font-bold text-white">{m.internal2 || 0}</p>
                    </div>
                    <div className="bg-slate-800/60 p-1.5 rounded border border-slate-800">
                      <p className="text-slate-400">Mid Sem</p>
                      <p className="font-bold text-white">{m.midSem || 0}</p>
                    </div>
                    <div className="bg-slate-800/60 p-1.5 rounded border border-slate-800">
                      <p className="text-slate-400">End Sem / Prac</p>
                      <p className="font-bold text-white">{m.endSem || m.practical || 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Live Lecture Timetable Schedule */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" /> Weekly Course Lecture Timetable
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {timetable.map((t) => (
            <div key={t.day} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 uppercase">{t.day}</h4>
              <div className="space-y-1.5">
                {t.slots.map((slot, i) => (
                  <div key={i} className="text-[11px] p-2 rounded bg-slate-800/80 text-slate-200 font-medium">
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
