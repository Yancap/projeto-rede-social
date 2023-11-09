export interface GetUsersKeyChatResponse {
  user_tag: string,
  chats: KeysChat
}

interface KeysChat {
  [key: string]: {
    key: string
  }
}

export interface UserChat {
  chats: {
    [key: string]: Chat
  }
}

interface Chat {
  
  message: string,
  date: string,
  created_at: string,
  user_tag: string
  
}

export interface DataChatFormate {
  date: string;
  messages: Chat[]
}