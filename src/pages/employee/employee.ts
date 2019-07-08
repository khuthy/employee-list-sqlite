import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AddEmployeePage } from '../add-employee/add-employee';
import { DatabaseProvider } from '../../providers/database/database';
import { ViewEmployeePage } from '../view-employee/view-employee';
import { UpdateEmployeePage } from '../update-employee/update-employee';



/**
 * Generated class for the EmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  items: any [] = [];

  viewEmployees: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modal: ModalController, 
    private database: DatabaseProvider, 
    public toastCtrl: ToastController ) {
   
      this.database.getDatabaseState().subscribe((readySource) => {
        if(readySource){
          this.view();
        }
      });
  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
   
  }
  openModal() {
   let modal = this.modal.create(AddEmployeePage);
   modal.present();
  }

  viewEmployee(id){
    this.navCtrl.push(ViewEmployeePage, id);
  }  
  
  updateEmployee(id){
    this.navCtrl.push(UpdateEmployeePage, id);
  }

  view() {
    this.database.getAllEmployees().then((data) => {
        console.log(data);
       this.viewEmployees = data; 
    })
  }

  deleteEmployees(id){
   
    
    
        if(confirm('Are you sure you want to delete this employee')) {
        this.database.deleteEmployee(id);
        this.view();
       
        this.warningToast('top', 'employee was deleted successfully');
        
       } 
  
  }

  

 

  
  successToast(data, postion) {
    const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: postion
    });
    toast.present();
  }


  warningToast(position, message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });
    toast.present();
  }
  

}
