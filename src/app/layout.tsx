import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import RootWrapper from '@/components/RootWrapper';
import CustomThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'AXOM',
  description: 'Creative developer crafting innovative digital experiences with modern technologies and AI integration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${montserrat.variable} bg-black text-gray-200 min-h-screen`}>
        <CustomThemeProvider>
          <RootWrapper className="overflow-x-hidden">
            {children}
          </RootWrapper>
        </CustomThemeProvider>
      </body>
    </html>
  );
} 