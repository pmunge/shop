import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.scss'
})
export class AdminManagementComponent  implements OnInit{
  
  isModalOpen = false;
  isDetailsOpen= false;
  isLoading = true;
  admins: any[] = [];
  admin = { firstName: '', secondName: '', email:'', role: ''} 
  

  constructor (
    private adminService : AdminService
  ){}

  ngOnInit (){
    this.loadAllAdmins ()
  }

  addNewAdmin(){
    this.adminService.registerAdmin(this.admin).subscribe({
      next: (res) =>{
        this.loadAllAdmins(); // refresh list
        this.isModalOpen = false
        this.admin = { firstName: '', secondName: '', email: '', role: '' }; // reset form
        console.log(res)
      },
      error: (err) => {
        console.error(err)
      }
    })

  }
  changeStatus(userId: number , status: string) {
    this.adminService.updateStatus(userId, status).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    })

  }
  changeRole(userId: number, role: string){
    this.adminService.updateRole(userId, role).subscribe({
      next:(res) => console.log(res),
      error: (err) => console.error(err)
    })

  }
  loadAllAdmins(): void{
    this.isLoading = true;
    this.adminService.getAdmins().subscribe({
      next:(res) => {
        this.admins = res.body?.data
        this.isLoading = false;
      },
      error : (err) => {
        console.error(err)
        this.isLoading = false;
      }
    })

  }
  getAdmin(userId: number) {
    this.adminService.getAdmin(userId).subscribe({
      next: (res) => {
        this.admin = res.body;
        this.isDetailsOpen = true;
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

}
