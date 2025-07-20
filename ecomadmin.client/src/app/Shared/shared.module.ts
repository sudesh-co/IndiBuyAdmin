import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomDatePickerComponent } from './custom-date-picker/custom-date-picker.component';
import { CustomCkeckComponent } from './custom-ckeck/custom-ckeck.component';
import { CustomGridComponent } from './custom-grid/custom-grid.component';
import { GridConfigFormComponent } from './custom-grid/grid-config-form/grid-config-form.component';
import { FieldConfigComponent } from './field-config/field-config.component';
import { FieldConfigFormComponent } from './field-config/field-config-form/field-config-form.component';
import { CustomTextAreaComponent } from './custom-text-area/custom-text-area.component';
import { CustomFileUploaderComponent } from './custom-file-uploader/custom-file-uploader.component';
import { ImagePreviewDialogComponent } from './custom-file-uploader/image-preview-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomDatePickerComponent,
    CustomCkeckComponent,
    CustomGridComponent,
    GridConfigFormComponent,
    FieldConfigComponent,
    FieldConfigFormComponent,
    CustomTextAreaComponent,
    CustomFileUploaderComponent,
    ImagePreviewDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ], exports: [CustomInputComponent, CustomSelectComponent, MaterialModule,
    CustomDatePickerComponent, CustomCkeckComponent, CustomGridComponent, ImagePreviewDialogComponent,CustomFileUploaderComponent, CustomTextAreaComponent]

})
export class SharedModule { }
