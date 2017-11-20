import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import 'chart.piecelabel.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    @ViewChild('chimePost') chimePost: ElementRef;
    @ViewChild('formPost') formPost: ElementRef;

    constructor(private http: HttpClient) {}

    agent: string = null;
    caseId: number = 4635139811;
    spinInProgress: boolean = false;
    result: string;
    canvas: any;
    ctx: any;
    chart: Chart;

    ngOnInit() {
        this.http.get('https://awssupport.amazon.com/profile/refresh_partial/agent_availability?profile_name=dms').subscribe(data => {
            console.log(data);
        });
    }

    ngAfterViewInit() {
        this.canvas = document.getElementById('da-revolver');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: ["seahartn", "veglienz", "eanbyrne", "artiedag", "bmathe"],
                datasets: [{
                    label: '# of Votes',
                    data: [1,1,1,1,1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(123, 102, 215, 1)',
                        'rgba(194, 100, 135, 1)',
                        'rgba(20, 200, 235, 1)',
                        'rgba(132, 130, 178, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                pieceLabel: {
                    render: 'label',
                    fontSize: 16,
                    fontColor: '#fff',
                    fontStyle: 'bold'
              },
              responsive: false,
              display: true
          }
      });
      this.playAudio('gun-cock');
    }

    buttonClicked(): void {
        this.spinInProgress = true;
        let prev = null;
        const size = this.chart.config.data.datasets[0].backgroundColor.length;
        const r = Math.floor(Math.random() * size) + size;
        for (let i = 0; i <= r; i++) {
            this.sleep(i * 500).then(() => {
                if (prev) {
                    let index = (i % size) - 1;
                    if (i % size == 0) index = size - 1;
                    this.chart.config.data.datasets[0].backgroundColor[index] = prev;
                }
                prev = this.chart.config.data.datasets[0].backgroundColor[i % size];
                this.chart.config.data.datasets[0].backgroundColor[i % size] = 'rgba(0, 0, 0, 1)';
                this.chart.update();
                if (i == r) {
                    this.agentSelected(this.chart.config.data.labels[i % size]);
                }
            });
        }
        console.log(this.chart.config.data.labels[(r % size)] + ' has gotten the case!')
    }

    agentSelected(agent: string): void {
        this.result = agent + ' has gotten the case. Hate that!';
        this.agent = agent;
        this.spinInProgress = false;
        this.playAudio('gun-shot');
        const form: HTMLElement = this.formPost.nativeElement as HTMLElement;
        const chime: HTMLElement = this.chimePost.nativeElement as HTMLElement;
        console.log(this.agent);
        console.log(this.caseId);
        this.sleep(1500).then(() => {
            form.click();
            chime.click();
        });
    }

    assignCaseToAgent(): void {
        /*const url: string = 'https://hooks.chime.aws/incomingwebhooks/1e2f18a7-b594-4b49-8ce7-fadc19589df2?token=V2RDZzZMWTR8MXxSWmRmei1IdjlWMl9rMHpQQ2tGZk5Pdm42NTVWd2RJSzdwRTRERXVpazNZ';
        const body = {'Content': this.agent + ' has been assigned case ' + this.caseId + ' by Support Revolver.'}
        this.http.post(url, body).subscribe();*/
    }

    playAudio(sound: string): void {
        const audio = new Audio();
        audio.src = '../assets/sounds/' + sound + '.mp3';
        audio.load();
        audio.play();
    }

    sleep (millisec): any {
        return new Promise((resolve) => setTimeout(resolve, millisec));
    }
}
