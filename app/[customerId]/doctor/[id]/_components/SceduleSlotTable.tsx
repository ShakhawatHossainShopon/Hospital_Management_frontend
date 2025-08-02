import { APIKit } from '@/common/helpers/APIKit';
import { ChevronDown } from 'lucide-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import doctoricon from '@/public/assets/doctor-icon.png';
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
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Image from 'next/image';

type ScheduleSlot = {
  appointment_id: number;
  created_at: string;
  id: number;
  is_booked: number;
  name: string;
  patient_age: string;
  patient_id: number;
  phone: string;
  scedule_id: number;
  status: string;
  time: string;
  time_indicator: string;
  type: string;
  updated_at: string;
  user_id: number;
  note: string;
};

interface IScheduleProps {
  slots: ScheduleSlot[];
  doctor: {
    firstname: string;
    lastname: string;
    title: string;
    degree_name: string;
    speciality: string;
  };
}

function formatTo12Hour(time: string): string {
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export function SceduleSlotTable() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [day, setDay] = useState(new Date().getDay());
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data, isLoading, refetch } = useQuery<IScheduleProps>({
    queryKey: ['get-scedule-14a4', id, day],
    queryFn: async () => {
      const res = await APIKit.Scedule.AllScedule(id, day);
      return res.data;
    },
  });
  console.log(data);

  const deleteSlots = (id: number) => {
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);

    if (dateValue) {
      const dateObj = new Date(dateValue);
      setDay(dateObj.getDay());
    } else {
      setDay(0);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center gap-x-3 bg-gray-50 p-4 rounded-md mb-6 md:w-1/5">
          <div className="shrink-0">
            <Image
              className="rounded-full object-cover"
              src={doctoricon}
              alt="Doctor Avatar"
              width={40}
              height={40}
            />
          </div>
          <div className="grow">
            <h1 className="text-sm font-medium text-gray-800 dark:text-neutral-200">
              {data?.doctor?.title} {data?.doctor?.firstname} {data?.doctor?.lastname}
            </h1>
            <p className="text-xs text-gray-600 dark:text-neutral-400">
              {data?.doctor?.degree_name}
            </p>
            <p className="text-xs text-gray-600 dark:text-neutral-400">
              {data?.doctor?.speciality}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4 w-full flex justify-center items-center gap-2">
        <button
          onClick={() => {
            const prevDate = new Date(selectedDate);
            prevDate.setDate(prevDate.getDate() - 1);
            setSelectedDate(prevDate.toISOString().split('T')[0]);
            setDay(prevDate.getDay());
          }}
          className="px-2 py-2 bg-gray-300 cursor-pointer text-sm border border-gray-300 rounded  hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          className="appearance-none px-2 py-2 text-sm border border-gray-300 rounded-sm bg-gray-300 text-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />

        <button
          onClick={() => {
            const nextDate = new Date(selectedDate);
            nextDate.setDate(nextDate.getDate() + 1);
            setSelectedDate(nextDate.toISOString().split('T')[0]);
            setDay(nextDate.getDay());
          }}
          className="px-2 py-2 bg-gray-300 text-sm border border-gray-300 rounded  hover:bg-gray-100 cursor-pointer transition"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <Table>
        <TableCaption className="text-xs">A list of your recent Slots.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[50px]">#</TableHead>
            <TableHead>Visit Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="max-w-[150px]">Note</TableHead>
            <TableHead>Book Now</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[12px]">
          {isLoading ? (
            [...Array(10)].map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell>
                  <div className="h-3 w-4 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-10 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-14 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-12 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </TableCell>
              </TableRow>
            ))
          ) : data && data?.slots.length > 0 ? (
            data?.slots?.map((slots) => (
              <TableRow key={slots?.id}>
                <TableCell>{slots?.id}</TableCell>
                <TableCell className="text-blue-600 text-[12px] font-medium">
                  {formatTo12Hour(slots.time.slice(0, -3))}
                </TableCell>
                <TableCell className="min-w-[100px] text-orange-600 cursor-pointer underline">
                  {slots?.name}
                </TableCell>
                <TableCell>{slots?.phone}</TableCell>
                <TableCell
                  className={`${slots?.type === 'Old' ? 'text-orange-600' : 'text-blue-600'}`}
                >
                  {slots?.type}
                </TableCell>
                <TableCell>{slots?.is_booked ? slots?.status : null}</TableCell>
                <TableCell>{slots?.patient_age}</TableCell>
                <TableCell className="min-w-[80px]">{slots?.note}</TableCell>
                <TableCell>
                  {slots?.is_booked ? (
                    <p className="text-orange-600 cursor-pointer underline text-[12px]">Booked</p>
                  ) : (
                    <button
                      onClick={() => router.push(`${params.id}/add-appointment/${slots.id}`)}
                      className="text-blue-600 cursor-pointer underline text-[12px]"
                    >
                      Book Now
                    </button>
                  )}
                </TableCell>

                <TableCell className="max-w-[100px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="cursor-pointer flex items-center gap-2 px-4 py-1.5 border-[2px] border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50 transition">
                        Actions
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-xs" align="end">
                      <DropdownMenuItem className="text-xs font-medium text-yellow-500">
                        Create Appointment bill
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-medium text-blue-800">
                        Create Prescription bill
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteSlots(slots?.id)}
                        className="text-xs text-red-700"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
