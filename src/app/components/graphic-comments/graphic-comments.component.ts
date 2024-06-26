import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UtilsService } from 'src/app/services/utils.service';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-graphic-comments',
  templateUrl: './graphic-comments.component.html',
  styleUrls: ['./graphic-comments.component.scss'],
})
export class GraphicCommentsComponent implements OnInit{
  @ViewChild('acquisitionsChart', { static: true }) acquisitionsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: true }) pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart', { static: true }) lineChart!: ElementRef<HTMLCanvasElement>;
   
  constructor( 
    private modalController: ModalController, 
    private util: UtilsService,
    private firebase: DataBaseService) {
     }
     ngOnInit() {
      this.createChart();
      this.createChartPie();
      this.createChartLine();
    }
  
  closeModal() {
    this.modalController.dismiss();
  }

  createChart() {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    new Chart(this.acquisitionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            },
          }
        }
      }
    });
  }

  createChartPie(){
    const data = [
      { category: 'Category 1', value: 10 },
      { category: 'Category 2', value: 20 },
      { category: 'Category 3', value: 30 },
      { category: 'Category 4', value: 40 },
    ];

    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: data.map(row => row.category),
        datasets: [
          {
            label: 'Categories',
            data: data.map(row => row.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }
  
  createChartLine(){
    const data = [
      { month: 'Enero', value: 30 },
      { month: 'Febrero', value: 20 },
      { month: 'Marzo', value: 50 },
      { month: 'Abril', value: 40 },
      { month: 'Mayo', value: 70 },
      { month: 'Junio', value: 60 },
    ];

    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: data.map(row => row.month),
        datasets: [
          {
            label: 'Valores Mensuales',
            data: data.map(row => row.value),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            },
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }

}
