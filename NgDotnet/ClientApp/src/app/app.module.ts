import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, TitleStrategy } from '@angular/router';
import { Templatepagetitlestrategy } from './common/templatepagetitlestrategy';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestAComponent } from './test-a/test-a.component';
import { TestBComponent } from './test-b/test-b.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PageNotFoundComponent,
    TestAComponent,
    TestBComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent, pathMatch: 'full', title: 'Home Component', children: [
          { path: 'test-a', component: TestAComponent, title: 'Check A' },
          { path: 'test-b', component: TestBComponent, title: 'Check B' }
        ]
      },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: TitleStrategy, useClass: Templatepagetitlestrategy }
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
