import { APIKit } from '@/common/helpers/APIKit';
import { ChevronDown } from 'lucide-react';
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
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
type Scedules = {
  id: number;
  day: number;
  startTime: string;
  time_indicator: 'AM' | 'PM';
  capacity: number;
  duration: number;
  doctor_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export function SceduleTable() {
  const params = useParams();
  const { id } = params;
  const {
    data: scedules,
    isLoading,
    refetch,
  } = useQuery<Scedules[]>({
    queryKey: ['get-AllScedule-1512'],
    queryFn: async () => {
      const res = await APIKit.Scedule.GetAllScedule(id);
      return res.data?.schedules;
    },
  });
  if (isLoading) {
    return (
      <div className="p-4 space-y-2 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-full "></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  console.log(scedules);

  const deleteSlots = (id: number) => {
    APIKit.Scedule.deleteScedule(id)
      .then(() => {
        toast.success('Scedule Deleted successfully');
        refetch();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };

  return (
    <div>
      <Table>
        <TableCaption className="text-xs">A list of your recent Scedules.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Time Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scedules && scedules.length > 0 ? (
            scedules?.map((schedule) => (
              <TableRow key={schedule?.id}>
                <TableCell>{dayNames[schedule.day]}</TableCell>
                <TableCell className="text-blue-600 text-[12px] font-medium">
                  {schedule?.startTime} {schedule?.time_indicator}
                </TableCell>
                <TableCell>{schedule?.capacity}</TableCell>
                <TableCell>{schedule?.duration}</TableCell>
                <TableCell>{new Date(schedule?.created_at).toLocaleString()}</TableCell>

                <TableCell className="max-w-[100px]">
                  <button
                    onClick={() => deleteSlots(schedule?.id)}
                    className="text-xs text-red-700 cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                No Scedule found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
