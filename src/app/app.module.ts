import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { BoxBuilderComponent } from './box-builder/box-builder.component'
import { BoxDisplayComponent } from './box-display/box-display.component'
import { BoxListComponent } from './box-list/box-list.component'

@NgModule({
  declarations: [
    AppComponent,
    BoxBuilderComponent,
    BoxDisplayComponent,
    BoxListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
