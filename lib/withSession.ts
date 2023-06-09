import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions: IronSessionOptions = {
  password:
    process.env.SESSION_PASSWORD ||
    "222222222222222222222222222222222222222222",
  cookieName: "mrbankycookie",
};

export function withSessionRoute(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler: any) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function withSessionSsrInitalProps(handler: any) {
  return withIronSessionSsr(handler, sessionOptions);
}
