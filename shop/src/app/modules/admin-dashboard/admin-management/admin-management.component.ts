import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from '../../../services/admin.service';
import { Admin } from '../../../models/admin';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginator, MatSelectModule],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.scss',
})
export class AdminManagementComponent implements OnInit, AfterViewInit {
  admins: any[] = [];
  admin: Admin = {
    id: 0,
    firstName: '',
    secondName: '',
    email: '',
    role: '',
    locked: false,
  };
  displayedColumns: string[] = ['id', 'firstName', 'secondName', 'email', 'role', 'locked', 'actions'];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadAllAdmins();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changeStatus(userId: number, status: string) {
    this.adminService.updateStatus(userId, status).subscribe({
      next: () => {
        this.loadAllAdmins();
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Failed to update admin status.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error(err);
      },
    });
  }

  changeRole(userId: number, role: string) {
    this.adminService.updateRole(userId, role).subscribe({
      next: () => {
        this.loadAllAdmins();
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Failed to update admin role.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error(err);
      },
    });
  }

  loadAllAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (res) => {
        const payload = res.body?.data;
        this.dataSource.data = Array.isArray(payload) ? payload : payload?.admins ?? [];
      },
      error: (err) => {
        this.dataSource.data = [];
        const errorMessage = err?.error?.message || 'Failed to load admins.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3500,
          panelClass: ['snackbar-error'],
        });
        console.error(err);
      },
    });
  }

  getAdmin(userId: number) {
    this.adminService.getAdmin(userId).subscribe({
      next: (res) => {
        this.admin = res.body;
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Failed to load admin details.';
        this.snackbar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error(err);
      },
    });
  }
}
