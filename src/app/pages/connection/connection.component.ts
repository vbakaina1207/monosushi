import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {


  }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      name: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]]
    })
  }
  sendPhone(): void {

  }
}
