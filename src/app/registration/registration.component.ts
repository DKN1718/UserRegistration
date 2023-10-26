import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public registrationForm: FormGroup;

  data = {
    addressess: [
      {
        city: "",
        state:"",
        pinCode :""
      }
    ]
  }
  userdata: any;
  isDisabled: string = "yes";
  submitted: boolean =false;
  maxAddresses: number = 5;
  control: FormArray<any>;

  constructor(private fb: FormBuilder,private router :Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['',Validators.required],
      emailAddress :['',[Validators.required, Validators.email]],
      addressess: this.fb.array([])
    })
    this.setaddresses();
  }

  setaddresses() {
   this.control = <FormArray>this.registrationForm.controls.addressess;
    this.data.addressess.forEach(x =>{
        this.control.push(this.fb.group({
          city: [x.city, [Validators.required]],
          state :[x.state, [Validators.required]],
          pinCode :[x.pinCode,[Validators.required, Validators.pattern('^[0-9]*$')]]
        }))
      })
    }

    get addressList() {
      return this.registrationForm.controls['addressess'] as FormArray;
    }

    addNewAddress() {
      this.control = <FormArray>this.registrationForm.controls.addressess;
      if (this.control.length < this.maxAddresses) {
        this.control.push(
          this.fb.group({
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            pinCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
          })
        )
      }else{
        alert("Maximum 5 address can be added and not more than that")
      }
  
      
    }

    // deleteAddress(index: number) {
    //   let control = <FormArray>this.registrationForm.controls.addressess;
    //   control.removeAt(index)
    // }

    deleteAddress() {
      const addressArray = this.registrationForm.get('addressess') as FormArray;
      if (addressArray.length > 1) {
        addressArray.removeAt(addressArray.length - 1);
      }
    }
    
    onSubmit() {
      this.submitted=true;
      this.userdata=this.registrationForm.value;
      if(this.registrationForm.valid){
        localStorage.setItem('userdata', JSON.stringify(this.userdata));
        alert('User details were saved successfully.You will be redirected to User Details page on click of Ok');
        this.registrationForm.clearValidators();
        this.submitted = false;
        this.registrationForm.reset();
       this.router.navigateByUrl('/userdetails');
      }
      else{
        alert('Please fill all the required fields to register the User.');
      }
      
    }
}
