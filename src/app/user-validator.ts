import {FormControl} from '@angular/forms'
export class UserValidator{
 static invalidUserName(control:FormControl):{[s:string]:boolean}|null{
     if (control.value=='Radisa'){
         return {'invalidUserName':true}
     }
     return null
 }
}