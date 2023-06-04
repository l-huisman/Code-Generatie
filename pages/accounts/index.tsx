import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Accounts() {
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">My accounts</h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <div className="flex flex-col gap-y-3">
                <Link
                  href="/accounts/1"
                  className="cursor-pointer border border-primary p-4 flex justify-between hover:bg-primary hover:text-white"
                >
                  <h5 className="font-medium font-poppins">Betaalrekening 1</h5>
                  <p className="font-poppins">Current balance: €200.00</p>
                </Link>
                <div className="cursor-pointer border border-primary p-4 flex justify-between hover:bg-primary hover:text-white">
                  <h5 className="font-medium font-poppins">Spaarrekening 1</h5>
                  <p className="font-poppins">Current balance: €220.69</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
