import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Barlow, Poppins } from "@next/font/google";
import toast, { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/context/UserContext";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider ApiConfig={pageProps?.ApiConfig}>
      <main className={`${barlow.variable} ${poppins.variable}`}>
        <Toaster />
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
