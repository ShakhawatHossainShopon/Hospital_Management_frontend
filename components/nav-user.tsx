'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/providers/AuthProvider';
import { Button } from '@/components/ui/button';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { logout, logoutLoading } = useAuth();
  return (
    <div className="px-6 mt-2">
      <Button
        onClick={() => {
          if (!logoutLoading) logout();
        }}
      >
        <LogOut />
        {logoutLoading ? 'Logging out...' : 'Log out'}
      </Button>
    </div>
  );
}
