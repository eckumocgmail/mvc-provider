import { Output, EventEmitter, Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    inputs: [ 'inputSearchOptions' ],

})
export class SearchComponent {

    query = '';

    @Input('options')
    options: string[] = [];

    @Output()
    input = new EventEmitter();

    @Output()
    search = new EventEmitter();

    onSearch( query: string ) {
        this.search.emit( query );
    }

    onKeypress( evt ) {
        if ( evt.code == 'enter' ) {
            this.onSearch( this.query );
        }
    }

    onInput( evt: Event ) {
        evt.preventDefault();
        evt.stopPropagation();
        this.input.emit( this.query = evt.target['value']   );
    }
}
