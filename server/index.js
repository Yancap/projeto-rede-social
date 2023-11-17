const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "api.json"));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)
server.use(cors())
server.post("/chats", (req, res) => {
  const key = req.body["key"]
  const userChat = req.body["chat"]
  let chat = router.db.value()["chat"].find( data => data.key === key )

  chat.chats = {...chat.chats, [userChat["id"]]: userChat}
  router.db.write(userChat)
  return res.send();
});

server.post("/talk/users", (req, res) => {
  const keys = req.body["keys"]
  console.log(keys);
  console.log(router.db.value()["users"]);
  let users = router.db.value()["users"].filter( data => keys.includes(data.user_tag))
  return res.send(users);
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
