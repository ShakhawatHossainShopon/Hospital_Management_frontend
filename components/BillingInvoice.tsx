/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { APIKit } from '@/common/helpers/APIKit';
import { useRouter } from 'next/navigation';
interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

interface IBillingInvoice {
  invoiceItems?: InvoiceItem[];
  total: number;
  patient: any;
  employeeId: any;
  doctorId: any;
  refId: any;
  customerId: any;
}
const onlineFee = 50;
const BillingInvoice = ({
  invoiceItems,
  total,
  employeeId,
  patient,
  doctorId,
  refId,
  customerId,
}: IBillingInvoice) => {
  const router = useRouter();
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [note, setNote] = useState('');
  const [billLoading, setBillLoading] = useState(false);

  const totalAmount = total + onlineFee;
  const payableAmount = totalAmount - discount;
  const dueAmount = payableAmount - paidAmount;

  const confirmPay = (data: any) => {
    if (invoiceItems?.length === 0) {
      toast.error('Plaese add invoice items');
      return;
    }
    if (!employeeId) {
      toast.error('Plaese Select Employee');
      return;
    }
    if (!doctorId) {
      toast.error('Plaese Select Doctor');
      return;
    }

    const payload = {
      invoice_data: invoiceItems,
      refer_id: refId,
      doctor_id: doctorId,
      patient_id: patient?.id,
      total_amount: data?.total,
      payable_amount: data?.payable_amount,
      paid_amount: data?.paid_amount,
      discount: data?.discount,
      note: note,
      employee_id: employeeId,
      online_fee: onlineFee,
    };

    setBillLoading(true);

    APIKit.billing
      .createBill(payload)
      .then(() => {
        toast.success('Bill added successfully');
        router.push(`/employee/${customerId}/all-bill`);
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setBillLoading(false); // ✅ End loading
      });
  };
  console.log(payableAmount);
  console.log(paidAmount);

  return (
    <div>
      <div className="text-xs">
        <div className="border rounded-sm p-2 my-3">
          <div className="font-medium">
            Patient Name :{' '}
            <span className="font-semibold text-blue-600 cursor-pointer">
              {patient?.firstname} {patient?.lastname}
            </span>
          </div>
          <div className="flex justify-between my-2 font-medium">
            <span>Gender : {patient?.gender}</span>
            <span>Age : {patient?.age}</span>
            <span>Phone : {patient?.mobile_phone}</span>
          </div>
          <hr />
          <div className="text-right space-y-2 mt-2">
            <p>Sub Total : {total}</p>
            <p className="font-normal">Online Service Charge : {onlineFee} BDT</p>
            <p className="text-blue-600">Total Amount: {totalAmount}</p>
            <p className="text-yellow-500">Discount: {discount}</p>
            <p className="text-blue-600">Payable Amount: {payableAmount}</p>
            <p className="text-green-600">Paid Amount: {paidAmount}</p>
            <p className="text-red-800">Due Amount: {dueAmount}</p>
          </div>

          <div className="space-y-4 mt-4">
            <Input
              label="dicount"
              type="number"
              placeholder="Enter Discount"
              onChange={(e) => {
                if (Number(e.target.value) < 0) {
                  toast.error('discount cannot be negative');
                  e.target.value = '';
                  setDiscount(0);
                  return;
                }
                if (Number(e.target.value) > total) {
                  toast.error('discount cannot be equal or greater than total amount');
                  e.target.value = ''; // clear input
                  setDiscount(0);
                  return;
                } else {
                  setDiscount(Number(e.target.value));
                }
              }}
              className="border p-1 w-full"
            />

            <Input
              label="payable amount"
              type="number"
              placeholder="Enter Paid Amount"
              onChange={(e) => {
                if (Number(e.target.value) < 0) {
                  toast.error('Paid amount cannot be negative');
                  e.target.value = '';
                  setPaidAmount(0);
                  return;
                }
                if (Number(e.target.value) > payableAmount) {
                  toast.error('Paid Amount cannot be greater than total amount');
                  e.target.value = ''; // clear input
                  setPaidAmount(0);
                  return;
                } else {
                  setPaidAmount(Number(e.target.value));
                }
              }}
              className="border p-1 w-full"
              min={0}
            />

            <Textarea
              placeholder="Enter Note"
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border p-1 w-full text-xs placeholder:text-xs"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              disabled={paidAmount === 0}
              isLoading={billLoading}
              onClick={() =>
                confirmPay({
                  total: totalAmount,
                  discount: discount,
                  paid_amount: paidAmount,
                  due_amount: dueAmount,
                  payable_amount: payableAmount,
                })
              }
              className="bg-green-700 hover:bg-green-900"
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInvoice;
