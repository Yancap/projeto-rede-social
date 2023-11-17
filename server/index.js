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
  let users = router.db.value()["users"].filter( data => keys.includes(data.user_tag))
  return res.send(users);
});

server.post("/chat_keys", (req, res) => {
  const key = req.body["key"]
  const users_tags = req.body["users_tags"]

  let currentUser = router.db.value()["chat_keys"].find( data => data.user_tag === users_tags[0] )
  let otherUser = router.db.value()["chat_keys"].find( data => data.user_tag === users_tags[1] )

  if(currentUser) {
    currentUser["chats"][users_tags[1]] = { key }
  } else {
    currentUser = {
      user_tag: users_tags[0],
      chats: {
        [ users_tags[1] ]: { key }
      }
    }
  }

  if(otherUser) {
    otherUser["chats"][users_tags[0]] = { key }
  } else {
    otherUser = {
      user_tag: users_tags[1],
      chats: {
        [ users_tags[0] ]: { key }
      }
    }
  }

  let chat_keys = router.db.value()["chat_keys"]
  console.log(otherUser);
  console.log(currentUser);

  router.db.write([currentUser, otherUser])
  return res.send();
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
