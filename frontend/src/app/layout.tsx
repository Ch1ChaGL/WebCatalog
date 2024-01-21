'use client';
import './globals.css';
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store';
import HeaderComponent from '@/components/ui/Header/Header.component';
import FooterComponent from '@/components/ui/Footer/Footer.component';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

const quertClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      placeholderData: keepPreviousData,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang='en'>
      <body>
        <HeaderComponent />
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <QueryClientProvider client={quertClient}>
                <Provider store={store}>{children}</Provider>
              </QueryClientProvider>
            </div>
          </div>
        </div>
        <FooterComponent />
      </body>
    </html>
  );
}
