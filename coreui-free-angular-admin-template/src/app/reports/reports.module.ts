import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ReportsComponent } from './reports.component';

@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    MatListModule,
    CommonModule,
    AgmCoreModule,
  ],
  declarations: [ ReportsComponent ]
})
export class ReportsModule { }
