import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import { Modal } from '../common/Modal';
import { CreditCard, Receipt, Printer, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const StudentFeeView = () => {
  const { user } = useAuth();
  const fee = user?.currentFee || {
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
  };

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" /> Current Semester Fee & Payment Receipts
          </h2>
          <p className="text-sm text-slate-400">View tuition fee breakdown, payment clearance status, and digital receipts</p>
        </div>

        <button
          onClick={() => setIsReceiptModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Receipt className="w-4 h-4" /> View Official Fee Receipt
        </button>
      </div>

      {/* Fee Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Total Semester Fee</p>
          <h3 className="text-2xl font-bold text-white">{formatCurrency(fee.totalAmount)}</h3>
          <p className="text-xs text-slate-400">Semester {user?.currentSem} Academic Fees</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Cleared Paid Amount</p>
          <h3 className="text-2xl font-bold text-emerald-400">{formatCurrency(fee.paidAmount)}</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified by Accounts
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-medium">Outstanding Dues</p>
          <h3 className={`text-2xl font-bold ${fee.dueAmount > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
            {formatCurrency(fee.dueAmount)}
          </h3>
          <p className="text-xs text-slate-400">Due Date: {fee.dueDate || '2026-09-15'}</p>
        </div>
      </div>

      {/* Fee Itemization Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Receipt className="w-4 h-4 text-indigo-400" /> Fee Component Itemization
        </h3>

        <div className="divide-y divide-slate-800/80">
          {fee.breakdown?.map((item, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-sm">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className="font-mono text-white font-semibold">{formatCurrency(item.amount)}</span>
            </div>
          ))}
          <div className="pt-4 flex justify-between items-center text-base font-bold">
            <span className="text-white">Total Amount</span>
            <span className="text-indigo-400">{formatCurrency(fee.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Official Fee Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Digital Payment Receipt"
        maxWidth="max-w-xl"
      >
        <div className="space-y-6 print-card p-6 bg-slate-900 rounded-xl border border-slate-800 text-white">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-400">ACADEMIA COLLEGE OF ENGINEERING</h3>
              <p className="text-xs text-slate-400">Student Fee Payment Receipt</p>
            </div>
            <div className="text-right font-mono text-xs text-slate-400">
              <p>Receipt: {fee.receiptNo || 'RCP-2026-CS5-042'}</p>
              <p>Issued Date: 2026-08-18</p>
            </div>
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
          </div>

          <div className="space-y-2 border-t border-b border-slate-800 py-4">
            {fee.breakdown?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-slate-300">{item.label}</span>
                <span className="font-mono text-slate-200">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm font-bold pt-2">
            <span>Total Paid Amount:</span>
            <span className="text-emerald-400 text-lg">{formatCurrency(fee.paidAmount)}</span>
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
    </div>
  );
};
