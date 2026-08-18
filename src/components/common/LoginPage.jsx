import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ShieldCheck, UserCheck, Lock, ArrowRight, UserCog } from 'lucide-react';

export const LoginPage = () => {
  const { login, switchDemoRole } = useAuth();

  const [selectedRole, setSelectedRole] = useState('student');
  const [idInput, setIdInput] = useState('STU-2023-01');
  const [passwordInput, setPasswordInput] = useState('student123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'teacher') {
      setIdInput('TCH-101');
      setPasswordInput('teacher123');
    } else {
      setIdInput('STU-2023-01');
      setPasswordInput('student123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(idInput, passwordInput, selectedRole);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Academia ERP</h1>
          <p className="text-xs text-slate-400">Autonomous Institute Student Resource System</p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'student'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Student Portal
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('teacher')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'teacher'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Teacher Portal
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {selectedRole === 'teacher' ? 'Faculty ID' : 'Student Roll No / ID'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-mono"
                placeholder={selectedRole === 'teacher' ? 'e.g. TCH-101' : 'e.g. STU-2023-01'}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
              selectedRole === 'teacher'
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25'
            }`}
          >
            Sign In to {selectedRole === 'teacher' ? 'Teacher' : 'Student'} ERP <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher Section */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <UserCog className="w-3.5 h-3.5 text-indigo-400" /> Quick 1-Click Demo Logins:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => switchDemoRole('teacher', 'TCH-101')}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left hover:border-indigo-500/40 transition-all"
            >
              <p className="font-semibold text-indigo-300">Prof. Jenkins</p>
              <p className="text-[10px] text-slate-400">Head CS Teacher</p>
            </button>

            <button
              onClick={() => switchDemoRole('student', 'STU-2023-01')}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left hover:border-emerald-500/40 transition-all"
            >
              <p className="font-semibold text-emerald-300">Alex Rivera</p>
              <p className="text-[10px] text-slate-400">3rd Yr CS Student</p>
            </button>

            <button
              onClick={() => switchDemoRole('student', 'STU-2023-02')}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left hover:border-emerald-500/40 transition-all"
            >
              <p className="font-semibold text-emerald-300">Priya Sharma</p>
              <p className="text-[10px] text-slate-400">2nd Yr ECE Student</p>
            </button>

            <button
              onClick={() => switchDemoRole('student', 'STU-2023-03')}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left hover:border-emerald-500/40 transition-all"
            >
              <p className="font-semibold text-emerald-300">Rohan Verma</p>
              <p className="text-[10px] text-slate-400">4th Yr IT Student</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
