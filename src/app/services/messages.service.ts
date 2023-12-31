import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, first, map, take } from 'rxjs';
import {
  Chat,
  CreateNewChat,
  DataChatFormate,
  GetUsersKeyChatResponse,
  UserChat,
  Users,
} from './messages.d';
import { axios } from '../../config/axios';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public url = process.env['URL_SERVER_JSON'];

  constructor(private http: HttpClient) {}

  async getKeysChatsFromTalk(user_tag: string) {
    const data = ( await axios.get<GetUsersKeyChatResponse[]>(
      'chat_keys?user_tag=' + user_tag
    )
    ).data
    if (data[0] && "chats" in data[0]) {
      const keys = Object.keys(data);
      return keys
    }
    return []
  }

  async getUsersKeyChat(user_tag: string, chatUserTag: string) {
    try {
      const dataChat = (
        await axios.get<GetUsersKeyChatResponse[]>(
          'chat_keys?user_tag=' + user_tag
        )
      ).data[0].chats[chatUserTag].key;
      return dataChat;
    } catch (error) {
      return null;
    }
  }

  async getUsersForTalk(user_tag: string) {
    return (await axios.get<Users[]>('users?user_tag_ne=' + user_tag)).data;
  }

  getUserChatUsingTheKey(key: string) {
    return this.http
      .get<UserChat[]>(this.url + 'chat?key=' + key)
      .pipe(
        map((response) =>
          this.paginationMessagesInDatas(this.organizeChat(response[0].chats))
        )
      );
  }

  async createNewChat(data: CreateNewChat) {
    return await axios.post<CreateNewChat>('chat_keys', data);
  }

  createNewChatAndSendMessager(
    dataChat: CreateNewChat,
    dataMessage: { message: string; user_tag: string }
  ) {

    const createNewChat = this.http
      .post(this.url + 'chat_keys', dataChat)
      .pipe(
        concatMap((p) =>{
          return this.sendMessages({ ...dataMessage, key: dataChat.key })
        }),
        concatMap((p) => {
          return this.getUserChatUsingTheKey(dataChat.key)
        }
      )
      );

    return createNewChat;
  }
  sendMessages(data: { key: string; message: string; user_tag: string }) {
    const date = Date.now();

    return this.http
      .post(this.url + 'chats', {
        key: data.key,
        chat: {
          id: date.toString(),
          message: data.message,
          created_at: date,
          user_tag: data.user_tag,
        },
      })
      .pipe(first());
  }

  private organizeChat(chat: { [key: string]: Chat }) {
    const keysSorted = Object.keys(chat).sort();
    return keysSorted.map((key) => chat[key]);
  }

  private paginationMessagesInDatas(data: Chat[]) {
    const date = new Date();
    //date.setDate(date.getDate() + 0)
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let currentDay = date.getDate();

    const newData: DataChatFormate[] = [];

    let aux = 0;

    for (let i = 0; i < data.length; i++) {
      const messageDate = new Date(Number(data[i].created_at));
      let messageMonth = messageDate.getMonth();
      let messageYear = messageDate.getFullYear();
      let messageDay = messageDate.getDate();

      const lastIndex = i - 1 < 0 ? 0 : i - 1;
      const lastMessageDate = new Date(Number(data[lastIndex].created_at));

      if (
        lastMessageDate.getDate() !== messageDate.getDate() ||
        lastMessageDate.getMonth() !== messageDate.getMonth()
      ) {
        aux++;
      }

      if (
        currentMonth === messageMonth &&
        currentYear === messageYear &&
        currentDay === messageDay
      ) {
        if (!newData[aux]) {
          newData[aux] = { date: 'Hoje', messages: [] };
        }
        newData[aux].messages.push(data[i]);
      } else if (
        currentMonth === messageMonth &&
        currentYear === messageYear &&
        currentDay - messageDay === 1
      ) {
        if (!newData[aux]) {
          newData[aux] = { date: 'Ontem', messages: [] };
        }
        newData[aux].messages.push(data[i]);
      } else if (currentYear === messageYear) {
        if (!newData[aux] || newData.length === 0) {
          newData.push({
            date: messageDate.toLocaleString([], {
              month: 'long',
              day: 'numeric',
            }),
            messages: [],
          });
        }

        newData[aux].messages.push(data[i]);
      }
    }

    return newData;
  }
}
