import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const classes = {
  link: "mx-3.5 text-lg font-bold hover:bg-blue-300",
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="bg-gray-100">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="sticky bg-blue-200 top-0 shadow-lg" id="header">
      <nav className="">
        <Link href="/">
          <a className={classes.link}>Home</a>
        </Link>
        <a> | </a>
        <Link href="/about">
          <a className={classes.link}>About</a>
        </Link>
        <a> | </a>
        <Link href="/posts">
          <a className={classes.link}>Post</a>
        </Link>
        <a> | </a>
        <Link href="/timer">
          <a className={classes.link}>timer</a>
        </Link>
      </nav>
    </header>
    <div className="block md:flex md:flex-col md:justify-start lg:items-center">
      {children}
    </div>
    <footer></footer>
  </div>
);

export default Layout;
