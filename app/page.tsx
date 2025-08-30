import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const cookieStore = await cookies(); // <-- await here
  const tokenFromCookie = cookieStore.get('accessToken');
  const AdminFromCookie = cookieStore.get('admin_id');
  const role = cookieStore.get('role');
  console.log(role);

  if (!tokenFromCookie) {
    redirect(`/login`);
  } else {
    if (role?.value === 'employee') {
      redirect(`/employee/${AdminFromCookie?.value}`);
    } else if (role?.value === 'admin') {
      redirect(`/admin`);
    } else if (role?.value === 'doctor') {
      redirect(`/doctor`);
    }
  }

  return null;
};

export default Page;
