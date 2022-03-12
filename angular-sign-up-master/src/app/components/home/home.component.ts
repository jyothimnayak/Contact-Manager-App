import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactForm!: FormGroup;
  ContactList: any[];

  constructor(private fb:FormBuilder, private authService: AuthService,
    private router: Router,) { 
    this.ContactList=[];
        this.contactForm=this.fb.group({
          name:['',Validators.required],
          phonenumber:['',Validators.required],
          email:['',Validators.required]
        })
  }

  ngOnInit(): void {
  }
  public addItem():void{
    console.log(this.contactForm.value)
    this.ContactList.push(this.contactForm.value); 
   this.reset();  
  }
  reset(){
    this.contactForm.reset();
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
