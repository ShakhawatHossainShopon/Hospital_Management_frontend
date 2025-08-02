'use client';

import * as React from 'react';
import { Hospital } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { FaHospitalUser } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { FaUserMd } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: usernname, isLoading } = useQuery({
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
      title: 'Manage',
      url: `/${usernname?.data?.doctorId}/appoinments`,
    },
    {
      title: 'Statements',
      url: `/${usernname?.data?.doctorId}/appoinments`,
    }
  );
  usernname?.data?.doctors?.map((user: { name: string; id: number }) => {
    navArray.push({
      title: `${user?.name}`,
      url: `/${usernname?.data?.doctorId}/doctor/${user?.id}`,
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
            url: `/${usernname?.data?.doctorId}/doctor`,
          },
          {
            title: 'Statements',
            url: `/${usernname?.data?.doctorId}/doctor/statements`,
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
            title: 'Add Patient',
            url: `/${usernname?.data?.doctorId}/add-patient`,
          },
          {
            title: 'All Patient',
            url: `/${usernname?.data?.doctorId}/all-patient`,
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
