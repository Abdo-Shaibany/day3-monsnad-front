import { Component, Input } from '@angular/core';
import { Bread } from 'src/app/core/models/bread.model';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input({ required: true }) breads!: Bread[];
  @Input({ required: true }) current!: string;

  onClick(item: { label: string; link: string[] }) {
    this.utilService.gotoLink(item.link);
  }

  constructor(private utilService: UtilService) {}
}
