# FletNix-App

## Overview
FletNix is a Netflix-inspired application designed to help users search, filter, and explore movies and TV shows available on Netflix. The app is built with **Angular 18**. It supports basic authentication, pagination, search, filters, and user age-based content restrictions.

---

## Prerequisites
Ensure the following are installed on your system before proceeding:

1. **Node.js** (v16 or later) and **npm**  
   - [Download Node.js](https://nodejs.org/)
2. **Angular CLI** (v18 or later)  
   - Install Angular CLI globally:  
     ```
     npm install -g @angular/cli
     ```
3. **Backend Service**  
   - A running backend API (built in Python or Node.js) accessible via a base URL.  
   - Backend must have endpoints for authentication, data retrieval, and filtering.
4. **MongoDB**  
   - Data must be structured and imported into a MongoDB instance as described.

---

## Getting Started

### Clone the Repository
Clone the repository to your local machine:
```
git clone <repository-url>
cd <repository-folder>

```
### Install Dependencies
Run the following command to install required packages:
npm install

### Update Backend Base URL
Open the src/environments/environment.ts file and update the baseUrl property with your backend's base URL:
```
export const environment = {
  production: false,
  baseUrl: 'http://your-backend-api-url'
};
```
### Run the Application
Start the development server with:
ng serve
By default, the application will be available at http://localhost:4200.

### Features

Authentication: Users can register and log in using email, password, and age.
Pagination: Paginated list of movies/TV shows, 15 items per page.
Search: Search movies/TV shows by title or cast.
Filters: Filter content based on type (Movies/TV Shows).
Age Restriction: Users under 18 cannot view content with an "R" rating.
Detail Page: View detailed information for any movie/TV show.
