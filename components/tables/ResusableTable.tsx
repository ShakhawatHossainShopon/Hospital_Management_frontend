import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ReusableTableProps<T> = {
  caption?: string;
  headers: string[];
  data?: T[];
  isLoading: boolean;
  renderRow: (item: T, index: number) => React.ReactNode;
};

export function ReusableTable<T>({
  caption,
  headers,
  data = [],
  isLoading,
  renderRow,
}: ReusableTableProps<T>) {
  return (
    <div>
      <Table>
        {caption && <TableCaption className="text-xs">{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {headers.map((head, i) => (
              <TableHead key={i}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[12px]">
          {isLoading ? (
            [...Array(10)].map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                {headers.map((_, i) => (
                  <TableCell key={i}>
                    <div className="h-3 w-full bg-gray-200 rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center text-muted-foreground py-8"
              >
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
