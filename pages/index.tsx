import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">
            Total balance: <span className="text-primary">€420.69</span>
          </h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 md:col-span-6 shadow-md p-6 h-full">
              <h3 className="font-semibold text-xl text-primary font-barlow mb-4">
                My accounts
              </h3>
              <div className="flex flex-col gap-y-3">
                <div className="border border-primary p-4 flex justify-between">
                  <h5 className="font-medium font-poppins">Betaalrekening 1</h5>
                  <p className="font-poppins">Current balance: €200.00</p>
                </div>
                <div className="border border-primary p-4 flex justify-between">
                  <h5 className="font-medium font-poppins">Spaarrekening 1</h5>
                  <p className="font-poppins">Current balance: €220.69</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 shadow-md p-6">
              <h3 className="font-semibold text-xl text-primary font-barlow mb-4">
                Recent transactions
              </h3>
              <div className="flex flex-col gap-y-3">
                <div className="border border-primary p-4 flex justify-between">
                  <h5 className="font-medium font-poppins">Albert heijn</h5>
                  <p className="font-poppins">- €200.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
