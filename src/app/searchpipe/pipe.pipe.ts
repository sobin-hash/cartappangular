import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(value: any[], searchKey: string): any[] {

    const result:any=[]
    console.log(value)
    console.log(searchKey)

    if(!value || !searchKey){ return value }

    value.forEach((item:any)=>{
      if(item.title.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }

    })

    return result;
  }


  
  

}
