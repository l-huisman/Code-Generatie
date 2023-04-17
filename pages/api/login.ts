import { withSessionRoute } from "@/lib/withSession";
import axios from "axios";
import { API_URL } from "../../constants";

export default withSessionRoute(loginRoute);

async function loginRoute(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const customer = await axios.post(`${API_URL}/account/login`, {
        email: req.body.email,
        password: req.body.password,
      });

      req.session.user = customer.data.user;
      req.session.token = customer.data.token;
      await req.session.save();
      res.status(200).send("Logged in");
    } catch (e: any) {
      console.log(e);
      res.status(500).send(e?.response?.data?.msg);
    }
  }
}
