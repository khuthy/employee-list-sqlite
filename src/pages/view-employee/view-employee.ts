import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the ViewEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-employee',
  templateUrl: 'view-employee.html',
})
export class ViewEmployeePage {


  id: number;
  employeeDetails: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider
    ) {

   this.id = this.navParams.data;

   this.database.getEmployee(this.id).then((data) => {
     this.employeeDetails = data;
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEmployeePage');
  }

  



}
