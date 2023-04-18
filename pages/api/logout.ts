import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(logoutRoute);

function logoutRoute(req: any, res: any) {
  req.session.destroy();
  res.send({ ok: true });
}
