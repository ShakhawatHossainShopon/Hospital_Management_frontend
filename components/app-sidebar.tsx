'use client';

import * as React from 'react';
import { Hospital } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import {
  FaCodeBranch,
  FaHospitalUser,
  FaNotesMedical,
  FaUsers,
  FaUserShield,
  FaWallet,
} from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { FaServicestack, FaFileInvoiceDollar, FaClinicMedical } from 'react-icons/fa';
import { FaList, FaPills } from 'react-icons/fa';
import { FaUserTie, FaShareAlt } from 'react-icons/fa';
import { MdScience } from 'react-icons/md';
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: usernname } = useQuery({
    queryKey: ['getUser-name-34'],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctorName();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });

  const navArray = [];
  navArray.push(
    {
      title: 'Book New',
      url: `/${usernname?.data?.user_id}/book-new`,
    },
    {
      title: 'Manage',
      url: `/${usernname?.data?.user_id}/appoinments`,
    },
    {
      title: 'Follow Ups',
      url: `/${usernname?.data?.user_id}/follow-ups`,
    }
  );
  usernname?.data?.doctors?.map((user: { name: string; id: number }) => {
    navArray.push({
      title: `${user?.name}`,
      url: `/${usernname?.data?.user_id}/doctor/${user?.id}`,
      icon: FaUserTie,
    });
  });

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
            url: `/${usernname?.data?.user_id}/doctor`,
          },
          {
            title: 'Statements',
            url: `/${usernname?.data?.user_id}/doctor/statements`,
          },
        ],
      },
      {
        title: 'Appoinments',
        url: '#',
        icon: FaList,
        isActive: true,
        items: navArray,
      },
      {
        title: 'Patients',
        url: '#',
        icon: IoPeople,
        isActive: true,
        items: [
          {
            title: 'All Patient',
            url: `/${usernname?.data?.user_id}/all-patient`,
          },
        ],
      },
      {
        title: 'All Services',
        url: '#',
        icon: FaServicestack,
        isActive: true,
        items: [
          {
            title: 'All Services',
            url: `/${usernname?.data?.user_id}/all-services`,
          },
        ],
      },
      {
        title: 'Diagnostic Test',
        url: '#',
        icon: MdScience,
        isActive: true,
        items: [
          {
            title: 'All Diagnostic test',
            url: `/${usernname?.data?.user_id}/all-test`,
          },
        ],
      },
      {
        title: 'Medicine',
        url: '#',
        icon: FaPills,
        isActive: true,
        items: [
          {
            title: 'Add Medicine',
            url: `/${usernname?.data?.user_id}/add-medicine`,
          },
          {
            title: 'All Medicine',
            url: `/${usernname?.data?.user_id}/all-medicine`,
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
        title: 'Prescription',
        url: '#',
        icon: FaNotesMedical,
        isActive: true,
        items: [
          {
            title: 'All Prescription',
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
            title: 'Create Bill',
            url: `/${usernname?.data?.user_id}/billing`,
          },
          {
            title: 'All Bill',
            url: `/${usernname?.data?.user_id}/all-bill`,
          },
          {
            title: 'All Dues',
            url: `/${usernname?.data?.user_id}/all-dues`,
          },
          {
            title: 'report',
            url: `/${usernname?.data?.user_id}/billing-report`,
          },
        ],
      },
      {
        title: 'Referance',
        url: '#',
        icon: FaShareAlt,
        isActive: true,
        items: [
          {
            title: 'All Referance',
            url: `/${usernname?.data?.user_id}/all-references`,
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
            title: 'All Accounts',
            url: `/${usernname?.data?.user_id}/all-referance`,
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
            url: `/${usernname?.data?.user_id}/all-employees`,
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
            title: 'Admin',
            url: `/${usernname?.data?.user_id}/all-referance`,
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
