import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImagePreviewDialogComponent } from './image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NanaAlertService } from '../nana-alert.service';

@Component({
  selector: 'app-custom-file-uploader',
  standalone: false,
  templateUrl: './custom-file-uploader.component.html',
  styleUrl: './custom-file-uploader.component.css'
})
export class CustomFileUploaderComponent {
  constructor(private dialog: MatDialog, private alertservice: NanaAlertService) { }

   @Input() formGroup!: FormGroup;
  @Input() field: string = 'file';
  @Input() multiple: boolean = false; 
  @Input() Caption: string = 'Upload File';
  @Input() disabled: boolean = false;
  @Input() IsReq: boolean = false;
  @Output() fileChange = new EventEmitter<File | File[]>();
  @Output() deleteFile = new EventEmitter();
  @Input() initialUrls: any[] = [];

  filePreviews: { file: File; previewUrl: string }[] = [];

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (files.some(file => file.size > maxSize)) {
      this.alertservice.error("One or more files exceed the 5MB limit.");
      return;
    }

    this.filePreviews = this.multiple
      ? files.map(file => ({
        file,
        previewUrl: file.type.startsWith('image') ? URL.createObjectURL(file) : ''
      }))
      : [{
        file: files[0],
        previewUrl: files[0].type.startsWith('image') ? URL.createObjectURL(files[0]) : ''
      }];

    const control = this.formGroup.get(this.field);
    const fileObjects = this.filePreviews.map(f => f.file);
    control?.setValue(this.multiple ? fileObjects : fileObjects[0]);
    this.fileChange.emit(this.multiple ? fileObjects : fileObjects[0]);
  }


  removeFile(index: number): void {
    const url = this.filePreviews[index]?.previewUrl;
    if (url) URL.revokeObjectURL(url);
    this.filePreviews.splice(index, 1);
    const control = this.formGroup.get(this.field);
    const fileObjects = this.filePreviews.map(f => f.file);
    control?.setValue(this.multiple ? fileObjects : fileObjects[0] ?? null);
    this.fileChange.emit(this.multiple ? fileObjects : fileObjects[0] ?? null);
    this.deleteFile.emit(url)
    this.alertservice.info("File/Image was removed")

  }
  previewImage(url: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { url },
      panelClass: 'image-preview-dialog',
    });
  }
  removeInitialImage(index: number): void {
    if (index >= 0 && index < this.initialUrls.length) {
      const removedUrl = this.initialUrls[index];
      this.initialUrls.splice(index, 1);
      this.deleteFile.emit(removedUrl);
      this.alertservice.info("Initial image was removed");
    }
  }

  extractFileName(url: string): string {
    return url.split('/').pop() || '';
  }

}
