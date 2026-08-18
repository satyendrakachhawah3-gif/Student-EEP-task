import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_ASSIGNMENTS,
  INITIAL_ANNOUNCEMENTS,
  ATTENDANCE_LOGS
} from '../data/mockData';

const ERPContext = createContext();

export const ERPProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('college_erp_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers] = useState(() => {
    const saved = localStorage.getItem('college_erp_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('college_erp_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('college_erp_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [attendanceLogs, setAttendanceLogs] = useState(() => {
    const saved = localStorage.getItem('college_erp_attendance_logs');
    return saved ? JSON.parse(saved) : ATTENDANCE_LOGS;
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('college_erp_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('college_erp_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('college_erp_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('college_erp_attendance_logs', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  // 1. Update Student Marks (Internal, Mid-Sem, End-Sem, Practical)
  const updateStudentMarks = (studentId, subjectCode, markType, newValue) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const currentSubMarks = student.currentMarks[subjectCode] || {
            internal1: 0,
            internal2: 0,
            midSem: 0,
            endSem: 0,
            practical: 0,
            maxTotal: 100
          };
          const updatedSubMarks = {
            ...currentSubMarks,
            [markType]: Math.max(0, Number(newValue))
          };
          return {
            ...student,
            currentMarks: {
              ...student.currentMarks,
              [subjectCode]: updatedSubMarks
            }
          };
        }
        return student;
      })
    );
    showToast('Student marks updated successfully!', 'success');
  };

  // 2. Take Attendance
  const markAttendance = (subjectCode, dateStr, attendanceMap) => {
    // attendanceMap: { [studentId]: 'PRESENT' | 'ABSENT' | 'LATE' }
    setStudents((prev) =>
      prev.map((student) => {
        const status = attendanceMap[student.id];
        if (status) {
          const prevAttendance = student.currentAttendance[subjectCode] || { attended: 0, total: 0, percentage: 0 };
          const newAttended = status === 'PRESENT' || status === 'LATE' ? prevAttendance.attended + 1 : prevAttendance.attended;
          const newTotal = prevAttendance.total + 1;
          const newPercentage = Math.round((newAttended / newTotal) * 100);

          return {
            ...student,
            currentAttendance: {
              ...student.currentAttendance,
              [subjectCode]: {
                attended: newAttended,
                total: newTotal,
                percentage: newPercentage
              }
            }
          };
        }
        return student;
      })
    );

    const presentIds = Object.keys(attendanceMap).filter((id) => attendanceMap[id] === 'PRESENT' || attendanceMap[id] === 'LATE');
    const newLog = {
      id: `LOG-${Date.now()}`,
      date: dateStr,
      subjectCode,
      presentStudentIds: presentIds
    };

    setAttendanceLogs((prev) => [newLog, ...prev]);
    showToast(`Attendance recorded for ${subjectCode} on ${dateStr}`, 'success');
  };

  // 3. Assignments Management
  const createAssignment = (newAss) => {
    const created = {
      id: `ASN-${Date.now().toString().slice(-4)}`,
      ...newAss,
      submissions: []
    };
    setAssignments((prev) => [created, ...prev]);
    showToast('New assignment posted successfully!', 'success');
  };

  const submitAssignment = (assignmentId, studentId, studentName, solutionNotes, contentLink) => {
    setAssignments((prev) =>
      prev.map((asn) => {
        if (asn.id === assignmentId) {
          const existingSubIndex = asn.submissions.findIndex((sub) => sub.studentId === studentId);
          const newSubmission = {
            studentId,
            studentName,
            submittedOn: new Date().toISOString().split('T')[0],
            solutionNotes,
            contentLink,
            status: 'SUBMITTED',
            score: null,
            feedback: null
          };

          let updatedSubmissions = [...asn.submissions];
          if (existingSubIndex >= 0) {
            updatedSubmissions[existingSubIndex] = newSubmission;
          } else {
            updatedSubmissions.push(newSubmission);
          }

          return {
            ...asn,
            submissions: updatedSubmissions
          };
        }
        return asn;
      })
    );
    showToast('Assignment submitted successfully!', 'success');
  };

  const gradeAssignment = (assignmentId, studentId, score, feedback) => {
    setAssignments((prev) =>
      prev.map((asn) => {
        if (asn.id === assignmentId) {
          const updatedSubmissions = asn.submissions.map((sub) => {
            if (sub.studentId === studentId) {
              return {
                ...sub,
                status: 'GRADED',
                score: Number(score),
                feedback
              };
            }
            return sub;
          });
          return {
            ...asn,
            submissions: updatedSubmissions
          };
        }
        return asn;
      })
    );
    showToast('Assignment score and feedback saved!', 'success');
  };

  // 4. Fee Management
  const updateFeeStatus = (studentId, updatedFeeData) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            currentFee: {
              ...student.currentFee,
              ...updatedFeeData
            }
          };
        }
        return student;
      })
    );
    showToast('Fee record updated successfully!', 'success');
  };

  // 5. Add / Update Student Profile
  const updateStudentProfile = (studentId, fields) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...fields } : s))
    );
    showToast('Student profile details updated', 'success');
  };

  const addStudent = (newStudentData) => {
    const newStudent = {
      id: `STU-2026-${(students.length + 1).toString().padStart(2, '0')}`,
      password: 'student123',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      currentMarks: {},
      currentAttendance: {},
      currentFee: {
        totalAmount: 85000,
        paidAmount: 0,
        dueAmount: 85000,
        status: 'UNPAID',
        dueDate: '2026-10-01',
        receiptNo: `RCP-2026-NEW-${students.length + 1}`,
        breakdown: [
          { label: 'Tuition Fee', amount: 65000 },
          { label: 'Laboratory Fee', amount: 15000 },
          { label: 'Library & Activities', amount: 5000 }
        ]
      },
      previousSemesters: [],
      ...newStudentData
    };

    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Added student ${newStudent.name} (${newStudent.id})`, 'success');
  };

  // 6. Post Announcement
  const postAnnouncement = (title, category, content, author) => {
    const newAnc = {
      id: `ANC-${Date.now().toString().slice(-4)}`,
      title,
      category,
      content,
      author,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    showToast('Campus announcement published!', 'success');
  };

  return (
    <ERPContext.Provider
      value={{
        students,
        teachers,
        assignments,
        announcements,
        attendanceLogs,
        toast,
        showToast,
        updateStudentMarks,
        markAttendance,
        createAssignment,
        submitAssignment,
        gradeAssignment,
        updateFeeStatus,
        updateStudentProfile,
        addStudent,
        postAnnouncement
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => useContext(ERPContext);
