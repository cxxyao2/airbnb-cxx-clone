import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prisma';

export async function getSession()
{
  return await getServerSession({ authOptions });
}