import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { calculateCGPA, getAttendanceColor } from '../../utils/helpers';
import { Modal } from '../common/Modal';
import {
  Search,
  UserPlus,
  Filter,
  Eye,
  Edit,
  Mail,
  Phone,
  ShieldAlert,
  Award,
  BookOpen,
  CreditCard,
  UserCheck
} from 'lucide-react';

export const StudentDirectory = () => {
  const { students, addStudent, updateStudentProfile } = useERP();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [semFilter, setSemFilter] = useState('ALL');

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New Student Form State
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    section: 'A',
    currentYear: 3,
    currentSem: 5,
    guardianName: '',
    guardianPhone: '',
    bloodGroup: 'O+'
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo?.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === 'ALL' || s.department === deptFilter;
    const matchesSem = semFilter === 'ALL' || s.currentSem.toString() === semFilter;

    return matchesSearch && matchesDept && matchesSem;
  });

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    addStudent(newStudentData);
    setIsAddModalOpen(false);
    setNewStudentData({
      name: '',
      rollNo: '',
      email: '',
      phone: '',
      department: 'Computer Science & Engineering',
      section: 'A',
      currentYear: 3,
      currentSem: 5,
      guardianName: '',
      guardianPhone: '',
      bloodGroup: 'O+'
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudentProfile(selectedStudent.id, selectedStudent);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Student Directory & Information</h2>
          <p className="text-sm text-slate-400">View profiles, academic progress, and manage student records</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <UserPlus className="w-4 h-4" /> Add New Student
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll no, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" /> Department:
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science & Engineering">Computer Science & Engg</option>
            <option value="Electronics & Communication Engineering">Electronics & Communication</option>
            <option value="Information Technology">Information Tech</option>
          </select>

          <div className="flex items-center gap-2 text-xs text-slate-400">Semester:</div>
          <select
            value={semFilter}
            onChange={(e) => setSemFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs"
          >
            <option value="ALL">All Semesters</option>
            <option value="1">Sem 1</option>
            <option value="2">Sem 2</option>
            <option value="3">Sem 3</option>
            <option value="4">Sem 4</option>
            <option value="5">Sem 5</option>
            <option value="6">Sem 6</option>
            <option value="7">Sem 7</option>
            <option value="8">Sem 8</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll No / ID</th>
                <th className="px-6 py-4">Dept & Sem</th>
                <th className="px-6 py-4">CGPA</th>
                <th className="px-6 py-4">Fee Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                    No students match your filter search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const cgpa = calculateCGPA(s.previousSemesters);
                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        <span className="text-slate-200 font-medium">{s.rollNo || s.id}</span>
                        <div className="text-[10px] text-slate-500">{s.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-white font-medium">{s.department}</p>
                        <p className="text-[11px] text-slate-400">Year {s.currentYear} • Sem {s.currentSem} (Sec {s.section})</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                          {cgpa > 0 ? `${cgpa} CGPA` : 'Current'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            s.currentFee?.status === 'PAID'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : s.currentFee?.status === 'PARTIAL'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {s.currentFee?.status || 'UNPAID'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                            title="View Profile Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(s);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-all"
                            title="Edit Student Profile"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Full Student Details Modal */}
      {selectedStudent && !isEditModalOpen && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile Details - ${selectedStudent.name}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedStudent.name}</h3>
                <p className="text-xs text-indigo-400 font-medium">
                  {selectedStudent.rollNo} • ID: {selectedStudent.id}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedStudent.department} • Year {selectedStudent.currentYear}, Semester {selectedStudent.currentSem} (Section {selectedStudent.section})
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact & Bio</h4>
                <p className="text-sm text-slate-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" /> {selectedStudent.email}
                </p>
                <p className="text-sm text-slate-200 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" /> {selectedStudent.phone || '+1 (555) 000-0000'}
                </p>
                <p className="text-sm text-slate-200">
                  <span className="text-slate-400">Blood Group:</span> {selectedStudent.bloodGroup || 'O+'}
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guardian Details</h4>
                <p className="text-sm text-slate-200 font-semibold">{selectedStudent.guardianName || 'N/A'}</p>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> {selectedStudent.guardianPhone || 'N/A'}
                </p>
              </div>
            </div>

            {/* Previous Semesters Summary */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" /> Academic History ({selectedStudent.previousSemesters?.length || 0} Previous Terms)
              </h4>

              {selectedStudent.previousSemesters?.length === 0 ? (
                <p className="text-xs text-slate-400">First year student, no completed previous semesters yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedStudent.previousSemesters?.map((sem) => (
                    <div key={sem.semNumber} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">Semester {sem.semNumber}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                          {sem.sgpa} SGPA
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Academic Year: {sem.academicYear} • Credits: {sem.totalCredits}</p>
                      <p className="text-[11px] text-slate-400">Overall Attendance: {sem.attendanceOverall}%</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Student">
        <form onSubmit={handleAddStudentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newStudentData.name}
                onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Roll Number</label>
              <input
                type="text"
                required
                value={newStudentData.rollNo}
                onChange={(e) => setNewStudentData({ ...newStudentData, rollNo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="e.g. 2026CSE099"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newStudentData.email}
                onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="john@student.college.edu"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={newStudentData.phone}
                onChange={(e) => setNewStudentData({ ...newStudentData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Department</label>
              <select
                value={newStudentData.department}
                onChange={(e) => setNewStudentData({ ...newStudentData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                <option value="Computer Science & Engineering">Computer Science & Engg</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication</option>
                <option value="Information Technology">Information Tech</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Current Year</label>
              <input
                type="number"
                min="1"
                max="4"
                value={newStudentData.currentYear}
                onChange={(e) => setNewStudentData({ ...newStudentData, currentYear: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Current Semester</label>
              <input
                type="number"
                min="1"
                max="8"
                value={newStudentData.currentSem}
                onChange={(e) => setNewStudentData({ ...newStudentData, currentSem: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Guardian Name</label>
              <input
                type="text"
                value={newStudentData.guardianName}
                onChange={(e) => setNewStudentData({ ...newStudentData, guardianName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Guardian Phone</label>
              <input
                type="text"
                value={newStudentData.guardianPhone}
                onChange={(e) => setNewStudentData({ ...newStudentData, guardianPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25"
            >
              Save & Create Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      {selectedStudent && isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Profile">
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={selectedStudent.name}
                onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedStudent.email}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={selectedStudent.phone}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
