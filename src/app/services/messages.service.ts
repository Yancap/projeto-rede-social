import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, map, take } from 'rxjs';
import {
  Chat,
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
  public url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  async getKeysChatsFromTalk(user_tag: string){
    return Object.keys((await axios.get<GetUsersKeyChatResponse[]>(
      'chat_keys?user_tag=' + user_tag
    )).data[0].chats)
  }

  async getUsersKeyChat(user_tag: string, chatUserTag: string) {
    return (
      await axios.get<GetUsersKeyChatResponse[]>(
        'chat_keys?user_tag=' + user_tag
      )
    ).data[0].chats[chatUserTag].key;
  }

  async getUsersFromTalk(keys: string[]){
    return (await axios.post<Users[]>("talk/users", {keys})).data
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

  sendMessages(data: {key: string, message: string, user_tag: string}) {
    const date = Date.now();

    this.http.post(this.url + 'chats', {
      key: data.key,
      chat: {
        id: date.toString(),
        message: data.message,
        created_at: date,
        user_tag: data.user_tag,
      },
    }).pipe(first()).subscribe();
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
