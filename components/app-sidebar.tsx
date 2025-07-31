'use client';

import * as React from 'react';
import { Frame, Map, PieChart, Hospital } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { FaHospitalUser } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: usernname, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctorName();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });
  const userIdFromCookie = Cookies.get('userid');
  const navArray = [];
  navArray.push(
    {
      title: 'Manage',
      url: `/${userIdFromCookie}/doctor`,
    },
    {
      title: 'statements',
      url: `/${userIdFromCookie}/doctor/statements`,
    }
  );
  usernname?.data?.doctors?.map((user: { name: string; id: number }) => {
    navArray.push({
      title: `${user?.name}`,
      url: `/${userIdFromCookie}/doctor/${user?.id}`,
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
            url: `/${userIdFromCookie}/add-patient`,
          },
          {
            title: 'All Patient',
            url: `/${userIdFromCookie}/all-patient`,
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
