import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { getDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public isLogin = false;
  public isRegister = false;
  public credential!: any;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName:[null],
      lastName: [null],
      phoneNumber: [null]
    })
  }

  loginUser(): void {
    // this.dialogRef.close({
    //   formData: this.authForm.value
    // })
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login');
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

 async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if(user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
      } else if(user && user['role'] === ROLE.ADMIN){
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
 }

  registerUser(): void { 
    const { email, password, firstName, lastName, phoneNumber } = this.authForm.value;    
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.login(email, password).then(() => {
        this.toastr.success('User successfully login');
      });
      this.isLogin = !this.isLogin;
      this.authForm.reset();      
    }).catch(e => {
      this.toastr.error(e.message);
    });
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const { firstName, lastName, phoneNumber } = this.authForm.value;  
    this.credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: this.credential.user.email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', this.credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  openRegisterDialog(): void {
    this.isRegister = true;
  }

  openLoginDialog(): void {
    this.isRegister = false;
  }

  // async getUser(): Promise<any> {
  //   // const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  //   const ref = doc(this.afs, "users", this.credential.user.uid);
  //   const userDoc = await getDoc(ref);
  //   console.log(userDoc.data());
  //   return userDoc.data();
  // }
  
}
