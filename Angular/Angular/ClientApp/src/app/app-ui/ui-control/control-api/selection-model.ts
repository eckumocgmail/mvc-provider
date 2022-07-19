export class SelectionModel
{
    public multi: boolean = true;
    public selected: Element|Array<Element>;
    public reset(){
        if( this.multi ){
            if( this.selected && this.selected['length']>0 ){
                for( let i=0; i<this.selected['length']; i++ ){
                    this.selected[i]['selected'] = false;
                }
                this.selected = [];
            }
        }else{
            if( this.selected ){
                this.selected['selected'] = false;
                this.selected = null;
            }
        }
    }

    /*constructor( multiselection?: boolean ){
        this.multi = multiselection? true: false;
    }*/

    public toggle( item: any ){

        if( !this.multi ){
            if( this.selected ){

                item.selected = true;
                if( item == this.selected ){
                    item.selected = false;
                    this.selected = null;
                }else{
                    this.selected['selected'] = false;
                    this.selected = item;
                    item.selected = true;
                }

            }else{
                item.selected = true;
                this.selected = item;
            }

        }else{
            if( !(this.selected instanceof Array) ){
                const arr = new Array();
                if( this.selected ){
                    arr.push( this.selected );
                }
                this.selected = arr;
            }
            const i = this.selected.indexOf( item );
            if( i === -1 ){
                this.selected.push( item );
                item.selected = true;
            }else{
                this.selected.splice(i,1);
                item.selected = false;
            }
        }
    }
}
