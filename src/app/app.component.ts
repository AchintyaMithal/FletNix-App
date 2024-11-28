import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Fletnix';

  constructor(private router: Router) {}

  isLogin() {
    return this.router.url === '/';
  }

  isInRegisterLoginPage() {
    if (this.router.url === '/register' || this.router.url === '/'  ) return true;
    return false;
  }

}
