import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import React, { MutableRefObject, useEffect } from "react";
import classNames from "classnames";

export default function Section({
  children,
  className,
  id,
}: {
  children: any;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={classNames(
        className,
        "px-4 md:px-6 lg:px-8 relative min-h-screen flex items-center justify-left text-white lg:max-w-3xl xl:max-w-4xl mx-auto"
      )}
    >
      {children}
    </div>
  );
}
