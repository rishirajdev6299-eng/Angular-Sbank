import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common';
import{ FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashsbank',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './dashsbank.html',
  styleUrl: './dashsbank.css'
})
export class DashsbankComponent {
  protected readonly title = signal('sbank');
   account = {
    name: '',
    email: '',  
    accountType: '',
    accountNo: '',
    phone: '',
    address: '',
    id: '',
    balance: 0
  };
  searchAccountNo: any;
  searchName: string = '';
  searchAccountType: string = '';
  results: any;
  editData: any = {};
  creditAmountValue: any;
  withdrawAmountValue: any;
  selectedId: any;
  balanceAccountNo: any;
  balanceDetails: any;
  history:any[] = [];

  constructor( private http: HttpClient) {}
   saveData() {
    console.log(this.account);
    this.http.post('https://sbank1.onrender.com/api/save',
       this.account,{responseType: 'text'})
      .subscribe((response: any) => {
       
     console.log(response);
     if(response === 'Account Already Exists'){
      alert('Account Already Exists');
      } else {
      alert('Account Created Successfully');
      }
    

     //close the modal
     const modal = document.getElementById('accountModal');
      if (modal) {
        const bootstrapModal =  (window as any).bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        } 
      }
      },

     (error) => {
        console.log(error);
      }
    );
    
}

searchData() {
 let url = 'https://sbank1.onrender.com/api/search?';

  // ACCOUNT NUMBER
  if(this.searchAccountNo){

    url += `accountNo=${this.searchAccountNo}&`;

  }

  // NAME
  if(this.searchName){

    url += `name=${this.searchName}&`;

  }

  // ACCOUNT TYPE
  if(this.searchAccountType){

    url += `accountType=${this.searchAccountType}`;

  }
console.log(url);
  this.http.get<any[]>(

    url).subscribe(

    (response) => {

      this.results = response;

      console.log(this.results);

    },

    (error) => {

      console.log(error);

      alert("No Data Found");

    }

  );

}

deleteAccount(id:any){

  if(confirm("Are you sure to delete?")){

    this.http.delete(

      `https://sbank1.onrender.com/api/delete/${id}`

    ).subscribe(

      (response)=>{

        alert("Deleted Successfully");

        // REFRESH DATA
        this.searchData();

      },

      (error)=>{

        console.log(error);

      }

    );

  }

}
editAccount(result:any){

  this.editData = {...result};

}
updateAccount(id:any){

  this.http.put(

    `https://sbank1.onrender.com/api/update/${this.editData.id}`,

    this.editData

  ).subscribe(

    (response)=>{

      alert("Updated Successfully");

      console.log(response);

      this.searchData();

    },

    (error)=>{

      console.log(error);

    }

  );

}

creditAmount(id:any){
  console.log(id);
  console.log(id, this.creditAmountValue);

  this.http.put(

`https://sbank1.onrender.com/api/credit/${id}/${this.creditAmountValue}`,

    {}

  ).subscribe(

    (response)=>{

      alert("Amount Credited");

      this.searchData();

      this.creditAmountValue = '';

      const modal = document.getElementById('creditModal');
      if(modal){
        const bootstrapModal =  (window as any).bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }

    },

    (error)=>{

      console.log(error);

    }

  );

}


withdrawAmount(id:any){
  console.log(id);
  console.log(id, this.withdrawAmountValue);

  this.http.put(

`https://sbank1.onrender.com/api/debit/${id}/${this.withdrawAmountValue}`,

    {}

  ).subscribe(

    (response)=>{

      alert("Amount Debited");

      this.searchData();


      this.withdrawAmountValue = '';

      const modal = document.getElementById('withdrawModal');
      if(modal){
        const bootstrapModal =  (window as any).bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }

    },

    (error)=>{

      console.log(error);

      alert("Insufficient Balance");

    }

  );

}

checkBalance(){

  this.http.get(

`https://sbank1.onrender.com/api/balance/${this.balanceAccountNo}`

  ).subscribe(

    (response)=>{

      this.balanceDetails = response;

      console.log(this.balanceDetails);

    },

    (error)=>{

      console.log(error);

      alert("Account Not Found");

    }

  );

}

getHistory(accountNo:any){

  this.http.get<any[]>(

`https://sbank1.onrender.com/api/history/${accountNo}`

  ).subscribe(

    (response)=>{

      this.history = response;

      console.log(this.history);  

    }

  );

}

downloadStatement(accountNo:any){

  this.http.get(

`https://sbank1.onrender.com/api/statement/${accountNo}`,

    {

      responseType:'blob'

    }

  ).subscribe(

    (response:any)=>{

      const blob =
      new Blob([response],
      {type:'application/pdf'});

      const url =
      window.URL.createObjectURL(blob);

      const a =
      document.createElement('a');

      a.href = url;

      a.download = 'statement.pdf';

      a.click();

      window.URL.revokeObjectURL(url);

    },

    (error)=>{

      console.log(error);

    }

  );

}

 
}