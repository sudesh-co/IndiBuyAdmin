import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-dialog',
  template: `
  <button mat-button color="warn" (click)="dialogRef.close()">
    Close Image Priview
  </button>
    <div class="image-dialog">
      <img [src]="data.url" class="img-fluid" />
    </div>
  `,
  standalone:false,
  styles: [`
    .image-dialog {
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
    }
    .image-dialog img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  `]
})
export class ImagePreviewDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }, public dialogRef: MatDialogRef<ImagePreviewDialogComponent>) { }
}
