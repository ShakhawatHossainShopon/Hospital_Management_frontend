import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function PatientTableSkeleton() {
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
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 w-24 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-12 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-10 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-8 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-10 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-14 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-6 w-20 rounded bg-gray-300 animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
