/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { DateOnly } from '@/components/DateOnly';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'react-toastify';

const Page = () => {
  const [amount, setAmount] = useState();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-AllScedule-1512'],
    queryFn: async () => {
      const res = await APIKit.appoinment.GetSingleAppoinment(id);
      return res.data?.appointment;
    },
  });
  useEffect(() => {
    if (data?.doctor?.consultancy_fee) {
      setAmount(data.doctor.consultancy_fee);
    }
  }, [data]);
  if (isLoading) {
    return <h1>laoding</h1>;
  }

  const handlePayment = () => {
    const payload = {
      amount: data?.doctor?.consultancy_fee,
      appointmentId: id,
    };
    setLoading(true);
    APIKit.appoinment
      .payAppoinment(payload)
      .then(() => {
        toast.success('Bill Created added successfully');
        setPaymentDone(true);
        refetch();
      })
      .catch((err) => {
        if (err?.response?.status === 422 && err?.response?.data?.errors) {
          const messages = Object.values(err.response.data.errors).flat();
          messages.forEach((msg) => toast.error(String(msg)));
        } else {
          toast.error('Something went wrong');
        }
      })
      .finally(() => {
        setLoading(false); // ✅ End loading
      });
  };
  console.log(data);

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printContents = invoiceRef.current.innerHTML;
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Invoice</title></head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          router.back();
        };
      }
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-xl" ref={invoiceRef}>
        <div className="flex justify-between text-xs font-medium">
          <div>
            <h3>Bill To</h3>
            <p>
              {data?.patient?.firstname} {data?.patient?.lastname}
            </p>
            <p>Phone : {data?.patient?.mobile_phone}</p>
          </div>
          <div>
            Date : <DateOnly isoDate={data?.created_at} /> <br />
            Doctor Name : {data?.doctor?.title} {data?.doctor?.firstname} {data?.doctor?.lastname}
          </div>
        </div>
        <div className="my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Appoinment fee <br />
                  {data?.doctor?.title} {data?.doctor?.firstname} {data?.doctor?.lastname} <br />
                  {data?.doctor?.degree_name}
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>{data?.doctor?.consultancy_fee} BDT</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="py-6 flex justify-end">
            <p className="text-sm">
              Total {data?.payment_status ? 'Payed' : 'Payable'} Amount :
              <span className="font-medium">{data?.doctor?.consultancy_fee} BDT</span>
            </p>
          </div>

          <div className="py-6 flex justify-end">
            <div className="border-1 md:w-1/4 p-4">
              <p className="font-medium text-xs">Current Payment Amount</p>
              {data?.payment_status > 0 ? (
                <div className="flex gap-4">
                  <Button
                    isLoading={loading}
                    onClick={paymentDone ? handlePrint : handlePayment}
                    className="text-xs bg-green-600 my-3 rounded-sm px-4 py-[10px]"
                    size={'sm'}
                    variant={'destructive'}
                    disabled={true}
                  >
                    Payed
                  </Button>

                  <Button
                    onClick={handlePrint}
                    className="text-xs bg-blue-600 my-3 rounded-sm px-4 py-[10px]"
                    size={'sm'}
                  >
                    Print
                  </Button>
                </div>
              ) : (
                <>
                  <Input value={amount} />
                  <Button
                    isLoading={loading}
                    onClick={handlePayment}
                    className="text-xs bg-blue-600 my-3"
                    size={'sm'}
                  >
                    Confirm
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
