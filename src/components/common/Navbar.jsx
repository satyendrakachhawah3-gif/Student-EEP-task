import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, LogOut, UserCheck, User, ShieldCheck, UserCog, Menu } from 'lucide-react';

export const Navbar = ({ onMobileMenuToggle }) => {
  const { user, role, logout, switchDemoRole } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                Academia<span className="text-indigo-400 font-normal">ERP</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">College Student Resource Planning System</p>
            </div>
          </div>
        </div>

        {/* Demo Switcher Quick Toolbar */}
        <div className="hidden xl:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800/90 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium mr-1">
            <UserCog className="w-3.5 h-3.5 text-indigo-400" /> Switch Profile:
          </span>
          <button
            onClick={() => switchDemoRole('teacher', 'TCH-101')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              role === 'teacher' && user?.id === 'TCH-101'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Prof. Jenkins (Teacher)
          </button>
          <button
            onClick={() => switchDemoRole('student', 'STU-2023-01')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              role === 'student' && user?.id === 'STU-2023-01'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Alex Rivera (3rd Yr CS)
          </button>
          <button
            onClick={() => switchDemoRole('student', 'STU-2023-02')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              role === 'student' && user?.id === 'STU-2023-02'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Priya Sharma (2nd Yr ECE)
          </button>
          <button
            onClick={() => switchDemoRole('student', 'STU-2023-03')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              role === 'student' && user?.id === 'STU-2023-03'
                ? 'bg-emerald-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Rohan Verma (4th Yr IT)
          </button>
        </div>

        {/* User Badge & Profile */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-900/60 p-1.5 pr-4 rounded-xl border border-slate-800">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={user.name}
                className="w-9 h-9 rounded-lg object-cover border border-indigo-500/30"
              />
              <div className="text-left hidden md:block">
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  {user.name}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      role === 'teacher'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {role === 'teacher' ? 'Faculty' : `Sem ${user.currentSem}`}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {role === 'teacher' ? user.department : `${user.department} • ${user.rollNo || user.id}`}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-700/60 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
