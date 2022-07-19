import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { UiCollectionModule } from './../../ui-collection/ui-collection.module';
import { FormCardComponent } from './form-card.component';
import { FormInputService } from './form-input.service';
import { FormInputComponent } from './form-input.component';
import { FormControlService } from './form-control.service';
import { FormControlComponent } from './form-control.component';
import { FormApplicationComponent } from './form-application.component';
import { FormPersonComponent } from './form-person.component';
import { FormFieldService } from './form-field.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import { A11yModule} from '@angular/cdk/a11y';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule} from '@angular/cdk/portal';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule} from '@angular/cdk/tree';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatInputModule} from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTreeModule} from '@angular/material/tree';
import { OverlayModule} from '@angular/cdk/overlay';
import { DragDrop} from '@angular/cdk/drag-drop';
import { Portal} from '@angular/cdk/portal';
import { CdkStepper} from '@angular/cdk/stepper';
import { CdkTable} from '@angular/cdk/table';
import { CdkTree} from '@angular/cdk/tree';
import { MatAutocomplete} from '@angular/material/autocomplete';
import { MatBadge} from '@angular/material/badge';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatButton} from '@angular/material/button';
import { MatButtonToggle} from '@angular/material/button-toggle';
import { MatCard} from '@angular/material/card';
import { MatCheckbox} from '@angular/material/checkbox';
import { MatStepper} from '@angular/material/stepper';
import { MatDatepicker} from '@angular/material/datepicker';
import { MatDialog} from '@angular/material/dialog';
import { MatDivider} from '@angular/material/divider';
import { MatGridList} from '@angular/material/grid-list';
import { MatIcon} from '@angular/material/icon';
import { MatInput} from '@angular/material/input';
import { MatList} from '@angular/material/list';
import { MatMenu} from '@angular/material/menu';
import { MatPaginator} from '@angular/material/paginator';
import { MatProgressBar} from '@angular/material/progress-bar';
import { MatProgressSpinner} from '@angular/material/progress-spinner';
import { MatSelect} from '@angular/material/select';
import { MatSidenav} from '@angular/material/sidenav';
import { MatSlider} from '@angular/material/slider';
import { MatSlideToggle} from '@angular/material/slide-toggle';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatSort} from '@angular/material/sort';
import { MatTable} from '@angular/material/table';
import { MatToolbar} from '@angular/material/toolbar';
import { MatTooltip} from '@angular/material/tooltip';
import { MatTree} from '@angular/material/tree';
import { Overlay} from '@angular/cdk/overlay';
import { FormFieldComponent } from './form-field.component';
import { FormValidationService } from './form-validation.service';
import { FormAccountComponent } from './form-account.component';
import { UiControlModule } from '../../ui-control/ui-control.module';


@NgModule({
  declarations: [FormCardComponent,FormInputComponent,FormControlComponent,FormAccountComponent,FormPersonComponent,FormApplicationComponent,FormViewComponent,FormFieldComponent],
  exports: [
    FormCardComponent,
    FormInputComponent
  ],
  bootstrap: [
    FormCardComponent,
    FormInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiControlModule,
    UiCollectionModule,
    UiLayoutModule,
    CommonModule,
    FormsModule,

    BrowserModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
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
    OverlayModule
  ],
  providers: [
    FormControlService,
    FormFieldService,
    FormValidationService,
    FormInputService
  ]
})
export class FormInputModule { }