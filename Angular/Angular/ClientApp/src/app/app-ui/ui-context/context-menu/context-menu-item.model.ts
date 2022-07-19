
export interface ContextMenuItemModel {
    icon?:          string;
    label:          string;
    tooltip?:       string;
    click?:         ( evt ) => void;
    menuitems?:     Array<ContextMenuItemModel>;
}
