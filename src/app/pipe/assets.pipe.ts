import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'assetspipe'
})
export class AssetsPipe implements PipeTransform {

    transform(value: string, args?: any): any {
        if (document.location.origin.indexOf('localhost') > -1) {
            return './' + value;
        } else if (document.location.pathname.indexOf('hpe') > -1) {
            return 'http://demo.divami.com/hpe/' + value;
        } 
        else if (document.location.pathname.indexOf('service.labs') === -1) {
            return 'https://edge.spiceworksstatic.com/service.labs/' + document.location.pathname.split('/')[1] + '/' + value;
        } else {
            return './' + value;
        }
    }
}
