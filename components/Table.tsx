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
import { Doctor } from '@/types/doctor.types';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

export function TableDemo({ doctors, refetch }: { doctors?: Doctor[]; refetch: () => void }) {
  const params = useParams();
  const deleteUser = (id: number) => {
    APIKit.doctor
      .deleteDoctor(id)
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
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50]px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>BMDC Code</TableHead>
          <TableHead>Doctors ID</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Specialities</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Consultancy Fee</TableHead>
          <TableHead>Apoinments</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors && doctors.length > 0 ? (
          doctors?.map((invoice) => (
            <TableRow key={invoice?.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell className="text-blue-600 text-[12px] font-medium">
                <Link
                  className="hover:underline"
                  href={`/${params.customerId}/doctor/doctorProfile/${invoice.id}`}
                >
                  {`${invoice.firstname} ${invoice.lastname}`}
                </Link>
              </TableCell>
              <TableCell>{invoice?.bmdc_code}</TableCell>
              <TableCell>{invoice?.id}</TableCell>
              <TableCell>{invoice?.mobile}</TableCell>
              <TableCell>{invoice?.degree_name}</TableCell>
              <TableCell>{invoice?.speciality}</TableCell>
              <TableCell>{invoice?.job_designation}</TableCell>
              <TableCell>{invoice?.working_place}</TableCell>
              <TableCell>{invoice?.consultancy_fee} BDT</TableCell>
              <TableCell className="text-center">
                <button className="cursor-pointer py-1 bg-blue-600 text-white px-4 rounded-2xl">
                  Book
                </button>
              </TableCell>
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
                      onClick={() => deleteUser(invoice?.id)}
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
