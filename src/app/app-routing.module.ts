import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/registration',
    pathMatch:'full'
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  {
    path:'userdetails',
  component:UserdetailsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
