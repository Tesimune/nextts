import Link from 'next/link';
import AuthCard from '@/app/(auth)/AuthCard';
import AuthLogo from '@/components/AuthLogo';

export const metadata = {
  title: 'Authentication',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <section className='grid items-center justify-center p-7 overflow-auto'>
        <AuthCard
          logo={
            <Link href="/">
              <AuthLogo />
            </Link>
          }
        >
          {children}
        </AuthCard>
      </section>
    </div>
  );
}

export default Layout;
