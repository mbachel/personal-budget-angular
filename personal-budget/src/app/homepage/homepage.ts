import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Data } from '../data';
declare var d3: any;
import { Article } from '../article/article';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

//had to register all pie parts to be able to actually load the pie properly, otherwise would get errors
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'pb-homepage',
  imports: [Article, Breadcrumbs],
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

  constructor(private data: Data) { }

  ngOnInit(): void {
    this.data.pullData()
    .subscribe((res: any) => {
      console.log(res);
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
      color.domain(this.dataSource.labels);
      change(dataAssign(this.dataSource));
    });

    //This is for the D3JS chart
        var svg = d3.select("#d3chart")
            .append("svg")
            .append("g");

        svg.append("g")
            .attr("class", "slices");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");

        var width = 960,
            height = 400,
            radius = Math.min(width, height) / 2;

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d: any) {
                return d.value;
            });

        var arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        var outerArc = d3.svg.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var key = function(d: any) {
            return d.data.label;
        };

        var color = d3.scale.ordinal()
            .domain(this.dataSource.labels)
            .range(this.dataSource.datasets[0].backgroundColor);

        function dataAssign(dataSource: any) {
            var labels = color.domain();
            return labels.map(function(label: any, i: number) {
                return { label: label, value: dataSource.datasets[0].data[i] };
            });
        }

        function change(data: any) {
            //  slices --------------------------------------------------------------------------------------
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(data), key);

            slice.enter()
                .append("path")
                .style("fill", function(d: any) {
                    return color(d.data.label);
                })
                .attr("class", "slice")
                .attr("d", arc);

            slice.exit()
                .remove();

            //  text labels --------------------------------------------------------------------------------------
            var text = svg.select(".labels").selectAll("text")
                .data(pie(data), key);

            text.enter()
                .append("text")
                .attr("dy", ".35em")
                .attr("transform", (d: any) => {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                })
                .style("text-anchor", (d: any) => midAngle(d) < Math.PI ? "start":"end")
                .style("fill", "black")
                .style("font-size", "14px")
                .style("font-family", "Tahoma, Arial")
                .text((d: any) => d.data.label);

            function midAngle(d: any) {
                return d.startAngle + (d.endAngle - d.startAngle)/2;
            }

            text.exit()
                .remove();

            //slice to text polylines --------------------------------------------------------------------------------------

            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key);

            polyline.enter()
                .append("polyline")
                .attr("points", (d: any) => {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 1.05 * (midAngle(d) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos];
                });

            polyline.exit()
                .remove();
        };
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
