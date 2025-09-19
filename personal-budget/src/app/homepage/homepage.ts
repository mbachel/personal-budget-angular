import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Article } from '../article/article';

//had to register all pie parts to be able to actually load the pie properly, otherwise would get errors
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'pb-homepage',
  imports: [Article],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {

  public dataSource: {
    datasets: { data: number[], backgroundColor: string[] }[];
    labels: string[];

    } = {

    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#4bc0c0',
                '#9966ff',
                '#8bc34a',
            ]
        }
    ],
    labels: [],
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
      // color.domain(dataSource.labels);
      // change(dataAssign());
    });
  }

  createChart() {
            var ctx = document.getElementById('myChart') as HTMLCanvasElement;

            //used only to allow myPieChart to be created
            if (!ctx) {
              console.error('Canvas not found.');
              return;
            }

            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: this.dataSource
            });
        }
}
