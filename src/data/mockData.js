/**
 * Comprehensive Mock Data for College ERP System
 * Contains pre-populated realistic data for Teachers, Students across years/semesters,
 * marks history, attendance records, fee ledgers, assignments, and announcements.
 */

export const INITIAL_TEACHERS = [
  {
    id: 'TCH-101',
    password: 'teacher123',
    name: 'Prof. Sarah Jenkins',
    title: 'Department Head & Senior Professor',
    email: 's.jenkins@college.edu',
    department: 'Computer Science & Engineering',
    phone: '+1 (555) 234-5678',
    office: 'Block A, Room 304',
    assignedSubjects: [
      { code: 'CS501', name: 'Data Structures & Algorithms', sem: 5, dept: 'Computer Science & Engineering' },
      { code: 'CS502', name: 'Operating Systems', sem: 5, dept: 'Computer Science & Engineering' },
      { code: 'CS504', name: 'Web Development Lab', sem: 5, dept: 'Computer Science & Engineering' }
    ]
  },
  {
    id: 'TCH-102',
    password: 'teacher123',
    name: 'Dr. Robert Vance',
    title: 'Associate Professor',
    email: 'r.vance@college.edu',
    department: 'Information Technology',
    phone: '+1 (555) 876-5432',
    office: 'Block B, Room 201',
    assignedSubjects: [
      { code: 'IT701', name: 'Cloud Computing & Security', sem: 7, dept: 'Information Technology' },
      { code: 'CS503', name: 'Database Management Systems', sem: 5, dept: 'Computer Science & Engineering' }
    ]
  },
  {
    id: 'TCH-103',
    password: 'teacher123',
    name: 'Prof. Anita Roy',
    title: 'Assistant Professor',
    email: 'a.roy@college.edu',
    department: 'Electronics & Communication',
    phone: '+1 (555) 345-6789',
    office: 'Block C, Room 108',
    assignedSubjects: [
      { code: 'EC301', name: 'Signals & Systems', sem: 3, dept: 'Electronics & Communication Engineering' },
      { code: 'EC302', name: 'Analog Circuits', sem: 3, dept: 'Electronics & Communication Engineering' }
    ]
  }
];

export const INITIAL_STUDENTS = [
  {
    id: 'STU-2023-01',
    password: 'student123',
    name: 'Alex Rivera',
    rollNo: '2023CSE042',
    email: 'alex.rivera@student.college.edu',
    phone: '+1 (555) 901-2345',
    department: 'Computer Science & Engineering',
    section: 'A',
    currentYear: 3,
    currentSem: 5,
    guardianName: 'Carlos Rivera',
    guardianPhone: '+1 (555) 901-9999',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    currentCourses: [
      { code: 'CS501', name: 'Data Structures & Algorithms', credits: 4, faculty: 'Prof. Sarah Jenkins' },
      { code: 'CS502', name: 'Operating Systems', credits: 4, faculty: 'Prof. Sarah Jenkins' },
      { code: 'CS503', name: 'Database Management Systems', credits: 4, faculty: 'Dr. Robert Vance' },
      { code: 'CS504', name: 'Web Development Lab', credits: 3, faculty: 'Prof. Sarah Jenkins' },
      { code: 'CS505', name: 'Artificial Intelligence & ML', credits: 4, faculty: 'Dr. Alan Turing' }
    ],
    // Current Semester Marks breakdown
    currentMarks: {
      CS501: { internal1: 23, internal2: 24, midSem: 28, endSem: 42, practical: 0, maxTotal: 100 },
      CS502: { internal1: 21, internal2: 22, midSem: 26, endSem: 39, practical: 0, maxTotal: 100 },
      CS503: { internal1: 24, internal2: 25, midSem: 29, endSem: 45, practical: 0, maxTotal: 100 },
      CS504: { internal1: 25, internal2: 24, midSem: 27, endSem: 0, practical: 48, maxTotal: 100 },
      CS505: { internal1: 20, internal2: 22, midSem: 25, endSem: 38, practical: 0, maxTotal: 100 }
    },
    // Current Subject Attendance %
    currentAttendance: {
      CS501: { attended: 34, total: 36, percentage: 94 },
      CS502: { attended: 30, total: 34, percentage: 88 },
      CS503: { attended: 32, total: 35, percentage: 91 },
      CS504: { attended: 28, total: 30, percentage: 93 },
      CS505: { attended: 26, total: 32, percentage: 81 }
    },
    // Current Fee Details
    currentFee: {
      totalAmount: 85000,
      paidAmount: 85000,
      dueAmount: 0,
      status: 'PAID',
      dueDate: '2026-09-15',
      receiptNo: 'RCP-2026-CS5-042',
      breakdown: [
        { label: 'Tuition Fee', amount: 65000 },
        { label: 'Laboratory & Computer Lab Fee', amount: 12000 },
        { label: 'Library & E-Resources', amount: 5000 },
        { label: 'Student Development Dues', amount: 3000 }
      ]
    },
    // PREVIOUS YEARS & SEMESTERS DETAILS
    previousSemesters: [
      {
        semNumber: 1,
        year: 1,
        academicYear: '2023-2024',
        sgpa: '8.75',
        totalCredits: 20,
        resultStatus: 'PASSED',
        feeDetails: {
          total: 75000,
          paid: 75000,
          status: 'PAID',
          receiptNo: 'RCP-2023-SEM1-042',
          paidOn: '2023-08-10'
        },
        attendanceOverall: 92,
        subjectWiseAttendance: [
          { code: 'MA101', name: 'Engineering Mathematics-I', attended: 42, total: 45, percentage: 93 },
          { code: 'PH101', name: 'Engineering Physics', attended: 38, total: 42, percentage: 90 },
          { code: 'EE101', name: 'Basic Electrical Engg', attended: 36, total: 40, percentage: 90 },
          { code: 'CS101', name: 'Computer Programming in C', attended: 44, total: 46, percentage: 95 }
        ],
        markSheet: [
          { code: 'MA101', name: 'Engineering Mathematics-I', credits: 4, internal: 27, midSem: 26, endSem: 42, total: 95, grade: 'A+', point: 10 },
          { code: 'PH101', name: 'Engineering Physics', credits: 4, internal: 24, midSem: 24, endSem: 38, total: 86, grade: 'A', point: 9 },
          { code: 'EE101', name: 'Basic Electrical Engg', credits: 4, internal: 22, midSem: 23, endSem: 35, total: 80, grade: 'A', point: 9 },
          { code: 'CS101', name: 'Computer Programming in C', credits: 4, internal: 25, midSem: 28, endSem: 44, total: 97, grade: 'A+', point: 10 },
          { code: 'HU101', name: 'Professional Communication', credits: 4, internal: 21, midSem: 22, endSem: 34, total: 77, grade: 'B+', point: 8 }
        ]
      },
      {
        semNumber: 2,
        year: 1,
        academicYear: '2023-2024',
        sgpa: '8.90',
        totalCredits: 22,
        resultStatus: 'PASSED',
        feeDetails: {
          total: 75000,
          paid: 75000,
          status: 'PAID',
          receiptNo: 'RCP-2024-SEM2-042',
          paidOn: '2024-01-15'
        },
        attendanceOverall: 94,
        subjectWiseAttendance: [
          { code: 'MA102', name: 'Engineering Mathematics-II', attended: 43, total: 45, percentage: 95 },
          { code: 'CH101', name: 'Engineering Chemistry', attended: 39, total: 42, percentage: 92 },
          { code: 'CS102', name: 'Digital Logic & Circuit Design', attended: 42, total: 44, percentage: 95 },
          { code: 'ME101', name: 'Engineering Mechanics', attended: 37, total: 40, percentage: 92 }
        ],
        markSheet: [
          { code: 'MA102', name: 'Engineering Mathematics-II', credits: 4, internal: 26, midSem: 27, endSem: 43, total: 96, grade: 'A+', point: 10 },
          { code: 'CH101', name: 'Engineering Chemistry', credits: 4, internal: 23, midSem: 24, endSem: 37, total: 84, grade: 'A', point: 9 },
          { code: 'CS102', name: 'Digital Logic & Circuit Design', credits: 4, internal: 25, midSem: 26, endSem: 41, total: 92, grade: 'A+', point: 10 },
          { code: 'ME101', name: 'Engineering Mechanics', credits: 4, internal: 21, midSem: 22, endSem: 35, total: 78, grade: 'B+', point: 8 },
          { code: 'CS103', name: 'Python Programming Lab', credits: 6, internal: 28, midSem: 28, endSem: 43, total: 99, grade: 'A+', point: 10 }
        ]
      },
      {
        semNumber: 3,
        year: 2,
        academicYear: '2024-2025',
        sgpa: '9.10',
        totalCredits: 21,
        resultStatus: 'PASSED',
        feeDetails: {
          total: 80000,
          paid: 80000,
          status: 'PAID',
          receiptNo: 'RCP-2024-SEM3-042',
          paidOn: '2024-08-12'
        },
        attendanceOverall: 91,
        subjectWiseAttendance: [
          { code: 'CS301', name: 'Object Oriented Programming', attended: 40, total: 44, percentage: 90 },
          { code: 'CS302', name: 'Computer Organization & Arch', attended: 38, total: 42, percentage: 90 },
          { code: 'CS303', name: 'Discrete Mathematical Structures', attended: 41, total: 43, percentage: 95 }
        ],
        markSheet: [
          { code: 'CS301', name: 'Object Oriented Programming', credits: 4, internal: 27, midSem: 27, endSem: 44, total: 98, grade: 'A+', point: 10 },
          { code: 'CS302', name: 'Computer Organization & Arch', credits: 4, internal: 24, midSem: 25, endSem: 39, total: 88, grade: 'A', point: 9 },
          { code: 'CS303', name: 'Discrete Mathematical Structures', credits: 4, internal: 26, midSem: 28, endSem: 42, total: 96, grade: 'A+', point: 10 },
          { code: 'CS304', name: 'Data Structures Lab', credits: 5, internal: 28, midSem: 29, endSem: 43, total: 100, grade: 'A+', point: 10 },
          { code: 'HS301', name: 'Economics & Financial Analysis', credits: 4, internal: 20, midSem: 21, endSem: 32, total: 73, grade: 'B+', point: 8 }
        ]
      },
      {
        semNumber: 4,
        year: 2,
        academicYear: '2024-2025',
        sgpa: '8.95',
        totalCredits: 22,
        resultStatus: 'PASSED',
        feeDetails: {
          total: 80000,
          paid: 80000,
          status: 'PAID',
          receiptNo: 'RCP-2025-SEM4-042',
          paidOn: '2025-01-18'
        },
        attendanceOverall: 93,
        subjectWiseAttendance: [
          { code: 'CS401', name: 'Design & Analysis of Algorithms', attended: 42, total: 44, percentage: 95 },
          { code: 'CS402', name: 'Software Engineering & UML', attended: 40, total: 43, percentage: 93 },
          { code: 'CS403', name: 'Theory of Computation', attended: 39, total: 42, percentage: 92 }
        ],
        markSheet: [
          { code: 'CS401', name: 'Design & Analysis of Algorithms', credits: 4, internal: 25, midSem: 27, endSem: 41, total: 93, grade: 'A+', point: 10 },
          { code: 'CS402', name: 'Software Engineering & UML', credits: 4, internal: 24, midSem: 24, endSem: 38, total: 86, grade: 'A', point: 9 },
          { code: 'CS403', name: 'Theory of Computation', credits: 4, internal: 23, midSem: 25, endSem: 37, total: 85, grade: 'A', point: 9 },
          { code: 'CS404', name: 'Database Management Systems Lab', credits: 5, internal: 27, midSem: 28, endSem: 43, total: 98, grade: 'A+', point: 10 },
          { code: 'MA401', name: 'Probability & Statistics', credits: 5, internal: 22, midSem: 23, endSem: 36, total: 81, grade: 'A', point: 9 }
        ]
      }
    ]
  },
  {
    id: 'STU-2023-02',
    password: 'student123',
    name: 'Priya Sharma',
    rollNo: '2024ECE015',
    email: 'priya.sharma@student.college.edu',
    phone: '+1 (555) 432-1098',
    department: 'Electronics & Communication Engineering',
    section: 'B',
    currentYear: 2,
    currentSem: 3,
    guardianName: 'Rajesh Sharma',
    guardianPhone: '+1 (555) 432-8888',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    currentCourses: [
      { code: 'EC301', name: 'Signals & Systems', credits: 4, faculty: 'Prof. Anita Roy' },
      { code: 'EC302', name: 'Analog Circuits', credits: 4, faculty: 'Prof. Anita Roy' },
      { code: 'EC303', name: 'Electromagnetic Fields', credits: 4, faculty: 'Dr. Nikola Tesla' },
      { code: 'EC304', name: 'Analog Electronics Lab', credits: 3, faculty: 'Prof. Anita Roy' }
    ],
    currentMarks: {
      EC301: { internal1: 22, internal2: 23, midSem: 26, endSem: 38, practical: 0, maxTotal: 100 },
      EC302: { internal1: 20, internal2: 21, midSem: 24, endSem: 35, practical: 0, maxTotal: 100 },
      EC303: { internal1: 21, internal2: 22, midSem: 25, endSem: 37, practical: 0, maxTotal: 100 },
      EC304: { internal1: 24, internal2: 24, midSem: 26, endSem: 0, practical: 45, maxTotal: 100 }
    },
    currentAttendance: {
      EC301: { attended: 28, total: 32, percentage: 88 },
      EC302: { attended: 26, total: 30, percentage: 87 },
      EC303: { attended: 27, total: 31, percentage: 87 },
      EC304: { attended: 25, total: 27, percentage: 92 }
    },
    currentFee: {
      totalAmount: 80000,
      paidAmount: 50000,
      dueAmount: 30000,
      status: 'PARTIAL',
      dueDate: '2026-09-30',
      receiptNo: 'RCP-2026-EC3-015',
      breakdown: [
        { label: 'Tuition Fee', amount: 60000 },
        { label: 'Laboratory Fee', amount: 15000 },
        { label: 'Library Dues', amount: 5000 }
      ]
    },
    previousSemesters: [
      {
        semNumber: 1,
        year: 1,
        academicYear: '2024-2025',
        sgpa: '8.40',
        totalCredits: 20,
        resultStatus: 'PASSED',
        feeDetails: { total: 75000, paid: 75000, status: 'PAID', receiptNo: 'RCP-2024-ECE1-015', paidOn: '2024-08-05' },
        attendanceOverall: 88,
        subjectWiseAttendance: [
          { code: 'MA101', name: 'Engineering Mathematics-I', attended: 38, total: 45, percentage: 84 },
          { code: 'PH101', name: 'Engineering Physics', attended: 37, total: 42, percentage: 88 }
        ],
        markSheet: [
          { code: 'MA101', name: 'Engineering Mathematics-I', credits: 4, internal: 22, midSem: 23, endSem: 36, total: 81, grade: 'A', point: 9 },
          { code: 'PH101', name: 'Engineering Physics', credits: 4, internal: 21, midSem: 22, endSem: 34, total: 77, grade: 'B+', point: 8 }
        ]
      },
      {
        semNumber: 2,
        year: 1,
        academicYear: '2024-2025',
        sgpa: '8.60',
        totalCredits: 22,
        resultStatus: 'PASSED',
        feeDetails: { total: 75000, paid: 75000, status: 'PAID', receiptNo: 'RCP-2025-ECE2-015', paidOn: '2025-01-10' },
        attendanceOverall: 90,
        subjectWiseAttendance: [
          { code: 'MA102', name: 'Engineering Mathematics-II', attended: 40, total: 44, percentage: 90 },
          { code: 'EC101', name: 'Basic Circuit Theory', attended: 39, total: 42, percentage: 92 }
        ],
        markSheet: [
          { code: 'MA102', name: 'Engineering Mathematics-II', credits: 4, internal: 24, midSem: 25, endSem: 38, total: 87, grade: 'A', point: 9 },
          { code: 'EC101', name: 'Basic Circuit Theory', credits: 4, internal: 25, midSem: 26, endSem: 39, total: 90, grade: 'A+', point: 10 }
        ]
      }
    ]
  },
  {
    id: 'STU-2023-03',
    password: 'student123',
    name: 'Rohan Verma',
    rollNo: '2022IT008',
    email: 'rohan.verma@student.college.edu',
    phone: '+1 (555) 789-0123',
    department: 'Information Technology',
    section: 'A',
    currentYear: 4,
    currentSem: 7,
    guardianName: 'Sanjay Verma',
    guardianPhone: '+1 (555) 789-7777',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    currentCourses: [
      { code: 'IT701', name: 'Cloud Computing & Security', credits: 4, faculty: 'Dr. Robert Vance' },
      { code: 'IT702', name: 'Big Data Analytics', credits: 4, faculty: 'Dr. Robert Vance' },
      { code: 'IT703', name: 'Major Project Phase 1', credits: 6, faculty: 'Dr. Robert Vance' }
    ],
    currentMarks: {
      IT701: { internal1: 24, internal2: 25, midSem: 28, endSem: 41, practical: 0, maxTotal: 100 },
      IT702: { internal1: 22, internal2: 23, midSem: 26, endSem: 39, practical: 0, maxTotal: 100 },
      IT703: { internal1: 28, internal2: 29, midSem: 29, endSem: 0, practical: 48, maxTotal: 100 }
    },
    currentAttendance: {
      IT701: { attended: 31, total: 33, percentage: 94 },
      IT702: { attended: 29, total: 32, percentage: 90 },
      IT703: { attended: 24, total: 25, percentage: 96 }
    },
    currentFee: {
      totalAmount: 90000,
      paidAmount: 90000,
      dueAmount: 0,
      status: 'PAID',
      dueDate: '2026-08-30',
      receiptNo: 'RCP-2026-IT7-008',
      breakdown: [
        { label: 'Tuition Fee', amount: 70000 },
        { label: 'Cloud Infrastructure & Lab', amount: 15000 },
        { label: 'Placement & Training Fund', amount: 5000 }
      ]
    },
    previousSemesters: [
      { semNumber: 1, year: 1, academicYear: '2022-2023', sgpa: '8.50', totalCredits: 20, resultStatus: 'PASSED', feeDetails: { total: 70000, paid: 70000, status: 'PAID' }, attendanceOverall: 90, subjectWiseAttendance: [], markSheet: [] },
      { semNumber: 2, year: 1, academicYear: '2022-2023', sgpa: '8.70', totalCredits: 22, resultStatus: 'PASSED', feeDetails: { total: 70000, paid: 70000, status: 'PAID' }, attendanceOverall: 92, subjectWiseAttendance: [], markSheet: [] },
      { semNumber: 3, year: 2, academicYear: '2023-2024', sgpa: '8.80', totalCredits: 21, resultStatus: 'PASSED', feeDetails: { total: 75000, paid: 75000, status: 'PAID' }, attendanceOverall: 93, subjectWiseAttendance: [], markSheet: [] },
      { semNumber: 4, year: 2, academicYear: '2023-2024', sgpa: '8.90', totalCredits: 22, resultStatus: 'PASSED', feeDetails: { total: 75000, paid: 75000, status: 'PAID' }, attendanceOverall: 91, subjectWiseAttendance: [], markSheet: [] },
      { semNumber: 5, year: 3, academicYear: '2024-2025', sgpa: '9.05', totalCredits: 24, resultStatus: 'PASSED', feeDetails: { total: 85000, paid: 85000, status: 'PAID' }, attendanceOverall: 95, subjectWiseAttendance: [], markSheet: [] },
      { semNumber: 6, year: 3, academicYear: '2024-2025', sgpa: '9.20', totalCredits: 24, resultStatus: 'PASSED', feeDetails: { total: 85000, paid: 85000, status: 'PAID' }, attendanceOverall: 96, subjectWiseAttendance: [], markSheet: [] }
    ]
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASN-501',
    title: 'Red-Black Tree & AVL Tree Implementation',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    assignedBy: 'Prof. Sarah Jenkins',
    dueDate: '2026-08-25',
    maxPoints: 50,
    description: 'Implement self-balancing binary search trees (AVL & Red-Black) in Python or C++. Include dynamic rotation benchmarks and execution metrics for 100k random insertions.',
    attachments: ['https://college.edu/resources/avl_trees_guide.pdf'],
    submissions: [
      {
        studentId: 'STU-2023-01',
        studentName: 'Alex Rivera',
        submittedOn: '2026-08-20',
        contentLink: 'https://github.com/alexrivera/ds-avl-trees-assignment',
        solutionNotes: 'Implemented both AVL and Red-Black trees with custom benchmark scripts comparing height variance.',
        status: 'GRADED',
        score: 48,
        feedback: 'Excellent work! Benchmark plots and rotation handling were spot on.'
      }
    ]
  },
  {
    id: 'ASN-502',
    title: 'Process Synchronization & Semaphore Simulation',
    subjectCode: 'CS502',
    subjectName: 'Operating Systems',
    assignedBy: 'Prof. Sarah Jenkins',
    dueDate: '2026-09-02',
    maxPoints: 40,
    description: 'Build a multi-threaded simulation of the Dining Philosophers Problem and Producer-Consumer Problem using POSIX mutexes and semaphores.',
    attachments: ['https://college.edu/resources/posix_threads_lab.pdf'],
    submissions: [
      {
        studentId: 'STU-2023-01',
        studentName: 'Alex Rivera',
        submittedOn: '2026-08-22',
        contentLink: 'https://github.com/alexrivera/os-semaphores-lab',
        solutionNotes: 'Used C pthreads library with mutex barriers to prevent deadlock.',
        status: 'SUBMITTED',
        score: null,
        feedback: null
      }
    ]
  },
  {
    id: 'ASN-301',
    title: 'Fourier Series & Signal Decomposition',
    subjectCode: 'EC301',
    subjectName: 'Signals & Systems',
    assignedBy: 'Prof. Anita Roy',
    dueDate: '2026-08-28',
    maxPoints: 30,
    description: 'Calculate Fourier Coefficients for square and sawtooth waves. Plot harmonic synthesis in MATLAB/Python.',
    attachments: [],
    submissions: [
      {
        studentId: 'STU-2023-02',
        studentName: 'Priya Sharma',
        submittedOn: '2026-08-21',
        contentLink: 'https://github.com/priyasharma/signals-fourier-lab',
        solutionNotes: 'Submitted Python notebook with Matplotlib plots.',
        status: 'GRADED',
        score: 28,
        feedback: 'Great visualization of harmonic Gibbs phenomenon.'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANC-101',
    title: 'Mid-Semester Examination Schedule Announced',
    date: '2026-08-15',
    category: 'Exam Alert',
    author: 'Controller of Examinations',
    content: 'The Mid-Semester examinations for Semesters 3, 5, and 7 are scheduled to commence from September 10, 2026. Hall tickets will be issued via the ERP portal on Sep 2.'
  },
  {
    id: 'ANC-102',
    title: 'Annual Campus Hackathon & Tech Fest Registration Open',
    date: '2026-08-12',
    category: 'Events',
    author: 'Student Activity Council',
    content: 'InnovateX 2026 registrations are live! Prize pool of ₹2,50,000 across Web, AI, Robotics, and IoT categories. Register your team before Aug 30.'
  },
  {
    id: 'ANC-103',
    title: 'Library Hours Extended & IEEE Digital Access',
    date: '2026-08-08',
    category: 'Facilities',
    author: 'Chief Librarian',
    content: 'Central Library will remain open till 11:00 PM on weekdays. Remote VPN access credentials for IEEE Xplore digital library have been updated.'
  }
];

export const ATTENDANCE_LOGS = [
  { id: 'LOG-1', date: '2026-08-18', subjectCode: 'CS501', presentStudentIds: ['STU-2023-01'] },
  { id: 'LOG-2', date: '2026-08-18', subjectCode: 'EC301', presentStudentIds: ['STU-2023-02'] },
  { id: 'LOG-3', date: '2026-08-17', subjectCode: 'CS502', presentStudentIds: ['STU-2023-01'] }
];
