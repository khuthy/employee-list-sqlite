import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ViewEmployeePage } from '../view-employee/view-employee';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the UpdateEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-employee',
  templateUrl: 'update-employee.html',
})
export class UpdateEmployeePage {

  username: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;

  formgroup: FormGroup;

  id: any;
  addEmployee = {
    id: null,
    eUsername: '',
    eEmail: '',
    ePhone: null
  }



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public  view: ViewController,
    private database: DatabaseProvider,
    public toast: ToastController,
    public formbuilder: FormBuilder
    ) {

  


      this.formgroup = formbuilder.group({
        
        username:['', Validators.required],
        email:['', Validators.required],
        phone:['', Validators.required]
      
    });
    
        this.username = this.formgroup.controls['username'];
        this.email = this.formgroup.controls['email'];
        this.phone = this.formgroup.controls['phone'];

        this.id = this.navParams.data;

        this.database.getEmployee(this.id).then((data) => {
        this.addEmployee.id = data.id;
        this.addEmployee.eUsername = data.username;
        this.addEmployee.eEmail = data.email;
        this.addEmployee.ePhone = data.phone;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateEmployeePage');
  }

   updateEmployee(){
    this.database.updateEmployee(this.addEmployee.id, this.addEmployee.eUsername, this.addEmployee.eEmail, this.addEmployee.ePhone).then((data) => {
        this.navCtrl.push(ViewEmployeePage, this.id);
        this.successToast('top', 'updated successful');
    });
  } 

  successToast(position, message){
    this.toast.create({
      message: message,
      position: position,
      duration: 3000
    })
  }

}
