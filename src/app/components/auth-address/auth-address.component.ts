import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';


@Component({
  selector: 'app-auth-address',
  templateUrl: './auth-address.component.html',
  styleUrls: ['./auth-address.component.scss']
})
export class AuthAddressComponent implements OnInit {

  public authForm!: FormGroup;
  public currentUser: any;


constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder


  ) { }

  ngOnInit() {
    this.loadUser();
    this.getAddress();
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      typeAddress: [this.currentUser['address[0]'], [Validators.required, Validators.required]],
      street: [this.currentUser.address[1], [Validators.required]],
      house:[this.currentUser['address[2]'], [Validators.required]],
      flat: [this.currentUser['address[3]']]
    })

  }



  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

  getAddress():void{
      getDoc(doc(this.afs, "users", this.currentUser.uid)).then((user_doc) => {
        let dataUser = user_doc.get('address');
        this.authForm = this.fb.group({
                typeAddress: [dataUser[0], [Validators.required]],
                street: [dataUser[1], [Validators.required]],
                house: [dataUser[2], [Validators.required]],
                flat: [dataUser[3], [Validators.required]]
              });
      });
  }



  addAddress():void{
    // const { email, password, firstName, lastName, phoneNumber } = this.authForm.value;
    this.updateAddress().then(() => {
      this.toastr.success('Address successfully changed');
    }).catch(e => {
      this.toastr.error(e.message);
    });
  }

  async updateAddress(): Promise<any> {
    const { typeAddress, street, house, flat } = this.authForm.value;
    const user = {
      address: [typeAddress, street, house, flat],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', this.currentUser.uid), user,  { merge:true });
    console.log(doc(this.afs, 'users', this.currentUser.uid), user);
  }

}
