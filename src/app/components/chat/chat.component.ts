import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messageInput: string = '';
  userId: string ="";
  messageList: any[] = [];

  constructor(private chatService: ChatService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.chatService.joinRoom('room1');
    this.listenerMessages();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    }as ChatMessage
    this.chatService.sendMessage('room1', chatMessage);
    this.messageInput = '';

  }

  listenerMessages() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }))
    });
  }

}
