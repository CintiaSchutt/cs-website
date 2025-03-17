import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects = [
    {
      title: "My Project",
      description: "On the way",
      image: "assets/images/woman-coding.png"
    },
    {
      title: "My Project",
      description: "On the way",
      image: "assets/images/woman-coding.png"
    },
    {
      title: "My Project",
      description: "On the way",
      image: "assets/images/woman-coding.png"
    }
  ]
}
