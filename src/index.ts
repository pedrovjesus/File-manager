import { server } from "./server/Server";
import "dotenv/config";

const startServer = () => {
  server.listen(process.env.PORT, () => {
    console.log("rodando em http://localhost:3000");
  });
};

startServer();
