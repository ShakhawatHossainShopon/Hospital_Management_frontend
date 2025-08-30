/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BillingInvoice from '@/components/BillingInvoice';
interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}
const Page = () => {
  const { customerId } = useParams();
  const { patientId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['get-billdata-1a54'],
    queryFn: async () => {
      const res = await APIKit.billing.getBillData(patientId);
      return res?.data;
    },
  });
  console.log(data);

  const testOptions =
    data?.tests?.map((value: any) => ({
      value: value?.id,
      label: value?.item_name,
      price: value?.unit_price,
    })) || [];

  const servicesOptions =
    data?.services?.map((value: any) => ({
      value: value?.id,
      label: value?.service_name,
      price: value?.unit_price,
    })) || [];
  const employeeOptions =
    data?.employees?.map((value: any) => ({
      value: value?.id,
      label: value?.name,
    })) || [];
  // 🟢 State for invoice items
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [testQty, setTestQty] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceQty, setServiceQty] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [refId, setRefId] = useState(null);
  const [doctorId, setDoctorId] = useState();
  const [total, setTotal] = useState(1);
  useEffect(() => {
    setTotal(invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [invoiceItems]);
  if (isLoading) return <h1>loading...</h1>;

  const handleAdd = (selected: any, qty: number, options: any[]) => {
    if (!selected || qty < 1) return alert('Select item & valid quantity');
    const item = options.find((o: any) => o.value === selected);
    if (invoiceItems.some((i) => i.name === item.label)) return alert('Item already added');
    setInvoiceItems([...invoiceItems, { name: item.label, price: item.price, quantity: qty }]);
    setTotal(invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  };

  const doctorOptions =
    data?.doctors?.map((value: any) => ({
      value: value?.id,
      label: `${value?.firstname} ${value?.lastname}`,
    })) || [];
  const refOption =
    data?.refs?.map((value: any) => ({
      value: value?.id,
      label: value?.fullname,
    })) || [];

  return (
    <div className="flex max-w-full gap-4">
      <div className="bg-white rounded-md p-6 space-y-5 flex-[2]">
        {/* Diagnostic Test */}
        <div className=" gap-4 flex items-center">
          <div className="w-full">
            <ReusableSelect
              label="Add Diagnostic Test"
              options={testOptions}
              value={selectedTest?.value || null}
              placeholder="Select a diagnostic test"
              onChange={(val: any) => setSelectedTest(val)}
            />
          </div>
          <div>
            <Input
              label="Quantity"
              type="number"
              value={testQty}
              onChange={(e) => setTestQty(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="mt-5">
            <Button onClick={() => handleAdd(selectedTest, testQty, testOptions)}>Add</Button>
          </div>
        </div>

        {/* Services */}
        <div className="gap-4 flex items-center">
          <div className="w-full">
            <ReusableSelect
              label="Add Services"
              options={servicesOptions}
              value={selectedService}
              onChange={(val: any) => setSelectedService(val)}
            />
          </div>
          <div>
            <Input
              label="Quantity"
              type="number"
              value={serviceQty}
              onChange={(e) => setServiceQty(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="mt-5">
            <Button onClick={() => handleAdd(selectedService, serviceQty, servicesOptions)}>
              Add
            </Button>
          </div>
        </div>

        <div className="w-full">
          <ReusableSelect
            label="Employee"
            options={employeeOptions}
            value={selectedEmployee}
            onChange={(val: any) => setSelectedEmployee(val)}
          />
        </div>

        <div className="my-6">
          <h3 className="font-semibold mb-3 text-sm border-b pb-2">Invoice Items</h3>

          {invoiceItems.length === 0 && (
            <p className="text-gray-500 text-xs">No items added yet.</p>
          )}

          <ul className="space-y-2 mt-3">
            {invoiceItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-xs">
                  <span className="font-medium text-xs">{item.name}</span> | Quantity:{' '}
                  {item.quantity} | Total:{' '}
                  <span className="font-semibold">{item.price * item.quantity}</span> BDT
                </span>
                <button
                  className="text-red-500  text-sm cursor-pointer font-medium hover:text-red-700"
                  onClick={() => setInvoiceItems(invoiceItems.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="space-y-4">
            <div className="w-full">
              <ReusableSelect
                label="Doctor"
                options={doctorOptions}
                placeholder="Select a Docotor"
                onChange={(val: any) => {
                  setDoctorId(val);
                }}
              />
            </div>
            <div className="w-full">
              <ReusableSelect
                label="References"
                options={refOption}
                placeholder="Select a Docotor"
                onChange={(val: any) => {
                  setRefId(val);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[1] bg-white rounded-md p-4">
        <h2 className="font-semibold mb-3">
          <BillingInvoice
            invoiceItems={invoiceItems}
            employeeId={selectedEmployee}
            total={total}
            patient={data?.patient}
            doctorId={doctorId}
            refId={refId}
            customerId={customerId}
          />
        </h2>
      </div>
    </div>
  );
};

export default Page;
