import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService }  from 'angular2-flash-messages';

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
  constructor(private validateService: ValidateService, private flashMesage: FlashMessagesService) { }

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
  }

}
