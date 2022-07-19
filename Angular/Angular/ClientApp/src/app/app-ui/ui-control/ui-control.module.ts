import { ControlProgressComponent } from './control-progress.components';
import { ControlTextalignComponent } from './control-textalign.component';
import { ControlKeyboardDirective } from './control-keyboard.directive';
import { ControlDeclarationComponent } from './control-declarations.component';
import { ControlSwitchComponent } from './control-switch.component';
import { ControlRouteComponent } from './control-route.component';

import { RouterModule } from '@angular/router';
import { ControlRadioComponent } from './control-radio.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlSelectComponent } from './control-select.component';
import { MatOptionModule } from '@angular/material/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

import { ControlCheckComponent } from './control-check.component';
import { ControlNavComponent } from './control-nav.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ControlSearchComponent } from './control-search.component';
import { ControlDateComponent } from './control-date.component';
import { ControlPagesComponent } from './control-pages.component';
import { ControlButtonComponent } from './control-button.component';
import { ControlIconComponent } from './control-icon.component';
import { ControlImageComponent } from './control-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMenuComponent } from './control-menu.component';
import { ControlNavmenuComponent } from './control-navmenu.component';
import { ControlFontStyleComponent } from './control-fontstyle.radiogroup';



@NgModule({
  entryComponents:[
    ControlSwitchComponent,
    ControlSelectComponent,
    ControlMenuComponent

  ],
  declarations: [
    ControlProgressComponent,
    ControlNavmenuComponent,
    ControlDeclarationComponent,
    ControlRadioComponent,
    ControlSelectComponent,
    ControlCheckComponent,
    ControlNavComponent,
    ControlMessagesComponent,
    ControlSearchComponent,
    ControlDateComponent,
    ControlRouteComponent,
    ControlPagesComponent,
    ControlImageComponent,
    ControlButtonComponent,
    ControlSwitchComponent,
    ControlIconComponent,
    ControlKeyboardDirective,
    ControlMenuComponent,
    ControlFontStyleComponent,
    ControlTextalignComponent
  ],
  imports: [

    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,

    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    OverlayModule,
    MatOptionModule
  ],
  exports: [
    ControlProgressComponent,
    ControlFontStyleComponent,
    ControlKeyboardDirective,
    ControlMenuComponent,
    ControlNavmenuComponent,
    ControlRadioComponent,
    ControlSelectComponent,
    ControlCheckComponent,
    ControlNavComponent,
    ControlMessagesComponent,
    ControlSearchComponent,
    ControlDateComponent,
    ControlRouteComponent,
    ControlPagesComponent,
    ControlSwitchComponent,
    ControlIconComponent,
    ControlImageComponent,
    ControlButtonComponent,
    ControlDeclarationComponent,
    ControlTextalignComponent
  ]
})
export class UiControlModule { }
