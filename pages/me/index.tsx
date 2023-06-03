import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";

export default function Me() {
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">Me</h1>
          <div className="h-0.5 w-16 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <h3 className="font-semibold text-xl text-primary font-barlow mb-4">
                My accounts
              </h3>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
