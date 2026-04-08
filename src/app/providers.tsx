'use client';

import { SessionProvider } from 'next-auth/react'; // v5 compatible

type Props = {
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => <SessionProvider>{children}</SessionProvider>;

export default Providers;
