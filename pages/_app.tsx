import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { Barlow, Poppins } from "@next/font/google";
import toast, { Toaster } from "react-hot-toast";
import { UserProvider } from "@/components/context/UserContext";
import { headers } from "next/headers";
import { get } from "http";
import { withSessionSsr } from "@/lib/withSession";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";

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

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <UserProvider>
      <main className={`${barlow.variable} ${poppins.variable}`}>
        <Toaster />
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
