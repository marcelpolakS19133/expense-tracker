import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Credentials} from '../../models/credentials';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  loginForm: FormGroup = this.formBuilder.group({
    username: '',
    password: ''
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const creds: Credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(creds);

    this.router.navigate(['']);
  }

}
