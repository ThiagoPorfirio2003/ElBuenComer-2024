import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiningMenuPageRoutingModule } from './dining-menu-routing.module';

import { DiningMenuPage } from './dining-menu.page';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { MayusculaPrimeraPipe } from "../../pipe/mayuscula-primera.pipe";

@NgModule({
    declarations: [DiningMenuPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DiningMenuPageRoutingModule,
        SharedComponentsModule,
        MayusculaPrimeraPipe,
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DiningMenuPageModule {}
