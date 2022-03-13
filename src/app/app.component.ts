import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidator } from './user-validator';
import { map } from 'rxjs';
import { User } from './user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userForm!:FormGroup;
  userArray:User[] = [];
 constructor(private http:HttpClient){}
  ngOnInit(){
  
   this.userForm= new FormGroup({
    'userName': new FormControl(null, [Validators.required, UserValidator.invalidUserName]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'status': new FormControl('Unemployed')
 })

  }
  onAddUser(){
    this.http.post<{name:string}>('https://user-add-64eab-default-rtdb.europe-west1.firebasedatabase.app/post.json'
    , this.userForm.value).subscribe(responseData=>{
      console.log(responseData)
      this.userForm.reset();
    })
    
  }
  getAListOfUsers(){
    this.http.get<{[key:string]:User}>('https://user-add-64eab-default-rtdb.europe-west1.firebasedatabase.app/post.json')
    .pipe(map((responseData:{[key:string]:User})=>{
      
      for(const key in responseData){
       if(responseData.hasOwnProperty(key)){  
         this.userArray.push({...responseData[key], id:key})
       }}
       return this.userArray
    }))
    .subscribe(post=>{console.log(post)
    console.log(this.userArray
      )})
  
   }
   
}