import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import { Modal } from '../common/Modal';
import { History, Award, CalendarCheck, Receipt, Printer, CheckCircle2, ChevronRight } from 'lucide-react';

export const PreviousYearsView = () => {
  const { user } = useAuth();
  const previousSemesters = user?.previousSemesters || [];

  const [selectedSemNumber, setSelectedSemNumber] = useState(
    previousSemesters.length > 0 ? previousSemesters[0].semNumber : 1
  );

  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);

  const activeSemData = previousSemesters.find((s) => s.semNumber === Number(selectedSemNumber)) || previousSemesters[0];

  return (
    <div className="space-y-6">
      {/* Title & Print Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" /> Historical Academic Records & Transcripts
          </h2>
          <p className="text-sm text-slate-400">
            View completed grade cards, SGPA transcripts, past attendance, and fee history for prior terms
          </p>
        </div>

        {activeSemData && (
          <button
            onClick={() => setIsTranscriptModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Printer className="w-4 h-4" /> Download / Print Transcript
          </button>
        )}
      </div>

      {previousSemesters.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-2">
          <History className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">First Year Student Record</h3>
          <p className="text-sm text-slate-400">You are currently in Semester 1. Past semester grade transcripts will appear here upon term completion.</p>
        </div>
      ) : (
        <>
          {/* Semester Filter Tabs */}
          <div className="glass-panel p-2 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
            {previousSemesters.map((sem) => {
              const isActive = sem.semNumber === activeSemData?.semNumber;
              return (
                <button
                  key={sem.semNumber}
                  onClick={() => setSelectedSemNumber(sem.semNumber)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" /> Semester {sem.semNumber} (Year {sem.year})
                  <span className="px-1.5 py-0.5 rounded bg-slate-900/60 text-[10px] text-indigo-300 font-bold">
                    {sem.sgpa} SGPA
                  </span>
                </button>
              );
            })}
          </div>

          {activeSemData && (
            <div className="space-y-6">
              {/* Semester Summary Header */}
              <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 via-slate-900/60 to-slate-900/40 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Academic Year</p>
                  <p className="text-lg font-bold text-white mt-0.5">{activeSemData.academicYear}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">Semester SGPA</p>
                  <p className="text-xl font-extrabold text-indigo-400 mt-0.5">{activeSemData.sgpa} SGPA</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">Total Earned Credits</p>
                  <p className="text-lg font-bold text-white mt-0.5">{activeSemData.totalCredits} Credits</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">Term Result Status</p>
                  <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mt-0.5">
                    {activeSemData.resultStatus}
                  </span>
                </div>
              </div>

              {/* Marksheet Table */}
              <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" /> Official Grade Sheet - Semester {activeSemData.semNumber}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Course Code</th>
                        <th className="px-4 py-3">Subject Name</th>
                        <th className="px-4 py-3 text-center">Credits</th>
                        <th className="px-4 py-3 text-center">Internal Score</th>
                        <th className="px-4 py-3 text-center">End Sem Marks</th>
                        <th className="px-4 py-3 text-center">Total Marks</th>
                        <th className="px-4 py-3 text-center">Grade Letter</th>
                        <th className="px-4 py-3 text-right">Grade Point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {activeSemData.markSheet?.map((item) => (
                        <tr key={item.code} className="hover:bg-slate-800/40">
                          <td className="px-4 py-3 font-mono text-xs font-bold text-indigo-300">{item.code}</td>
                          <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                          <td className="px-4 py-3 text-center text-slate-200">{item.credits}</td>
                          <td className="px-4 py-3 text-center">{item.internal || 25}</td>
                          <td className="px-4 py-3 text-center">{item.endSem || 40}</td>
                          <td className="px-4 py-3 text-center font-bold text-white">{item.total} / 100</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {item.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-400">{item.point}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dual Section: Past Attendance & Past Fee Receipt */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Historical Attendance */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-emerald-400" /> Attendance Record (Overall {activeSemData.attendanceOverall}%)
                  </h3>

                  <div className="space-y-2">
                    {activeSemData.subjectWiseAttendance?.map((att) => (
                      <div key={att.code} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-indigo-300 mr-2">{att.code}</span>
                          <span className="text-slate-200 font-medium">{att.name}</span>
                        </div>
                        <span className="font-bold text-emerald-400">{att.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historical Fee Clearance */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-400" /> Fee Payment Ledger Receipt
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Receipt Reference:</span>
                      <span className="font-mono text-indigo-300">{activeSemData.feeDetails?.receiptNo || 'RCP-PAST'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Fee Amount:</span>
                      <span className="font-semibold text-white">{formatCurrency(activeSemData.feeDetails?.total || 75000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clearance Status:</span>
                      <span className="font-bold text-emerald-400">{activeSemData.feeDetails?.status || 'PAID'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Printable Official Grade Transcript Modal */}
          {activeSemData && (
            <Modal
              isOpen={isTranscriptModalOpen}
              onClose={() => setIsTranscriptModalOpen(false)}
              title={`Official Academic Transcript - Semester ${activeSemData.semNumber}`}
              maxWidth="max-w-3xl"
            >
              <div className="space-y-6 print-card p-8 bg-slate-900 rounded-xl border border-slate-800 text-white">
                <div className="text-center border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-indigo-400">ACADEMIA COLLEGE OF TECHNOLOGY</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Autonomous Institute • Office of the Registrar</p>
                  <h3 className="text-base font-semibold text-white mt-3">OFFICIAL SEMESTER GRADE TRANSCRIPT</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400">Student Name:</p>
                    <p className="font-bold text-white text-sm">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Roll Number:</p>
                    <p className="font-bold text-white text-sm">{user?.rollNo}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Department:</p>
                    <p className="font-semibold text-slate-200">{user?.department}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Semester & Year:</p>
                    <p className="font-semibold text-slate-200">Semester {activeSemData.semNumber} ({activeSemData.academicYear})</p>
                  </div>
                </div>

                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject Title</th>
                      <th className="p-2.5 text-center">Credits</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {activeSemData.markSheet?.map((item) => (
                      <tr key={item.code}>
                        <td className="p-2.5 font-mono text-indigo-300">{item.code}</td>
                        <td className="p-2.5 text-white">{item.name}</td>
                        <td className="p-2.5 text-center">{item.credits}</td>
                        <td className="p-2.5 text-center font-bold">{item.grade}</td>
                        <td className="p-2.5 text-right font-bold">{item.point}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-800">
                  <span>Semester SGPA: <strong className="text-indigo-400">{activeSemData.sgpa}</strong></span>
                  <span>Cumulative CGPA: <strong className="text-emerald-400">{user?.previousSemesters ? user.previousSemesters[user.previousSemesters.length - 1]?.sgpa : '9.00'}</strong></span>
                </div>

                <div className="flex justify-end gap-3 pt-4 no-print">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
