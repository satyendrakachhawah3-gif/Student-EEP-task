import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Award,
  BookOpen,
  CreditCard,
  Megaphone,
  BookMarked,
  History,
  CalendarCheck,
  FileText,
  Receipt,
  UserCheck
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
  const { role } = useAuth();

  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'attendance', label: 'Attendance Tracker', icon: CheckSquare },
    { id: 'marks', label: 'Marks & Grading Desk', icon: Award },
    { id: 'assignments', label: 'Assignments Manager', icon: BookOpen },
    { id: 'fees', label: 'Fee Management Ledger', icon: CreditCard },
    { id: 'announcements', label: 'Campus Announcements', icon: Megaphone }
  ];

  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'current', label: 'Current Year & Semester', icon: BookMarked },
    { id: 'previous', label: 'Previous Years Details', icon: History },
    { id: 'attendance', label: 'Attendance Log', icon: CalendarCheck },
    { id: 'assignments', label: 'Assignments & Tasks', icon: FileText },
    { id: 'fees', label: 'Fee Receipts & Ledger', icon: Receipt }
  ];

  const tabs = role === 'teacher' ? teacherTabs : studentTabs;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-[65px] left-0 z-30 h-[calc(100vh-65px)] w-64 glass-panel border-r border-slate-800/80 p-4 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {role === 'teacher' ? 'Faculty Portal' : 'Student Hub'}
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-3 glass-card rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
            <p className="font-semibold text-slate-300">Academia ERP v2.4</p>
            <p className="mt-1 text-[11px] text-slate-500">Autonomous Institute Portal</p>
          </div>
        </div>
      </aside>
    </>
  );
};
