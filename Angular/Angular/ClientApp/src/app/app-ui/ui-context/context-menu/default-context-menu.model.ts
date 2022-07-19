import { ContextMenuItemModel } from './context-menu-item.model';


export class DefaultContextMenuitem
implements ContextMenuItemModel {

    constructor( icon?: string,
                 label?: string ) {
        this.icon = icon;
        this.label = label;
    }

    icon = '';
    label = '';
    tooltip = '';
    click?:         ( evt ) => void;
    menuitems?:     Array<ContextMenuItemModel> = [];

    static create( options?: ContextMenuItemModel ) {
        const pmenuitem = new DefaultContextMenuitem();
        if ( options ) {
            Object.assign( pmenuitem, options );
        }
        return pmenuitem;
    }
}
