import React from 'react';
import { useERP } from '../../context/ERPContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  CheckSquare,
  BookOpen,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Megaphone
} from 'lucide-react';

export const TeacherDashboard = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { students, assignments, announcements, postAnnouncement } = useERP();

  const totalStudents = students.length;
  
  // Calculate average attendance across students
  const avgAttendance = Math.round(
    students.reduce((acc, s) => {
      const attValues = Object.values(s.currentAttendance || {});
      if (attValues.length === 0) return acc + 85;
      const sAvg = attValues.reduce((sum, item) => sum + item.percentage, 0) / attValues.length;
      return acc + sAvg;
    }, 0) / (totalStudents || 1)
  );

  const pendingSubmissionsCount = assignments.reduce((acc, asn) => {
    const unGraded = asn.submissions.filter((sub) => sub.status === 'SUBMITTED').length;
    return acc + unGraded;
  }, 0);

  const paidStudentsCount = students.filter((s) => s.currentFee?.status === 'PAID').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-violet-950/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h2>
            <p className="text-slate-400 text-sm mt-1">
              {user?.title} • {user?.department}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('attendance')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
            >
              <CheckSquare className="w-4 h-4" /> Mark Today's Attendance
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center gap-2 border border-slate-700 transition-all"
            >
              <Plus className="w-4 h-4" /> Post Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Enrolled Students</p>
            <h3 className="text-2xl font-bold text-white mt-1">{totalStudents}</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> All Branches & Semesters
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Avg Class Attendance</p>
            <h3 className="text-2xl font-bold text-white mt-1">{avgAttendance}%</h3>
            <p className="text-xs text-indigo-400 flex items-center gap-1 mt-2">
              <CheckSquare className="w-3.5 h-3.5" /> Subject Attendance Rate
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Assignment Grading</p>
            <h3 className="text-2xl font-bold text-white mt-1">{pendingSubmissionsCount}</h3>
            <p className="text-xs text-amber-400 flex items-center gap-1 mt-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Awaiting Marks
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Fee Clearance Ratio</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {paidStudentsCount} / {totalStudents}
            </h3>
            <p className="text-xs text-blue-400 flex items-center gap-1 mt-2">
              <CreditCard className="w-3.5 h-3.5" /> Clearance Verified
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Class Overview & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Courses / Subjects */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Assigned Courses</h3>
            <span className="text-xs text-slate-400">Current Semester</span>
          </div>

          <div className="space-y-3">
            {user?.assignedSubjects?.map((subject) => (
              <div
                key={subject.code}
                className="glass-card p-4 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {subject.code}
                    </span>
                    <h4 className="font-semibold text-white">{subject.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Semester {subject.sem} • {subject.dept}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('attendance')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                  >
                    Attendance
                  </button>
                  <button
                    onClick={() => setActiveTab('marks')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-xs font-medium text-indigo-300 border border-indigo-500/30"
                  >
                    Grade Marks
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements Widget */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" /> Campus Notices
            </h3>
            <span className="text-xs text-slate-400">{announcements.length} Total</span>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((anc) => (
              <div key={anc.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-medium">
                    {anc.category}
                  </span>
                  <span className="text-slate-500">{anc.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-white line-clamp-1">{anc.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{anc.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
