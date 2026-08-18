import React, { useState, useEffect } from 'react';
import { useERP } from '../../context/ERPContext';
import { useAuth } from '../../context/AuthContext';
import { CheckSquare, Calendar, Users, Save, CheckCircle2, XCircle, Clock, History } from 'lucide-react';

export const AttendanceTracker = () => {
  const { user } = useAuth();
  const { students, markAttendance, attendanceLogs } = useERP();

  const assignedSubjects = user?.assignedSubjects || [
    { code: 'CS501', name: 'Data Structures & Algorithms', sem: 5 },
    { code: 'CS502', name: 'Operating Systems', sem: 5 }
  ];

  const [selectedSubject, setSelectedSubject] = useState(assignedSubjects[0]?.code || 'CS501');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);

  // Map of studentId -> 'PRESENT' | 'ABSENT' | 'LATE'
  const [attendanceState, setAttendanceState] = useState({});

  // Filter students for the current subject/semester
  const targetSubject = assignedSubjects.find((s) => s.code === selectedSubject) || assignedSubjects[0];
  
  const classStudents = students.filter((s) => {
    // If student has this course or is in the same semester
    return (
      s.currentCourses?.some((c) => c.code === selectedSubject) ||
      s.currentSem === targetSubject.sem
    );
  });

  useEffect(() => {
    // Initialize default all present
    const initial = {};
    classStudents.forEach((s) => {
      initial[s.id] = 'PRESENT';
    });
    setAttendanceState(initial);
  }, [selectedSubject, students]);

  const setStatus = (studentId, status) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const updated = {};
    classStudents.forEach((s) => {
      updated[s.id] = 'PRESENT';
    });
    setAttendanceState(updated);
  };

  const handleSaveAttendance = () => {
    markAttendance(selectedSubject, attendanceDate, attendanceState);
  };

  const presentCount = Object.values(attendanceState).filter((st) => st === 'PRESENT' || st === 'LATE').length;
  const totalCount = classStudents.length;
  const attendanceRatio = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" /> Lecture Attendance Tracker
          </h2>
          <p className="text-sm text-slate-400">Record daily or lecture-wise attendance records for enrolled students</p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <Save className="w-4 h-4" /> Save Attendance Log
        </button>
      </div>

      {/* Selectors Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Select Subject / Course</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3.5 py-2 rounded-xl glass-input text-sm font-semibold text-indigo-300"
            >
              {assignedSubjects.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.code} - {sub.name} (Sem {sub.sem})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Lecture Date</label>
            <div className="relative">
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="px-3.5 py-2 rounded-xl glass-input text-sm text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
          <div className="text-right">
            <p className="text-xs text-slate-400">Present Ratio</p>
            <p className="text-lg font-bold text-emerald-400">
              {presentCount} / {totalCount} ({attendanceRatio}%)
            </p>
          </div>
          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-semibold"
          >
            Mark All Present
          </button>
        </div>
      </div>

      {/* Class Student Roster Grid */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Student Roster ({classStudents.length} Students)
          </h3>
          <span className="text-xs text-slate-400">Click status buttons to toggle attendance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {classStudents.map((s) => {
            const currentStatus = attendanceState[s.id] || 'PRESENT';
            const attInfo = s.currentAttendance?.[selectedSubject] || { attended: 0, total: 0, percentage: 85 };

            return (
              <div
                key={s.id}
                className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{s.name}</h4>
                    <p className="text-xs text-slate-400">
                      {s.rollNo} • {attInfo.percentage}% Overall Attended
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setStatus(s.id, 'PRESENT')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      currentStatus === 'PRESENT'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus(s.id, 'ABSENT')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      currentStatus === 'ABSENT'
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus(s.id, 'LATE')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      currentStatus === 'LATE'
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" /> Recent Saved Logs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800 uppercase">
              <tr>
                <th className="px-4 py-3">Log ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Subject Code</th>
                <th className="px-4 py-3">Present Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {attendanceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-indigo-300">{log.id}</td>
                  <td className="px-4 py-3 text-slate-200">{log.date}</td>
                  <td className="px-4 py-3 font-bold text-white">{log.subjectCode}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">
                    {log.presentStudentIds?.length || 0} Students Marked Present
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
