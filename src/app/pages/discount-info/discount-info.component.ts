import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public discount!: IDiscountResponse;
  public description: Array<string> = [];

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }

  getOneDiscount(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;
      this.description = this.getDescription(this.discount.description);
      this.description = this.description.splice(0, this.description.length-1);
    })
  }

getDescription(str:string):Array<string> {
  console.log(str.split('.'));
  return  str.split('.');
}  

}
