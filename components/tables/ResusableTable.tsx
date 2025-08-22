import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pagination } from '../Pagination';
type PaginationMeta = {
  current_page: number;
  last_page: number;
  total: number;
};
type ReusableTableProps<T> = {
  caption?: string;
  headers: string[];
  data?: T[];
  isLoading: boolean;
  renderRow: (item: T, index: number) => React.ReactNode;
  pagination?: PaginationMeta;
  onPageChange?: (page: number) => void;
};

export function ReusableTable<T>({
  caption,
  headers,
  data = [],
  isLoading,
  renderRow,
  pagination,
  onPageChange,
}: ReusableTableProps<T>) {
  return (
    <div>
      <Table>
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
      {pagination && onPageChange && (
        <div className="flex justify-end">
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
