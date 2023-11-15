const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "api.json"));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)
server.post("/chats", (req, res) => {
  const key = req.body["key"]
  const userChat = req.body["chat"]
  let chat = router.db.value()["chat"].find( data => data.key === key )

  chat.chats = {...chat.chats, [userChat["id"]]: userChat}
  router.db.write(userChat)
  return res.send();
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
