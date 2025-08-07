import React from 'react';
import StatementTable from './_components/StatementTable';

const page = () => {
  return (
    <div>
      <h1 className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 ">All Appoinments</h1>
      <StatementTable />
    </div>
  );
};

export default page;
