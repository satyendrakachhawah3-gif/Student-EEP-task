/**
 * Helper utilities for Grade, SGPA, CGPA calculations, date formatting, and status badges
 */

export const calculateGrade = (totalScore) => {
  if (totalScore >= 90) return { letter: 'A+', point: 10, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (totalScore >= 80) return { letter: 'A', point: 9, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (totalScore >= 70) return { letter: 'B+', point: 8, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
  if (totalScore >= 60) return { letter: 'B', point: 7, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
  if (totalScore >= 50) return { letter: 'C', point: 6, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  if (totalScore >= 40) return { letter: 'D', point: 5, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
  return { letter: 'F', point: 0, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
};

export const calculateSGPA = (subjectScores) => {
  if (!subjectScores || subjectScores.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;

  subjectScores.forEach((subject) => {
    const credits = subject.credits || 3;
    const totalScore = (subject.internalMarks || 0) + (subject.midSemMarks || 0) + (subject.endSemMarks || 0);
    const { point } = calculateGrade(totalScore);
    totalPoints += point * credits;
    totalCredits += credits;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
};

export const calculateCGPA = (semesterHistories) => {
  if (!semesterHistories || semesterHistories.length === 0) return 0;
  let totalSGPA = 0;
  let count = 0;

  semesterHistories.forEach((sem) => {
    if (sem.sgpa) {
      totalSGPA += parseFloat(sem.sgpa);
      count++;
    }
  });

  return count > 0 ? (totalSGPA / count).toFixed(2) : 0;
};

export const getAttendanceColor = (percentage) => {
  if (percentage >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (percentage >= 75) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  if (percentage >= 65) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
