import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public regForm!: FormGroup;
  public isLogin = false;
  public isRegister = false;
  public checkPassword = false;
  public credential!: any;
  public currentUser!: any;
  public loginSubscription!: Subscription;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegForm(): void {
    this.regForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName:[null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login');
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

 async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
   this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      this.currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
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
    const { email, password } = this.regForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.regForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    });
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const { firstName, lastName, phoneNumber } = this.regForm.value;
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

  checkConfirmPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value) {
      this.regForm.controls['confirmPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.regForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.regForm.controls['confirmPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.regForm.controls[control]?.errors?.[name]
  }


}
