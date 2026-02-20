import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



import { UsersService} from '../../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;
  isLoading = false;

  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    private snackbar: MatSnackBar,
  
  
  ){}

  ngOnInit(): void {
    
      this.loadAllUsers();
    
  }
  loadAllUsers(): void{
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next:(res) => {
        this.isLoading = false;
        if (res.status === 201 || res.status === 200){
          this.users = res.body?.data;
          this.isLoading = false;

        }
      },
      error:(error) => {
        this.isLoading = false
        console.error(error)
      }
    })
  }

  accessUser( userId: string): void{
    this.usersService.getUser(userId).subscribe({
      next: (res) => {
        if(res.status === 201 || res.status === 200){
          this.selectedUser = res.body.data
        } else {
          const errorMessage = res.body?.message || 'Failed to load User.';
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
            });
        }
      },
     error: (error) => {
      this.isLoading = false
      console.error(error)
     }
      
    });
  }

}
