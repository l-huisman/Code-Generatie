import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import Nav from "./nav";

export const siteTitle = "Mr. Banky";
export const siteUrl = "mrbanky.nl";

export default function Layout({ children, title, desc, image }: any) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={desc || ``} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
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
      </Head>
      <main className="overflow-hidden relative min-h-[100vh] z-0 !bg-fixed !bg-cover">
        <div className="absolute h-full w-full bg-gray-100 z-1"></div>
        <header>
          <Nav />
        </header>
        <div className="relative">{children}</div>
        <Footer />
      </main>
    </>
  );
}
