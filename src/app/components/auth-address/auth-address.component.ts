import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
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
      typeAddress: [null, [Validators.required, Validators.required]],
      street: [this.currentUser['address'], [Validators.required]],
      house:[null, [Validators.required]],
      flat: [null]      
    })
  }

  addAddress():void{
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

  getAddress():void{
    getDoc(doc(this.afs, "users", this.currentUser.uid)).then(() => {
      this.authForm = this.fb.group({
        street: [this.currentUser['address'], [Validators.required]],        
      });
  })
}
  
}
