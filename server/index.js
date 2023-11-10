const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "api.json"));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser)
server.post("/chats", (req, res) => {
   const key = req.body["key"]
   const userChat = req.body["chat"]

   const chat = router.db.value()["chat"].find( data => data.key === key )
   chat.chats = {...chat.chats, [userChat["id"]]: userChat.chat}
   router.db.create({
      "chat1": chat
   })
   return res.send();
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
