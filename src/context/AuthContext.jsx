import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TEACHERS, INITIAL_STUDENTS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('college_erp_user');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS[0]; // Default to Student Alex Rivera
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('college_erp_role');
    return saved || 'student';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('college_erp_user', JSON.stringify(user));
      localStorage.setItem('college_erp_role', role);
    } else {
      localStorage.removeItem('college_erp_user');
      localStorage.removeItem('college_erp_role');
    }
  }, [user, role]);

  const login = (id, password, selectedRole) => {
    if (selectedRole === 'teacher') {
      const foundTeacher = INITIAL_TEACHERS.find(
        (t) => t.id.toLowerCase() === id.toLowerCase() && t.password === password
      );
      if (foundTeacher) {
        setUser(foundTeacher);
        setRole('teacher');
        return { success: true };
      }
    } else {
      const foundStudent = INITIAL_STUDENTS.find(
        (s) => s.id.toLowerCase() === id.toLowerCase() && s.password === password
      );
      if (foundStudent) {
        setUser(foundStudent);
        setRole('student');
        return { success: true };
      }
    }
    return { success: false, message: 'Invalid ID or Password' };
  };

  const switchDemoRole = (targetRole, targetId) => {
    if (targetRole === 'teacher') {
      const t = INITIAL_TEACHERS.find((item) => item.id === targetId) || INITIAL_TEACHERS[0];
      setUser(t);
      setRole('teacher');
    } else {
      const s = INITIAL_STUDENTS.find((item) => item.id === targetId) || INITIAL_STUDENTS[0];
      setUser(s);
      setRole('student');
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole, login, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
