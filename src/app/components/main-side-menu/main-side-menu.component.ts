import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuGroupItem } from 'src/app/core/models/side-menu.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-main-side-menu',
  templateUrl: './main-side-menu.component.html',
})
export class MainSideMenuComponent implements OnDestroy {
  adminMenu: MenuGroupItem[] = [
    {
      title: 'الإدارة',
      icon: 'assets/images/earth.svg',
      link: 'admin',
      subLink: 'users',
      subMenu: [
        {
          title: 'المستخدمين',
          link: 'users',
        },
        {
          title: 'الانشطة',
          link: 'activities',
        },
      ],
    },
  ];

  userMenu: MenuGroupItem[] = [
    {
      title: 'المستخدم',
      icon: 'assets/images/seller.svg',
      link: 'admin',
      subLink: 'profile',
      subMenu: [
        {
          title: 'البروفايل',
          link: 'profile',
        },
      ],
    },
  ];

  menu: MenuGroupItem[] = [];

  destroy$: Subject<void> = new Subject();

  currentModuleURL: string = '';
  currentGroupURL: string = '';

  constructor(private router: Router, private utilService: UtilService, private authService: AuthService) { }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event.routerEvent instanceof NavigationEnd) {
          const urls = event.routerEvent.url
            .split('/')
            .filter((el: string) => el !== '');
          this.currentGroupURL = urls[1];
          this.currentModuleURL = urls[2];
        }
      });

    if (this.authService.getUser()?.role!.name === 'admin') {
      this.menu = this.adminMenu;
    } else {
      this.menu = this.userMenu;
    }
  }

  getSubItems() {
    return (
      this.adminMenu.find((el) => el.link === this.currentGroupURL)?.subMenu ?? []
    );
  }

  canShowSubItems() {
    const res = this.getSubItems().length != 0;
    return res;
  }

  goToLink(link: string[]) {
    link = link.filter((el) => !!el);

    this.utilService.gotoLink(['home', ...link]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
