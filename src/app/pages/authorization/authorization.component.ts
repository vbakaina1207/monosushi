import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/conatants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public authForm!: FormGroup;
  public isError:boolean = false;
  public isClose:boolean = false;
  @Output() onChanged = new EventEmitter<boolean>();
  
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    this.accountService.login(this.authForm.value).subscribe(data => {
      if(data && data.length > 0) {
        const user = data[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(localStorage.setItem('currentUser', JSON.stringify(user)));
        this.accountService.isUserLogin$.next(true);
        if(user && user.role === ROLE.USER) {
          this.router.navigate(['/cabinet']);
          
        } else if(user && user.role === ROLE.ADMIN){
          this.router.navigate(['/admin']);
        }
      }  else this.isError = true;
    }, (e) => {
      console.log(e);
    })
  }

  closeModal(){
    // this.isClose = true;
    this.onChanged.emit(true);
    console.log(this.isClose, 'close');
  }

//   @HostListener('document:click', ['$event'])
// 	onClick(event: Event) {
// 		if (!this.el.nativeElement.contains(event.target)) {
// 			this.isClose = false;
// 		} 
//     else this.isClose = false ;
//     // if(event.target == 'div.modal-wrapper') {}
//     console.log('close2', this.isClose , this.el.nativeElement.contains(event.target), event);
// 	}
}
