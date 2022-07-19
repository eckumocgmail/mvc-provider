import { UiCommonComponent } from './../../ui-common/ui-common.component';
import { Controlable } from '../../ui-control/control-api/controlable';
import { TemplateRef, Injector} from '@angular/core';
import { Input} from '@angular/core';
import { Output} from '@angular/core';
import { Component} from '@angular/core';
import { OnChanges} from '@angular/core';
import { ElementRef} from '@angular/core';
import { EventEmitter} from '@angular/core';
import { style} from '@angular/animations';

import { SelectionModel } from '../../ui-control/control-api/selection-model';

// import { specification } from 'projects/ui-forms/src/lib/input-form/annotations/specification.function';







// @specification({
//   icon: 'account_tree',
//   label: 'tree component',
//   tooltip: 'Tree component display content hierarhicaly and implements recursive function to handle them.'
// })
@Component({
  selector: 'collection-tree,app-tree',
  templateUrl: './collection-tree.component.html',
  inputs: [ 'multiselect', 'template', 'nodelist', 'title', 'selectable', 'draggable', 'droppable' ]
})
export class CollectionTreeComponent
extends UiCommonComponent
{

  @Output('selected') onSelect = new EventEmitter();
  draggable: boolean = false;
  droppable: boolean = false;

  selection : SelectionModel = new SelectionModel();

  @Input()
  selectable = true;

  @Input()
  set multiselect( value ) {
      this.selection.multi = value;
  }

  totalEstimate = 10;
  templateCtx = {
      estimate: this.totalEstimate
  };


  title: string ;
  template: TemplateRef<any>;
  nodelist: Array<{
    icon?: string,
    label: string,
    tooltip?: string,
    children?: Array<any>,
    expanded?: boolean
  }> = [{
    icon:     'people',
    label:    'root',
    tooltip:  '',
    expanded: true,
    children: [
      {
        icon:   'people',
        label:  'group 1',
        tooltip: '',
        expanded: false,
        children: [
          {
            icon:   'person',
            label:  'person 1',
            tooltip: '',
            expanded: false
          },
          {
            icon:   'person',
            label:  'person 2',
            tooltip: '',
            expanded: false
          },
        ]
      },
      {
        icon:   'people',
        label:  'group 2',
        tooltip: '',
        expanded: false,
        children: [
          {
            icon:   'person',
            label:  'person 1',
            tooltip: '',
            expanded: false
          },
          {
            icon:   'person',
            label:  'person 2',
            tooltip: '',
            expanded: false
          },
        ]

      },
    ]
  }];

  constructor( injector: Injector, public elementRef: ElementRef ) {
    super(injector);
  }


  keypress(evt: Event){
    evt.preventDefault();
    evt.stopPropagation();
  }

  click( pnode, event: Event ) {
    event.preventDefault();
    if ( pnode.click ) {
      pnode.click(event);
    }
    pnode['expanded'] = pnode['expanded'] ? false : true;
    return true;
  }






  toggle( node ) {
    node.expanded = (!node.expanded) ? true : false;
    return true;
  }
}
