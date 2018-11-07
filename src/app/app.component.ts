
import {Component, ViewChild, OnInit} from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // property binding for template-based method
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: ''
  }
  @ViewChild('f') myForm: NgForm;

  // reactive method
  reactiveForm: FormGroup;
  forbiddenUserNames = ['Anna', 'Jason'];

  onSuggestUserName() {
    const suggestedName = 'Superuser';
    // this.myForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   question: 'pet',
    //   answer: '',
    //   gender:''
    // });
    this.myForm.form.patchValue({
      userData: { username: suggestedName }
    });
  }


  ngOnInit() {
    // for custom validators need to bind "this", since function will be executed later (out of scope)
    this.reactiveForm = new FormGroup({
      'username1': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)] ),
      'email1': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      'gender1': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    console.log(this.myForm);
    this.submitted = true;
    this.user.username = this.myForm.value.userData.username;
    this.user.email = this.myForm.value.userData.email;
    this.user.question = this.myForm.value.question;
    this.user.answer = this.myForm.value.answer;
    this.user.gender = this.myForm.value.gender;
    // reset form
    this.myForm.reset();
  }

  onSubmit1() {
    console.log(this.reactiveForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.reactiveForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s:string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      } , 1500);
    });
    return promise;
  }

}
