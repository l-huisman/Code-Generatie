import Head from "next/head";
import SideBar from "./sidebar";
import { useState } from "react";
import classNames from "classnames";

export const siteTitle = "ANWB";
export const url = "ANWB";

export default function DashboardLayout({
  children,
  title,
  header,
  desc,
  image,
}: any) {
  const seoTitle = `${title} - ${siteTitle}`;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={desc || ``} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          itemProp="image"
          content={image || "/og_image.png"}
        />
        <meta property="og:description" content={desc || ``} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Analytics */}
        {/*<script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-WBHCLWC8HZ`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-P3R8FZG89L');
            `,
          }}
        />*/}
      </Head>
      <main className="overflow-x-hidden relative w-screen max-w-full">
        <SideBar open={isOpen} setOpen={setIsOpen} />
        <div
          className={classNames(
            "relative max-w-full w-screen mt-[68px] md:mt-0 md:w-[calc(100%-15rem)] md:ml-60 flex flex-col min-h-screen h-full duration-200"
          )}
        >
          <div className="p-6 md:p-10 md:border-b md:shadow-lg">
            {typeof header == "string" || title ? (
              <h1 className="font-bold text-3xl">{header ? header : title}</h1>
            ) : (
              header
            )}
          </div>

          {children}
        </div>
        {isOpen && (
          <div
            className="bg-black/70 w-screen h-full z-20 absolute top-0 left-0"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </main>
    </>
  );
}
