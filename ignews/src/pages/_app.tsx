import { AppProps } from 'next/app';
import { Header } from '../componensts/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <Header />
    <Component {...pageProps} />
    
    </>
  )
  
}

export default MyApp
