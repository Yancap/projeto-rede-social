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

  try {
    let chat = router.db.value()["chat"]
    if (chat.find( data => data.key === key )) {

      chat = chat.map( obj => {
        if(obj.key === key) {
          obj.chats[userChat.id] = userChat
        }
        return obj
      })


      router.db.set("chat", chat)
      .write(chat)
      return res.send();
    }
    const dataChat = {
      [userChat.id]: userChat
    }
    router.db.set("chat", [...chat, { key, chats: dataChat }])
    .write([...chat, { key, chats: dataChat }])
    return res.send();
  } catch(e) {
    return res.send();
  }

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
    router.db.write(currentUser)
  } else {
    currentUser = {
      user_tag: users_tags[0],
      chats: {
        [ users_tags[1] ]: { key }
      }
    }
    let chat_keys = router.db.value()["chat_keys"]
    router.db.set("chat_keys", [...chat_keys, currentUser]).write([...chat_keys, currentUser])
  }

  if(otherUser) {
    otherUser["chats"][users_tags[0]] = { key }
    router.db.write(otherUser)
  } else {
    otherUser = {
      user_tag: users_tags[1],
      chats: {
        [ users_tags[0] ]: { key }
      }
    }
    let chat_keys = router.db.value()["chat_keys"]
    router.db.set("chat_keys", [...chat_keys, otherUser]).write([...chat_keys, otherUser])
  }

  router.db.merge()
  return res.send();
});

server.put("/users/avatar", (req, res) => {
  const {user_tag, avatar} = req.body
  const currentUser = router.db.value()["users"].find( data => data.user_tag === user_tag )
  currentUser.avatar = avatar
  router.db.write(currentUser)
  return res.send(currentUser);
})

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
