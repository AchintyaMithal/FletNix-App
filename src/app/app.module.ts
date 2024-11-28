import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './homepage/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailComponent } from './detail/detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    
    HomeComponent,
    DetailComponent,
  ],

  // Import modules for the components to use
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot({
      fgsSize: 100,
      hasProgressBar: false,
      bgsOpacity: 0.6,
      blur: 10,
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      tapToDismiss: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true, // Allow multiple interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
