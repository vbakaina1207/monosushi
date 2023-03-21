import { NgModule } from '@angular/core'

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
]

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
})
export class SharedModule { }

