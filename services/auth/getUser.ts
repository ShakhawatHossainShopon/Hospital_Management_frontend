/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';

export async function apiGetUserToken() {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value || null;
}




