import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";

export default function Login() {
  return (
    <>
      <Layout title="Login">
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-4 h-full flex items-center justify-center">
          <div className="max-w-lg w-full bg-primary rounded-lg p-6">
            <h3 className="text-white font-medium text-2xl font-poppins mb-4">
              Login
            </h3>
            <form className="flex flex-col gap-y-4">
              <Input
                type="text"
                name="Username"
                title="Username"
                labelClassName="text-white"
                placeholder="Username..."
              />
              <Input
                type="password"
                name="password"
                title="Password"
                labelClassName="text-white"
                className=""
                placeholder="Password..."
              />
              <Button
                variant="white"
                title="Login"
                className="w-full mt-6 font-poppins"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}