import { withSessionRoute } from "@/lib/withSession";
import axios from "axios";
import { API_URL } from "../../constants";

export default withSessionRoute(meRoute);

async function meRoute(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const ApiConfig = {
        validateStatus: function (status: number) {
          return status == 200 || status == 302;
        },
        headers: {
          Authorization: `Bearer ${req?.session?.token}`,
        },
      };

      const user = await axios.get(`${API_URL}/users/me`, ApiConfig);

      res.status(200).send(user?.data?.data);
    } catch (e: any) {
      res.status(500).send(e?.response?.data?.message);
    }
  }
}
