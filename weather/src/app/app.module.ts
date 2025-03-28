import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';

import { HttpClientModule } from '@angular/common/http';

import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GMapModule } from 'primeng/gmap';

@NgModule({
  declarations: [AppComponent, HomeComponent, LocationDetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SkeletonModule,
    DialogModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
    GMapModule,
  ],
  providers: [MessageService, Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
