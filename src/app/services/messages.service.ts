import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Chat, DataChatFormate, GetUsersKeyChatResponse, UserChat } from './messages.d';
import { axios } from '../../config/axios';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  async getUsersKeyChat(user_tag: string, chatUserTag: string){
    return (await axios.get<GetUsersKeyChatResponse[]>("chat_keys?user_tag=" + user_tag)).data
  }
  async getUserChatUsingTheKey(user_tag: string, chatUserTag: string){
    const key = (await this.getUsersKeyChat(user_tag, chatUserTag))[0].chats[chatUserTag].key
    const chat = await axios<UserChat[]>("chat?key=" + key)
    return this.paginationMessagesInDatas(this.organizeChat(chat.data[0].chats))
  }

  private organizeChat(chat: {[key: string]:Chat}){
    const keysSorted = Object.keys(chat).sort()
    return keysSorted.map(key => chat[key])
  }

  private paginationMessagesInDatas(data: Chat[]){
    const date = new Date()
    //date.setDate(date.getDate() + 0)
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let currentDay = date.getDate()

    const newData: DataChatFormate[] = []

    let aux = 0

    for(let i = 0; i < data.length; i++) {

        
        const messageDate = new Date(data[i].date)
        let messageMonth = messageDate.getMonth()
        let messageYear = messageDate.getFullYear()
        let messageDay = messageDate.getDate()

        const lastIndex = i - 1 < 0 ? 0 : i - 1
        const lastMessageDate = new Date(data[lastIndex].date)
        
        if(lastMessageDate.getDate() !== messageDate.getDate() || lastMessageDate.getMonth() !== messageDate.getMonth()){
            aux++
        }

        if(currentMonth === messageMonth && currentYear === messageYear && currentDay === messageDay){
            if(!newData[aux]){
                newData[aux] = { date:"Hoje", messages: [] }
            }
            newData[aux].messages.push(data[i])
        } else if(currentMonth === messageMonth && currentYear === messageYear && currentDay - messageDay === 1){

            

            if(!newData[aux]){
                newData[aux] = { date:"Ontem", messages: [] }
            }
            newData[aux].messages.push(data[i])
            
            
        } else if(currentYear === messageYear ){

            if(!newData[aux] || newData.length === 0){
                newData.push({ date: messageDate.toLocaleString([], {  month: 'long', day: 'numeric' }), messages: [] })
            }

            newData[aux].messages.push(data[i])
        }

    }


    return newData
  }
}
