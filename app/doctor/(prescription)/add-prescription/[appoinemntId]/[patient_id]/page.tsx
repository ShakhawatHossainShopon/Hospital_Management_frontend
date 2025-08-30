/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Medicine {
  id: number;
  name: string;
  [key: string]: any; // any other fields
}

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { appoinemntId } = params;
  const { patient_id } = params;
  const [medicineSearch, setMedicineSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicineNameDebounce, setMedicineNameDebounce] = useState('');

  // Debounce input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMedicineNameDebounce(medicineSearch);
    }, 300);
    return () => clearTimeout(timeout);
  }, [medicineSearch]);

  // Fetch medicines
  const { data, isLoading } = useQuery({
    queryKey: ['get-medicine', medicineNameDebounce, page],
    queryFn: async () => {
      const res = await APIKit.medicine.allMedicine(medicineNameDebounce, page);
      return res?.data?.data?.medicines.slice(0, 3) || [];
    },
    enabled: !!medicineNameDebounce,
  });

  const addMedicine = (medicine: Medicine) => {
    // Prevent duplicates
    if (!selectedMedicines.find((m) => m.id === medicine.id)) {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
  };

  const removeMedicine = (id: number) => {
    setSelectedMedicines(selectedMedicines.filter((m) => m.id !== id));
  };
  console.log(selectedMedicines);
  const handleSubmit = async () => {
    const prescritions = selectedMedicines.map(({ medicine_name, manufacturer_name }) => ({
      medicine_name,
      manufacturer_name,
    }));
    const payload = {
      prescritions,
      appointment_id: appoinemntId,
      patient_id: patient_id,
    };
    setLoading(true);
    APIKit.prescription
      .addPrescription(payload)
      .then(() => {
        toast.success('Prescription added successfully');
        router.back();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="p-6 space-y-5">
      <div className="w-full rounded-xl p-4 flex justify-between bg-white">
        <h4 className="font-medium">All Medicine</h4>
        <Button
          disabled={selectedMedicines.length === 0}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Add Prescription
        </Button>
      </div>

      <div className="bg-white rounded-md p-4 flex items-center gap-4">
        <div className="w-full">
          <Input
            placeholder="Search By Name"
            value={medicineSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMedicineSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Search results */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {data?.map((medicine: Medicine) => (
            <div
              key={medicine.id}
              className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded"
            >
              <span>{medicine.medicine_name}</span>
              <Button size="sm" onClick={() => addMedicine(medicine)}>
                Add
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Selected medicines */}
      {selectedMedicines.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="font-bold">Selected Medicines:</h3>
          {selectedMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="flex justify-between items-center bg-green-100 p-2 rounded"
            >
              <span>{medicine?.medicine_name}</span>
              <Button size="sm" variant="destructive" onClick={() => removeMedicine(medicine.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
