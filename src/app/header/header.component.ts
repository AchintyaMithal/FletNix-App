import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  darkTheme: boolean = false;
  public userData: any = null;
  showDropdown: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
   // Load user data from localStorage
   this.authService.user$.subscribe((user) => {
    this.userData = user;
  });

  console.log(this.userData)
  }

   // returning whether a user is logged in or not
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.toastr.success('Logging out');
    this.authService.logout();    
    this.router.navigate(['/']);
  }

  isRegisterPage() {
    if (this.router.url === '/register') return true;
    return false;
  }

  isLoginPage() {
    if (this.router.url === '/') return true;
    return false;
  }

  get currentRoute() {
    return this.router.url;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
