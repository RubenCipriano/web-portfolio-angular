import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AppServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
