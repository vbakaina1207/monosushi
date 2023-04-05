import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
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
          lastName: [this.currentUser['lastName'], [Validators.required]],
          phoneNumber: [this.currentUser['phoneNumber'], [Validators.required]]
        });
      })
}

  updateUser():void{
    this.updateDoc().then(() => {
      this.toastr.success('User successfully changed');
    }).catch(e => {
      this.toastr.error(e.message);
    });
  }

  async updateDoc(): Promise<any> {
    const { email, firstName, lastName, phoneNumber } = this.authForm.value;
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      // orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', this.currentUser.uid), user,  { merge:true });
    // console.log(doc(this.afs, 'users', this.currentUser.uid), user);
  }

}
