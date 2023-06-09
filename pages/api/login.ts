import { withSessionRoute } from "@/lib/withSession";
import axios from "axios";
import { API_URL } from "../../constants";

export default withSessionRoute(loginRoute);

async function loginRoute(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const customer = await axios.post(`${API_URL}/login`, {
        username: req.body.username,
        password: req.body.password,
      });

      req.session.user = customer.data.user;
      req.session.token = customer.data.token;
      await req.session.save();
      res.status(200).send(customer?.data?.user);
    } catch (e: any) {
      res.status(500).send(e?.response?.data?.message);
    }
  }
}
