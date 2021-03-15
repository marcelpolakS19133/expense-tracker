import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Credentials} from '../../models/credentials';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registering = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  loginForm: FormGroup = this.formBuilder.group({
    username: '',
    password: '',
    repeatPassword: ''
  });

  ngOnInit(): void {
    this.registering = this.route.snapshot.data.registering;
  }

  onSubmit(): void {
    const username: string = this.loginForm.value.username;
    const password: string = this.loginForm.value.password;

    if (username && password) {
      const creds: Credentials = {
        username,
        password
      };

      if (this.registering) {
        const repeatPassword = this.loginForm.value.repeatPassword;
        if (password === repeatPassword) {
          this.authService.register(creds);
          this.router.navigate(['']).then();
        }
      } else {
        this.authService.login(creds);
        this.router.navigate(['']).then();
      }
    }
  }
}
