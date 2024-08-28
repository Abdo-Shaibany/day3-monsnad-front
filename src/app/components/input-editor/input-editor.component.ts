import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { config } from './editor.config';
import { ClassicEditor, EditorConfig } from 'ckeditor5';

@Component({
  selector: 'app-input-editor',
  templateUrl: './input-editor.component.html',
})
export class InputEditorComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) key!: string;
  @Input({ required: false }) showOptional = false;
  @Input({ required: true }) isSubmitted!: boolean;

  constructor(private changeDetector: ChangeDetectorRef) { }

  public isLayoutReady = false;
  public Editor = ClassicEditor;

  public config: EditorConfig = {

  };

  public ngAfterViewInit(): void {
    this.config = config;

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
}
