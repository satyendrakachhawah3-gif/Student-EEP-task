import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ERPProvider, useERP } from './context/ERPContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { LoginPage } from './components/common/LoginPage';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDirectory } from './components/teacher/StudentDirectory';
import { AttendanceTracker } from './components/teacher/AttendanceTracker';
import { MarksManager } from './components/teacher/MarksManager';
import { AssignmentCreator } from './components/teacher/AssignmentCreator';
import { FeeLedgerTeacher } from './components/teacher/FeeLedgerTeacher';
import { ResultPublisher } from './components/teacher/ResultPublisher';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { CurrentSemesterView } from './components/student/CurrentSemesterView';
import { PreviousYearsView } from './components/student/PreviousYearsView';
import { StudentAssignmentsView } from './components/student/StudentAssignmentsView';
import { StudentFeeView } from './components/student/StudentFeeView';

const MainApp = () => {
  const { user, role } = useAuth();
  const { toast, showToast } = useERP();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    if (role === 'teacher') {
      switch (activeTab) {
        case 'dashboard':
          return <TeacherDashboard setActiveTab={setActiveTab} />;
        case 'students':
          return <StudentDirectory />;
        case 'attendance':
          return <AttendanceTracker />;
        case 'marks':
          return <MarksManager />;
        case 'assignments':
          return <AssignmentCreator />;
        case 'fees':
          return <FeeLedgerTeacher />;
        case 'announcements':
          return <ResultPublisher />;
        default:
          return <TeacherDashboard setActiveTab={setActiveTab} />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard setActiveTab={setActiveTab} />;
        case 'current':
          return <CurrentSemesterView />;
        case 'previous':
          return <PreviousYearsView />;
        case 'attendance':
          return <CurrentSemesterView />;
        case 'assignments':
          return <StudentAssignmentsView />;
        case 'fees':
          return <StudentFeeView />;
        default:
          return <StudentDashboard setActiveTab={setActiveTab} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />

      <div className="flex flex-1 pt-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="flex-1 lg:ml-64 p-4 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {renderContent()}
        </main>
      </div>

      <Toast toast={toast} onClose={() => showToast(null)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ERPProvider>
        <MainApp />
      </ERPProvider>
    </AuthProvider>
  );
}
