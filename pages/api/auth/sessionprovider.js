import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

module.exports = async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  res.send(JSON.stringify(session, null, 2));
  //if im connected to juicey's account, it should show this
  /*
    {
        "user": {
          "name": "Juicey",
          "email": "enzo.ignaes@gmail.com",
          "image": "https://lh3.googleusercontent.com/a/AGNmyxZUAImunLFikyXE6xQ8dnGNyvwLn3bHPRqf_5u2Wg=s96-c"
        },
        "expires": "2023-05-24T13:54:27.943Z"
    }*/
  // if im not connected to any accounts, it should show this
  /*null*/
};
