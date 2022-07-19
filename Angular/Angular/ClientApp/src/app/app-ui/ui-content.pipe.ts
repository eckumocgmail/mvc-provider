import {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';


@Pipe({
    name: 'content'
})
export class UiContentPipe
implements PipeTransform {

    transform( value: any, ...args: any[] ) {
        if ( value instanceof Date ) {
            return value.getFullYear() + '-' + (value.getMonth() < 10 ? '0' + value.getMonth() : value.getMonth()) + '-' + (value.getDate() < 10 ? '0' + value.getDate() : value.getDate());
        } else {
            return value;
        }
    }

}
