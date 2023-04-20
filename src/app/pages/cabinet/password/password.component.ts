import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Firestore } from "@angular/fire/firestore";
import {
  Auth,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  User
} from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { AccountService } from "../../../shared/services/account/account.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  public authForm!: FormGroup;
  public currentUser: any;
  public checkPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: Firestore,
    private auth: Auth,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private accountService: AccountService
  ) { }
  ngOnInit(): void {
    this.loadUser();
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

    getPassword( ): void {
     const getauth = getAuth();
     const { password } = this.authForm.value;
     let credential = EmailAuthProvider.credential( getauth.currentUser?.email as string, password );
     reauthenticateWithCredential(getauth.currentUser as User, credential)
       .then(() => {
         this.toastr.success('Password successfully ');
       }).catch(e => {
       this.toastr.error(e.message);
     });
   }

  updatePassword():void{
    this.getPassword();
      const {newPassword} = this.authForm.value;
      updatePassword(getAuth().currentUser as User, newPassword).then(() => {
        this.toastr.success('Password successfully changed');
        this.router.navigate(['/cabinet']);
      }).catch(e => {
        this.toastr.error(e.message);
      });
  }


  closeDialog():void{
    this.router.navigate(['/cabinet']);
  }

  checkConfirmPassword(): void {
    this.checkPassword = this.newPassword.value === this.confirmed.value;
    if(this.newPassword.value !== this.confirmed.value) {
      this.authForm.controls['confirmPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.authForm.controls['password'];
  }
  get newPassword(): AbstractControl {
    return this.authForm.controls['newPassword'];
  }

  get confirmed(): AbstractControl {
    return this.authForm.controls['confirmPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
     return this.authForm.controls[control].errors?.[name]
  }
}
