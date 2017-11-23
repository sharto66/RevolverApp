import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})

export class EngineerComponent implements OnInit {

    name: string;
    available: boolean;

    constructor(name: string, available: boolean) {
        this.name = name;
        this.available = available;
    }

    ngOnInit() {

    }

    availabilityChecked(event: any): void {
        console.log('box checked');
    }

}
