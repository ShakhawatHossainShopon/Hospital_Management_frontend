'use client';

import * as React from 'react';
import { Hospital } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { FaHospitalUser, FaUsers, FaUserShield, FaWallet } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';
import { FaFileInvoiceDollar, FaClinicMedical } from 'react-icons/fa';
export function AdminAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: 'john doe',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'My Hospital',
        logo: Hospital,
        plan: 'Enterprise',
      },
    ],
    navMain: [
      {
        title: 'Doctors',
        url: '#',
        icon: FaHospitalUser,
        isActive: true,
        items: [
          {
            title: 'Manage',
            url: `/admin/doctor`,
          },
          {
            title: 'Statements',
            url: `/admin/doctor/statements`,
          },
        ],
      },
      {
        title: 'Patients',
        url: '#',
        icon: IoPeople,
        isActive: true,
        items: [
          {
            title: 'All Patient',
            url: `/admin/all-patient`,
          },
        ],
      },
      {
        title: 'Pharmacy',
        url: '#',
        icon: FaClinicMedical,
        isActive: true,
        items: [
          {
            title: 'Add pharmacy',
            url: `/`,
          },
        ],
      },
      {
        title: 'Billing',
        url: '#',
        icon: FaFileInvoiceDollar,
        isActive: true,
        items: [
          {
            title: 'All Bill',
            url: `/admin/all-bill`,
          },
          {
            title: 'All Dues',
            url: `all-dues`,
          },
          {
            title: 'report',
            url: `billing-report`,
          },
        ],
      },
      {
        title: 'Accounts',
        url: '#',
        icon: FaWallet,
        isActive: true,
        items: [
          {
            title: 'Accounts',
            url: `all-accounts`,
          },
          {
            title: 'Daily Cash',
            url: `daily-cash`,
          },
          {
            title: 'Daily Expence',
            url: `expences`,
          },
          {
            title: 'Appoinemnts Cash',
            url: `appoinment-cash`,
          },
          {
            title: 'Daily Cash history',
            url: `daily-cash-history`,
          },
        ],
      },
      {
        title: 'Employee',
        url: '#',
        icon: FaUsers,
        isActive: true,
        items: [
          {
            title: 'All Employees',
            url: `all-employees`,
          },
        ],
      },
      {
        title: 'Admin',
        url: '#',
        icon: FaUserShield,
        isActive: true,
        items: [
          {
            title: 'Admin23',
            url: `all-referance`,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
