import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from '../../../node_modules/ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';


/*
 Generated class for the DatabaseProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
*/
export interface Stud {
      id: number;
      username: string;
      email: string;
      phone: number;
}
@Injectable()
export class DatabaseProvider {

 private db: SQLiteObject;
 private isOpen: BehaviorSubject<boolean>;

data: Stud;

 constructor(public http: Http, public storage: SQLite, private plt: Platform) {
   console.log('Hello DatabaseProvider Provider');

   this.isOpen = new BehaviorSubject(false);

   this.plt.ready().then((readySource) => {
     this.CreateDatabase();
     console.log(readySource);
   })


    
   
 }

 getDatabaseState(){
   return this.isOpen.asObservable();
 }


 CreateDatabase(){
  return this.storage.create({
    name: 'employee.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    this.db = db;
  

    return db.sqlBatch([
      'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)',
      'CREATE TABLE IF NOT EXISTS employee(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, phone TEXT)',
      'CREATE TABLE IF NOT EXISTS mlabEmp(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, phone TEXT)'
    ]).then((readySource) =>{
      this.isOpen.next(true);
      return readySource;
    })
    

  }).catch((error) => {
    console.log('error ');

  })
 }

 createUser(username: string, email: string, password: string) {

    return this.db.executeSql("INSERT INTO users(username, email, password) VALUES (?, ?, ?)", [username ,email, password]);
      

 
 }

 login(username, password): Promise<Stud> {
  return this.db.executeSql('SELECT * FROM users WHERE username=? AND password=?',[username, password]).then(data => {
   if(data.rows.length > 0) {
    return {
      id: data.rows.item(0).id,
      username: data.rows.item(0).username,
      email: data.rows.item(0).email,
      phone: data.rows.item(0).phone
     
    }
   }
    
   });
 }



 getAllUsers() {
  
  
    return this.db.executeSql("SELECT * FROM users", []).then((data) => {

         let arrayUsers = [];
         if(data.rows.length > 0) {
           for(var i = 0; i < data.rows.length; i++) {
             arrayUsers.push({
               id: data.rows.item(i).id,
               username: data.rows.item(i).username,
               email: data.rows.item(i).email,
               password: data.rows.item(i).password
          
           });
         }
      }
      return arrayUsers;
    });
     
}

createEmployee(username: string, email: string, phone: string) {

  return this.db.executeSql("INSERT INTO mlabEmp(username, email, phone) VALUES (?, ?, ?)", [username ,email, phone]);
    


}

getEmployee(id): Promise<Stud> {
  return this.db.executeSql('SELECT * FROM mlabEmp WHERE id=?',[id]).then((data) => {
  
      return {
        id: data.rows.item(0).id,
        username: data.rows.item(0).username,
        email: data.rows.item(0).email,
        phone: data.rows.item(0).phone
       
      }
    
     });

  
}

 getAllEmployees() {
   
  return this.db.executeSql("SELECT * FROM mlabEmp", []).then((data) => {

    let arrayUsers = [];
    if(data.rows.length > 0) {
      for(var i = 0; i < data.rows.length; i++) {
        arrayUsers.push({
          id: data.rows.item(i).id,
          username: data.rows.item(i).username,
          email: data.rows.item(i).email,
          phone: data.rows.item(i).phone
     
      });
    }
 }
 return arrayUsers;
});
}

deleteEmployee(id){
  return new Promise((resolve,reject) =>{
    this.db.executeSql("DELETE FROM mlabEmp WHERE id=? ",[id])
    .then(res=>resolve(res))
    .catch(err=>reject(err));
  })
}

 updateEmployee(id, username, email, phone) {
   return this.db.executeSql("UPDATE mlabEmp SET username=?, email=?, phone=? WHERE id=?", [username, email, phone, id]);
 }


}
