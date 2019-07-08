import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { EmployeePage } from '../employee/employee';

/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {

  usernameEmp: string;
  emailEmp: string;
  phoneEmp: string;

  formgroup: FormGroup;
 
  username: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
 
  addEmployee =  {
      eUsername: '',
      eEmail: '',
      ePhone: ''

  }

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public view: ViewController,
    public formbuilder: FormBuilder,
    private database: DatabaseProvider,
    private toastCtrl: ToastController,
   
    ) {

      
      this.formgroup = formbuilder.group({
        
        username:['', Validators.required],
        email:['', Validators.required],
        phone:['', Validators.required]
      
    });
    
        this.username = this.formgroup.controls['username'];
        this.email = this.formgroup.controls['email'];
        this.phone = this.formgroup.controls['phone'];

       

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  createEmployee() {
    
    this.database.createEmployee(this.addEmployee.eUsername, this.addEmployee.eEmail, this.addEmployee.ePhone).then((data) => {
      this.view.dismiss(); 
      this.navCtrl.push(EmployeePage);
      this.successToast('you have been added successfully', 'top');
 
    })
  }


  dismissModal() {
   this.view.dismiss();  
  }

  successToast(data, postion) {
    const toast = this.toastCtrl.create({
      message: 'User was created successfully'+' '+data,
      duration: 3000,
      position: postion
    });
    toast.present();
  }

  warningToast(position, error) {
    const toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: position
    });
    toast.present();
  }

}
