import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
   constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
  ) { }

  ngOnInit(): void {
  }
  submit() {
    console.log(this.signupForm.value);
    if (!this.signupForm.valid) {
      return;
    }
    const { email, password } = this.signupForm.value;
    this.authService.signUp(email, password).pipe(
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `There was an error: ${message} `
        })
      )
      .subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
   }
  
}
