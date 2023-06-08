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
import useAuth from "hooks/useAuth";

export default function Signup() {
  const { signupState, signup, setSignupState } = useAuth();
  return (
    <>
      <Layout title="Login">
        <div className="min-h-screen max-w-screen-2xl mx-auto py-20 mt-20 px-4 h-full flex items-center justify-center">
          <div className="max-w-lg w-full bg-primary rounded-lg p-6">
            <h3 className="text-white font-medium text-2xl font-poppins mb-8">
              Signup
            </h3>
            <form className="flex flex-col gap-y-4">
              <Input
                type="text"
                name="Username"
                title="Username"
                labelClassName="!text-white"
                placeholder="Username..."
                value={signupState.username}
                onChange={(e) =>
                  setSignupState({ ...signupState, username: e?.target?.value })
                }
              />
              <Input
                type="text"
                name="first_name"
                title="First name"
                labelClassName="!text-white"
                placeholder="First name..."
                value={signupState.first_name}
                onChange={(e) =>
                  setSignupState({
                    ...signupState,
                    first_name: e?.target?.value,
                  })
                }
              />
              <Input
                type="text"
                name="last_name"
                title="Last name"
                labelClassName="!text-white"
                placeholder="Last name..."
                value={signupState.last_name}
                onChange={(e) =>
                  setSignupState({
                    ...signupState,
                    last_name: e?.target?.value,
                  })
                }
              />
              <Input
                type="email"
                name="email"
                title="Email"
                labelClassName="!text-white"
                placeholder="Email..."
                value={signupState.email}
                onChange={(e) =>
                  setSignupState({ ...signupState, email: e?.target?.value })
                }
              />
              <Input
                type="password"
                name="password"
                title="Password"
                labelClassName="!text-white"
                className=""
                placeholder="Password..."
                value={signupState.password}
                onChange={(e) =>
                  setSignupState({ ...signupState, password: e?.target?.value })
                }
              />
              <Input
                type="password"
                name="confirmPassword"
                title="Confirm password"
                labelClassName="!text-white"
                className=""
                placeholder="Confirm password..."
                value={signupState.password}
                onChange={(e) =>
                  setSignupState({ ...signupState, password: e?.target?.value })
                }
              />
              <Button
                variant="white"
                title="Signup"
                className="w-full mt-6 font-poppins"
                onClick={() => signup()}
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
