import { Injectable } from '@angular/core';
import { Action } from '../models/action.model';
import { UtilService } from './util.service';
import { ConfirmService } from './confirm.service';
import { SignalService } from './signal.service';
import { APIService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ActionHandlerService {
  constructor(
    private utilService: UtilService,
    private confirmService: ConfirmService,
    private signalService: SignalService,
    private apiService: APIService,
    private messageService: MessageService
  ) {}

  processAction(action: Action, data?: any) {
    if (!action.type) {
      console.error(
        'how did you call this process without action type you bitch',
        action
      );
      return;
    }
    if (action.id == 'edit-product') {
      return this.editProduct(data);
    }

    switch (action.type) {
      case 'goto':
        if (!this.checkLinks(action)) return;
        let url = [...action.link!];
        if (data) url = [...url, data.id];
        this.utilService.gotoLink(url);
        break;
      case 'go-back':
        this.utilService.goBack();
        break;
      case 'edit-form':
        if (!this.checkLinks(action)) return;
        if (!data.id) {
          console.log('error getting data id to edit form', action, data);
          return;
        }
        this.utilService.gotoLink([...action.link!, data.id]);
        break;
      case 'delete':
        this.confirmService.confirm({
          header: 'هل انت متاكد من رغبتك في الحذف؟',
          body: 'هل تريد الحذف؟',
          confirmCallback: () => {
            if (!action.url) {
              console.error(
                'How did you call delete action without a url my man',
                action
              );
              return;
            }
            this.apiService.deleteOne(data.id, action.url).subscribe({
              next: (_) => {
                this.notify(action);
                this.messageService.publishMessage({
                  message: `تم حذف العنصر بنجاح`,
                  type: 'success',
                  duration: 3000,
                });
              },
              error: (_) => {
                this.messageService.publishMessage({
                  message: `حدث خطأ ما`,
                  type: 'error',
                  duration: 3000,
                });
              },
            });
          },
        });
        break;
    }
  }

  editProduct(data?: any) {
    console.log(data);
    this.utilService.gotoLink([
      'suppliers-manager',
      'products',
      'product-form',
      data.supplierId,
      data.id,
    ]);
  }

  notify(action: Action) {
    if (action.signals && action.signals.length > 0) {
      action.signals.forEach((signal) => {
        this.signalService.publishSignal(signal);
      });
    }
  }

  checkLinks(action: Action) {
    if (!action.link || action.link.length == 0) {
      console.error(
        'my man you should add link when you have goto type',
        action
      );
      return false;
    }

    return true;
  }
}
