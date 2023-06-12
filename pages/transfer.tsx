import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Input from "@/components/input";
import useTransaction from "hooks/useTransaction";
import { withSessionSsr } from "@/lib/withSession";
import Button from "@/components/button";
import useAccounts from "hooks/useAccounts";

export default function Transfer({ ApiConfig }: any) {
  const { state, addTransaction, setState } = useTransaction(
    "create",
    ApiConfig
  );

  const { account, accountSelectList, loading } = useAccounts(
    "user",
    ApiConfig,
    undefined,
    3,
    state?.fromAccount?.meta?.iban
  );

  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl mx-auto py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">Transfer</h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 shadow-md p-6 h-full gap-12">
              <form className="flex flex-col gap-y-4">
                <Input
                  type="select"
                  options={accountSelectList}
                  name="account"
                  title="Account"
                  selectValue={state?.fromAccount}
                  onChange={(e) => setState({ ...state, fromAccount: e })}
                />
                <Input
                  type="text"
                  name="toIban"
                  title="To IBAN"
                  placeholder="To IBAN..."
                  value={state?.toAccountIban}
                  onChange={(e) =>
                    setState({ ...state, toAccountIban: e.target.value })
                  }
                />
                <Input
                  type="number"
                  name="amount"
                  title="Amount"
                  placeholder="Amount..."
                  value={state?.amount}
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                />
                <Input
                  type="text"
                  name="label"
                  title="Label"
                  placeholder="Label..."
                  value={state?.label}
                  onChange={(e) =>
                    setState({ ...state, label: e.target.value })
                  }
                />
                <Input
                  type="textarea"
                  name="description"
                  title="Description"
                  placeholder="Description..."
                  rows={4}
                  value={state?.description}
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                />
                <Button
                  title="Transfer"
                  variant="primary"
                  className="w-full"
                  onClick={() => addTransaction("TRANSFER")}
                />
              </form>
              <div className="">
                <h3 className="font-bold text-lg font-poppins">
                  Selected account
                </h3>
                <div className="h-0.5 w-24 bg-primary mt-2 mb-8" />
                {state?.fromAccount && (
                  <>
                    <p className="font-medium text-base">IBAN</p>
                    <p className="text-sm">{state?.fromAccount?.meta?.iban}</p>
                    <p className="font-medium text-base">Balance</p>
                    <p className="text-sm">
                      €{state?.fromAccount?.meta?.balance}
                    </p>
                    <p className="font-medium text-base">Daily limit left</p>
                    <p className="text-sm">
                      €{account?.accountLimitsLeft?.dailyLimitLeft}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx: any) {
    const { req, params } = ctx;

    const user = req.session.user;
    const token = req.session.token;

    const ApiConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return {
      props: {
        ApiConfig: ApiConfig,
      },
    };
  }
);
