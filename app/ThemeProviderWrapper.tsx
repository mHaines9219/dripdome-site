//this Component is being used to wrap the entire application with the theme provider, ideally, we would use only the layout.tsx, but using theme provider in the layout requires 'use client' directive, and this would make using metadata in the layour impossible, so we use this component to wrap the entire application with the theme provider
// ThemeProviderWrapper.tsx
'use client';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react'; // Import ReactNode
import theme from './theme'; // Import your custom theme
import ClientLayout from './ClientLayout';

type ThemeProviderWrapperProps = {
  children: ReactNode; // Define children as ReactNode
};

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
