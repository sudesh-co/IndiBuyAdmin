import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NanaAlertService } from '../../../../Shared/nana-alert.service';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-add-edit-users',
  standalone: false,
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css'
})
export class AddEditUsersComponent implements OnInit {
  userForm!: FormGroup;
  title: string = 'Add User';

  constructor(
    private fb: FormBuilder,
    private alert: NanaAlertService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditUsersComponent>
  ) { }

  ngOnInit(): void {
    if (this.data?.user?.UserId) {
      this.buildForm(this.data);
      this.title= "Edit User"
    } else {
      this.buildForm(null);
    }
  }

  buildForm(data: any): void {
    const { Username, UserId, Role, ProfileImageUrl, Phone, LockedUntil, LastLoginAt, IsAdmin, IsActive, FullName, EmailConfirmed, Email, CreatedAt } = data?.user || {}
    this.userForm = this.fb.group({
      UserId: [UserId ?? 0],
      FullName: [FullName ?? null],
      Email: [Email ?? null],
      Phone: [Phone ?? null],
      IsAdmin: [IsAdmin ?? false],
      IsActive: [IsActive ?? true],
      Role: [Role ?? null],
      Username: [Username ?? null],
    });
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.alert.error('Please fill all required fields');
      return;
    }
    const formValue = this.userForm.value;

    this.userService.addUpdateUser(formValue).subscribe({
      next: (res) => {
        console.log(res)
        this.alert.success('User saved successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.alert.error(err?.message || 'Something went wrong');
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
