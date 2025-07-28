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

export function TableDemo({ doctors }: { doctors?: Doctor[] }) {
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
        {doctors?.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell className="text-blue-600 font-medium">{`${invoice.firstname} ${invoice.lastname}`}</TableCell>
            <TableCell>{invoice.bmdc_code}</TableCell>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.mobile}</TableCell>
            <TableCell>{invoice.degree_name}</TableCell>
            <TableCell>{invoice.speciality}</TableCell>
            <TableCell>{invoice.job_designation}</TableCell>
            <TableCell>{invoice.working_place}</TableCell>
            <TableCell>{invoice.consultancy_fee}</TableCell>
            <TableCell className="text-center">
              <button className="cursor-pointer py-1 bg-blue-600 text-white px-4 rounded-2xl">
                Book
              </button>
            </TableCell>
            <TableCell>
              <select name="" id="">
                <option value="1">update</option>
                <option value="1">delete</option>
              </select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
