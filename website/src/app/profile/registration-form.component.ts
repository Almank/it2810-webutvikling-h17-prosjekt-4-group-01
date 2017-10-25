import { Component } from '@angular/core';

import { User }    from './user';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {



  model = new User(18, 'Frank');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newUser() {
    this.model = new User(42, '');
  }
}
