import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  gotoLink(link: string[]) {
    // I want to understand this code for real, why not just route to link - what the hell is outlet :)
    const currentOutlet = this.route.parent?.parent?.outlet ?? 'primary';

    this.router.navigate([{ outlets: { [currentOutlet]: link } }], {
      relativeTo: null,
    });
  }

  goBack() {
    this.location.back();
    // this.router.navigate(['../'], { relativeTo: this.route });
  }

  getImageUrl(image?: string) {
    // TODO: get defualt value of image not exist :)
    if (!image) {
      return 'assets/images/avatar-border.svg';
    }
    return `http://localhost:5000/${image}`;
  }

  async getImageDetails(imageUrl: string) {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });

      if (response.ok) {
        const fileName = this.getFileNameFromUrl(imageUrl);
        const fileSize = parseInt(
          response.headers.get('Content-Length') || '0',
          10
        );
        const fileType = response.headers.get('Content-Type') || '';

        return {
          name: fileName,
          size: fileSize,
          type: fileType,
        };
      } else {
        throw new Error(
          `Failed to fetch image details: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Error getting image details:', error);
      throw new Error('حصل خطأ عند محاولة الوصول الى معلومات الصورة');
    }
  }

  getFileNameFromUrl(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  atLeastOne =
    (validator: ValidatorFn) =>
    (group: FormGroup): ValidationErrors | null => {
      const hasAtLeastOne =
        group &&
        group.controls &&
        Object.keys(group.controls).some((k) => !validator(group.controls[k]));

      return hasAtLeastOne ? null : { atLeastOne: true };
    };
}
