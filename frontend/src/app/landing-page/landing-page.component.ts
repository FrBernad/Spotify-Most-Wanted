import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  particlesUrl = "assets/particles/letters.json";
  id = "particlesContainer";

  constructor() {
  }

  ngOnInit(): void {
  }

}
