import { Component, Input } from '@angular/core';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent {
 userdetails:any;
 userdata:any;
  addressList: any =[];



 ngOnInit(){
  this.getdata();
 }
  getdata(){
    this.userdata =[];
      
      this.userdetails = localStorage.getItem('userdata');
      this.userdata.push(JSON.parse(this.userdetails))
       console.log(this.userdata);
       //////////
       for(let i =0;i<this.userdata[0].addressess.length;i++){
         this.addressList.push(this.userdata[0].addressess[i]);
       }
    
    
  }

  deleteRow(x: any) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.userdata.splice(x, 1);
    }
  }
}
