import { Component } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
})
export class NoPageComponent {
  constructor(private utilService: UtilService) { }
  goHome() {
    this.utilService.gotoLink(['home']);
  }
}
