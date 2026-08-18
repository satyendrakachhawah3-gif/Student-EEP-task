import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useERP } from '../../context/ERPContext';
import { calculateCGPA, getAttendanceColor, formatCurrency } from '../../utils/helpers';
import {
  Award,
  CalendarCheck,
  BookOpen,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const StudentDashboard = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { assignments, announcements } = useERP();

  const cgpa = calculateCGPA(user?.previousSemesters || []);

  // Overall attendance %
  const attValues = Object.values(user?.currentAttendance || {});
  const overallAttendance =
    attValues.length > 0
      ? Math.round(attValues.reduce((sum, a) => sum + a.percentage, 0) / attValues.length)
      : 88;

  const pendingAssignmentsCount = assignments.filter((asn) => {
    const hasSub = asn.submissions?.some((sub) => sub.studentId === user?.id);
    return !hasSub;
  }).length;

  const feeStatus = user?.currentFee?.status || 'UNPAID';

  return (
    <div className="space-y-6">
      {/* Hero Welcome Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h2>
              <p className="text-slate-300 text-sm mt-0.5">
                {user?.department} • Year {user?.currentYear}, Semester {user?.currentSem}
              </p>
              <p className="text-xs text-indigo-400 mt-1 font-mono">Roll No: {user?.rollNo || user?.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('current')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              Current Semester <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
            >
              Previous Semesters
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Cumulative CGPA</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{cgpa > 0 ? cgpa : '9.00'}</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> Excellent Standing
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Overall Attendance</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{overallAttendance}%</h3>
            <p
              className={`text-xs flex items-center gap-1 mt-2 ${
                overallAttendance >= 75 ? 'text-emerald-400' : 'text-rose-400 font-bold'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {overallAttendance >= 75 ? 'Above 75% Threshold' : 'Low Attendance Alert'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Assignments</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{pendingAssignmentsCount}</h3>
            <p className="text-xs text-amber-400 flex items-center gap-1 mt-2">
              <BookOpen className="w-3.5 h-3.5" /> Action Required
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Current Semester Fee</p>
            <h3 className="text-lg font-bold text-white mt-1">
              {user?.currentFee?.status === 'PAID' ? 'Clear' : formatCurrency(user?.currentFee?.dueAmount || 0)}
            </h3>
            <span
              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase mt-2 ${
                feeStatus === 'PAID'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : feeStatus === 'PARTIAL'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {feeStatus}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Row: Courses & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Current Enrolled Courses</h3>
            <span className="text-xs text-indigo-400 font-semibold">Semester {user?.currentSem}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user?.currentCourses?.map((course) => {
              const att = user?.currentAttendance?.[course.code] || { percentage: 90 };

              return (
                <div key={course.code} className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300">
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{course.credits} Credits</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm line-clamp-1">{course.name}</h4>
                  <p className="text-xs text-slate-400">Faculty: {course.faculty}</p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                    <span className="text-slate-400">Attendance:</span>
                    <span className="font-bold text-emerald-400">{att.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notice Board */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-indigo-400" /> Campus Notices
          </h3>

          <div className="space-y-3">
            {announcements.map((anc) => (
              <div key={anc.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium">
                    {anc.category}
                  </span>
                  <span className="text-slate-500">{anc.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-white line-clamp-1">{anc.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{anc.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
