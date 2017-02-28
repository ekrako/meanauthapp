import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService }  from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(
    private validateService: ValidateService,
    private flashMesage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMesage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 })
      return false
    }
    //validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMesage.show('Please use A valid Email', { cssClass: 'alert-danger', timeout: 3000 })
      return false
    }
    // register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMesage.show(user.username + ' was created successfully', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/login']);
      } else {
        this.flashMesage.show('Failed to create User', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/register']);
      }

    });
  }

}
