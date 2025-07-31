import { APIKit } from '@/common/helpers/APIKit';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
interface Ipatients {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  birth_date: string;
  blood_groupe: string;
  height: string;
  weight: string;
  mobile_phone: string;
  guardian_name: string;
  address_line: string;
  area: string;
  city: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}
interface PatientTableProps {
  patients: Ipatients[];

  refetch: () => void;
}
export function PatientTable({ patients, refetch }: PatientTableProps) {
  console.log(patients);

  const params = useParams();
  const deletePatient = (id: number) => {
    APIKit.patient
      .deletePatient(id)
      .then(() => {
        toast.success('Doctor Deleted successfully');
        refetch();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };

  return (
    <Table>
      <TableCaption className="text-xs">A list of your recent Patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Patient Id</TableHead>
          <TableHead>Blood Groupe</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Mobile Phone</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>First Visit</TableHead>
          <TableHead>Bills</TableHead>
          <TableHead>Apoinments</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients && patients.length > 0 ? (
          patients?.map((patient) => (
            <TableRow key={patient?.id}>
              <TableCell className="text-blue-600 text-[12px] font-medium">
                <Link
                  className="hover:underline"
                  href={`/${params.customerId}/doctor/doctorProfile/${patient.id}`}
                >
                  {`${patient.firstname} ${patient.lastname}`}
                </Link>
              </TableCell>
              <TableCell>{patient?.id}</TableCell>
              <TableCell>{patient?.blood_groupe}</TableCell>
              <TableCell>{patient?.gender}</TableCell>
              <TableCell>{patient?.mobile_phone}</TableCell>
              <TableCell>{patient?.age}</TableCell>
              <TableCell>
                {patient?.created_at ? new Date(patient.created_at).toUTCString() : ''}
              </TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell className="max-w-[100px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer py-1 bg-red-600 text-white px-4 rounded-sm font-bold">
                      Action
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-xs" align="end">
                    <DropdownMenuItem className="text-xs font-bold text-yellow-500">
                      Update Doctor
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deletePatient(patient?.id)}
                      className="text-xs font-bold text-red-500"
                    >
                      Delete Doctor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
              No doctors found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
