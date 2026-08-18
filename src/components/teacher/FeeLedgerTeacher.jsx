import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { formatCurrency } from '../../utils/helpers';
import { Modal } from '../common/Modal';
import { CreditCard, DollarSign, Receipt, CheckCircle2, Clock, AlertCircle, FileText, Printer } from 'lucide-react';

export const FeeLedgerTeacher = () => {
  const { students, updateFeeStatus } = useERP();

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedStudentForPay, setSelectedStudentForPay] = useState(null);
  const [receiptPreviewStudent, setReceiptPreviewStudent] = useState(null);

  // Form State for Recording Payment
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('ONLINE');

  const filteredStudents = students.filter((s) => {
    if (filterStatus === 'ALL') return true;
    return s.currentFee?.status === filterStatus;
  });

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedStudentForPay) return;

    const currentFee = selectedStudentForPay.currentFee || {
      totalAmount: 85000,
      paidAmount: 0,
      dueAmount: 85000,
      status: 'UNPAID'
    };

    const newPaid = currentFee.paidAmount + Number(paymentAmount);
    const newDue = Math.max(0, currentFee.totalAmount - newPaid);
    const newStatus = newDue === 0 ? 'PAID' : newPaid > 0 ? 'PARTIAL' : 'UNPAID';

    updateFeeStatus(selectedStudentForPay.id, {
      paidAmount: newPaid,
      dueAmount: newDue,
      status: newStatus,
      receiptNo: currentFee.receiptNo || `RCP-2026-FEE-${selectedStudentForPay.id}`
    });

    setSelectedStudentForPay(null);
    setPaymentAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" /> Accounts & Fee Management Ledger
          </h2>
          <p className="text-sm text-slate-400">Track tuition fees, record payments, and issue digital receipts</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('PAID')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === 'PAID' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Paid Dues
          </button>
          <button
            onClick={() => setFilterStatus('PARTIAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === 'PARTIAL' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Partial
          </button>
          <button
            onClick={() => setFilterStatus('UNPAID')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === 'UNPAID' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Unpaid
          </button>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Total Fee</th>
                <th className="px-6 py-4">Paid Amount</th>
                <th className="px-6 py-4">Outstanding Dues</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((s) => {
                const fee = s.currentFee || { totalAmount: 85000, paidAmount: 0, dueAmount: 85000, status: 'UNPAID' };

                return (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-white">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.department}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-slate-300">{s.rollNo}</td>
                    <td className="px-6 py-4 font-semibold text-white">{formatCurrency(fee.totalAmount)}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">{formatCurrency(fee.paidAmount)}</td>
                    <td className="px-6 py-4 font-semibold text-rose-400">
                      {fee.dueAmount > 0 ? formatCurrency(fee.dueAmount) : 'Clear ₹0'}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          fee.status === 'PAID'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : fee.status === 'PARTIAL'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {fee.dueAmount > 0 && (
                          <button
                            onClick={() => {
                              setSelectedStudentForPay(s);
                              setPaymentAmount(fee.dueAmount.toString());
                            }}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-semibold border border-indigo-500/30"
                          >
                            Record Payment
                          </button>
                        )}
                        <button
                          onClick={() => setReceiptPreviewStudent(s)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
                        >
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedStudentForPay && (
        <Modal
          isOpen={Boolean(selectedStudentForPay)}
          onClose={() => setSelectedStudentForPay(null)}
          title={`Record Fee Payment - ${selectedStudentForPay.name}`}
        >
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Total Course Fee: {formatCurrency(selectedStudentForPay.currentFee?.totalAmount)}</p>
              <p className="text-xs text-slate-400">Already Paid: {formatCurrency(selectedStudentForPay.currentFee?.paidAmount)}</p>
              <p className="text-sm font-bold text-rose-400">Current Outstanding Dues: {formatCurrency(selectedStudentForPay.currentFee?.dueAmount)}</p>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                required
                min="1"
                max={selectedStudentForPay.currentFee?.dueAmount}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm font-bold text-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                <option value="ONLINE">Net Banking / Credit Card</option>
                <option value="UPI">UPI / GPay / PhonePe</option>
                <option value="DEMAND_DRAFT">Bank Demand Draft (DD)</option>
                <option value="CASH">Cash Deposit</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedStudentForPay(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25"
              >
                Confirm Payment & Issue Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Receipt Preview Modal */}
      {receiptPreviewStudent && (
        <Modal
          isOpen={Boolean(receiptPreviewStudent)}
          onClose={() => setReceiptPreviewStudent(null)}
          title={`Official Fee Receipt - ${receiptPreviewStudent.name}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-6 print-card p-6 bg-slate-900 rounded-xl border border-slate-800 text-white">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-indigo-400">ACADEMIA COLLEGE OF ENGINEERING</h3>
                <p className="text-xs text-slate-400">Official Fee Acknowledgment Receipt</p>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                <p>No: {receiptPreviewStudent.currentFee?.receiptNo || 'RCP-2026-FEE'}</p>
                <p>Date: {new Date().toISOString().split('T')[0]}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Student Name:</p>
                <p className="font-bold text-white text-sm">{receiptPreviewStudent.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Roll Number:</p>
                <p className="font-bold text-white text-sm">{receiptPreviewStudent.rollNo}</p>
              </div>
              <div>
                <p className="text-slate-400">Department:</p>
                <p className="font-semibold text-slate-200">{receiptPreviewStudent.department}</p>
              </div>
              <div>
                <p className="text-slate-400">Current Semester:</p>
                <p className="font-semibold text-slate-200">Semester {receiptPreviewStudent.currentSem}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-800 py-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase">Fee Component Breakdown</h4>
              {receiptPreviewStudent.currentFee?.breakdown?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="font-mono text-slate-200">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-bold pt-2">
              <span>Total Fees Paid:</span>
              <span className="text-emerald-400 text-lg">{formatCurrency(receiptPreviewStudent.currentFee?.paidAmount)}</span>
            </div>

            <div className="flex justify-end gap-3 pt-4 no-print">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
