import { Component } from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { HttpClient }
from '@angular/common/http';

import { Router }
from '@angular/router';

@Component({

  selector: 'app-loginsbank',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './loginsbank.html',

  styleUrl: './loginsbank.css'

})

export class LoginsbankComponent {

  username:string='';

  password:string='';

  constructor(

    private http:HttpClient,

    private router:Router

  ){}

  login(){

    const data = {

      username:this.username,

      password:this.password

    };

    this.http.post(

'https://sbank1.onrender.com/api/login',

      data,

      {responseType:'text'}

    ).subscribe(

      (response:any)=>{

        console.log(response);

        if(
response.includes("Invalid")
        ){

          alert(
'Invalid Username or Password'
          );

        }

        else{

          alert('Welcome back to SBank');

          this.router.navigate(
            ['/dashboard']
          );

        }

      },

      (error)=>{

        console.log(error);

      }

    );

  }

}