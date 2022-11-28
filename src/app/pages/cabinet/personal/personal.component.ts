import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAddressComponent } from 'src/app/components/auth-address/auth-address.component';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public authForm!: FormGroup;
  public currentUser: any;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loadUser();
    this.getUser();
    this.initAuthForm();
  }

  initAuthForm(): void {
      this.authForm = this.fb.group({
        email: [this.currentUser['email'], [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        firstName: [this.currentUser['firstName'], [Validators.required]],
        lastName:[this.currentUser['lastName'], [Validators.required]],
        phoneNumber:[this.currentUser['phoneNumber'], [Validators.required]]
      });
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

  openAddressDialog(): void {
    this.dialog.open(AuthAddressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  getUser():void{
    getDoc(doc(this.afs, "users", this.currentUser.uid)).then(() => {
      this.authForm = this.fb.group({
        email: [this.currentUser['email'], [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        firstName: [this.currentUser['firstName'], [Validators.required]],
        lastName:[this.currentUser['lastName'], [Validators.required]],
        phoneNumber:[this.currentUser['phoneNumber'], [Validators.required]]
      });
  })
}

}
