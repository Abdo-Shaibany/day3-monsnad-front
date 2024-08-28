import { Component, ElementRef, HostListener } from '@angular/core';
import { UtilService } from '../../core/services/util.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  // TODO: get notification from notifications service
  // TODO: get user photo form user service

  profilePreviewShow = false;
  user?: User | null;

  constructor(private utilService: UtilService, private authService: AuthService, private eRef: ElementRef) {
    this.user = this.authService.getUser();
  }
  goHome() {
    this.utilService.gotoLink(['home']);
  }

  logout() {
    this.authService.removeToken();
    this.utilService.gotoLink(['auth', 'login']);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.profilePreviewShow) {
      this.profilePreviewShow = false;
    }
  }
}
