import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the IndianNumber pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'indianNumber'
})
@Injectable()
export class IndianNumber {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
     if(null!=value){
    return Number(value).toLocaleString("en-In",{maximumFractionDigits:2});
   }else{
    return Number(0).toLocaleString("en-In",{maximumFractionDigits:2});
   }
      }
}
