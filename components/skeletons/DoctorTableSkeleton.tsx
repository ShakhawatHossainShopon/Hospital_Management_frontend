import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DoctorTableSkeleton() {
  return (
    <Table>
      <TableCaption className="text-xs">A list of your recent Doctors.</TableCaption>
      <TableHeader>
        <TableRow>
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
        {/* Skeleton rows */}
        {[...Array(5)].map((_, idx) => (
          <TableRow key={idx}>
            {[...Array(11)].map((__, i) => (
              <TableCell key={i}>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
