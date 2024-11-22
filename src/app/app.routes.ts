import { Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { BlogComponent } from './features/blog/blog.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
