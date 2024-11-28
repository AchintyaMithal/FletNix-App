// src/app/components/detail/detail.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  data: any = {};
  tokens: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the ID from the URL
    const id = this.route.snapshot.paramMap.get('id');   
    // Fetch show details using the ApiService
    if (id) {
      this.apiService.getShowDetails(id).subscribe((response: any) => {
        this.data = response.show;
      });
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
  }
}
