'use client';
import * as React from 'react';
import { Hospital } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { FaHospitalUser, FaUsers, FaWallet } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
export function DoctorAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        title: 'Dashbaord',
        url: '#',
        icon: FaHome,
        isActive: true,
        items: [
          {
            title: 'Dashbaord',
            url: `/doctor`,
          },
        ],
      },
      {
        title: 'Statements',
        url: '#',
        icon: FaHospitalUser,
        isActive: true,
        items: [
          {
            title: 'Statements',
            url: `/doctor/all-statements`,
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
            title: 'Appoinemnts Cash',
            url: `/doctor/appoinment-cash`,
          },
        ],
      },
      {
        title: 'Prescription',
        url: '#',
        icon: FaUsers,
        isActive: true,
        items: [
          {
            title: 'All Prescription',
            url: `/doctor/all-prescription`,
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
