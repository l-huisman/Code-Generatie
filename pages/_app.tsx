import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Barlow, JetBrains_Mono } from "@next/font/google";
import toast, { Toaster } from "react-hot-toast";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${barlow.variable} ${jetBrains_Mono.variable}`}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
}
