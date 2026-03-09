import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private usersService: UsersService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        if (res.status === 201 || res.status === 200) {
          const payload = res.body?.data;
          this.users = Array.isArray(payload) ? payload : payload?.users ?? [];
          return;
        }

        this.users = [];
        this.snackbar.open('Failed to load users.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
      error: (error) => {
        this.users = [];
        const errorMessage = error?.error?.message || 'Failed to load users.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error(error);
      },
    });
  }

  accessUser(userId: string): void {
    this.usersService.getUser(userId).subscribe({
      next: (res) => {
        if (res.status === 201 || res.status === 200) {
          this.selectedUser = res.body?.data;
        } else {
          const errorMessage = res.body?.message || 'Failed to load user.';
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Failed to load user.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error(error);
      },
    });
  }
}
