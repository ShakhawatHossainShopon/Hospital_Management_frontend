import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const cookieStore = await cookies(); // <-- await here
  const tokenFromCookie = cookieStore.get('accessToken');
  const AdminFromCookie = cookieStore.get('admin_id');
  const role = cookieStore.get('role');

  if (!tokenFromCookie) {
    redirect(`/login`);
  } else {
    if (role?.value === 'employee') {
      redirect(`/employee/${AdminFromCookie?.value}`);
    } else if (role?.value === 'admin') {
      redirect(`/admin`);
    }
  }

  return null;
};

export default Page;
