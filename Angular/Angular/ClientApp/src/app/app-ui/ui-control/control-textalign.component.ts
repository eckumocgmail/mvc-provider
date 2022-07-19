import { Component } from "@angular/core";
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-textalign',
  template: `
    <mat-button-toggle-group #group="matButtonToggleGroup">
      <mat-button-toggle value="left" aria-label="Text align left">
        <mat-icon>format_align_left</mat-icon>
      </mat-button-toggle>
      <mat-button-toggle value="center" aria-label="Text align center">
        <mat-icon>format_align_center</mat-icon>
      </mat-button-toggle>
      <mat-button-toggle value="right" aria-label="Text align right">
        <mat-icon>format_align_right</mat-icon>
      </mat-button-toggle>
      <mat-button-toggle value="justify" disabled aria-label="Text align justify">
        <mat-icon>format_align_justify</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
<div class="example-selected-value">Selected value: {{group.value}}</div>
  `
})
export class ControlTextalignComponent
{

}
