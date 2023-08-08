import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OptimusNode',
  description: 'Run your nodes with OptimusNode',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
