import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { enumCustomerServiceQuality } from 'src/app/enums/customerServiceQuality';
import { enumFoodTemperature } from 'src/app/enums/foodTemperature';
import { enumLikedAspects } from 'src/app/enums/likedAspects';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent {
  @ViewChild('acquisitionsChart', { static: true })
  acquisitionsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart', { static: true })
  lineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('polarAreaChart', { static: true })
  polarAreaChart!: ElementRef<HTMLCanvasElement>;
  public surveys: Array<any> = [];

  constructor(private firebase: DataBaseService) {
    this.firebase
      .getObservable(enumCollectionNames.Surveys)
      .subscribe((encuestas) => {
        this.surveys = [];
        this.surveys = encuestas;
        this.createCharts();
      });
  }

  createCharts() {
    this.createCustomerServiceChart();
    this.createFoodTemperatureChart();
    this.createMostLikedAspectsChart();
    this.createOverallQualityChart();
  }

  createCustomerServiceChart() {
    const colors = this.generateRandomColors(this.surveys.length);
    const data = {
      labels: Object.values(enumCustomerServiceQuality),
      datasets: [
        {
          label: 'Calidad del servicio al cliente',
          data: this.surveys.map((survey) => survey.customerService),
          backgroundColor: colors,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    new Chart(this.acquisitionsChart.nativeElement, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }

  createFoodTemperatureChart() {
    const colors = this.generateRandomColors(this.surveys.length);
    const data = {
      labels: Object.values(enumFoodTemperature),
      datasets: [
        {
          label: 'Temperatura de los alimentos',
          data: this.surveys.map((survey) => survey.foodTemperature),
          backgroundColor: colors,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }

  createMostLikedAspectsChart() {
    const colors = this.generateRandomColors(this.surveys.length);
    const aspectCounts = Object.values(enumLikedAspects).reduce(
      (counts: any, aspect) => {
        counts[aspect] = 0;
        return counts;
      },
      {}
    );

    this.surveys.forEach((survey) => {
      survey.mostLikedAspects.forEach((aspect: any) => {
        aspectCounts[aspect]++;
      });
    });

    const data = {
      labels: Object.keys(aspectCounts),
      datasets: [
        {
          label: 'Aspectos más gustados',
          data: Object.values(aspectCounts),
          backgroundColor: colors,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }

  createOverallQualityChart() {
    const colors = this.generateRandomColors(this.surveys.length);

    const data = {
      labels: this.surveys.map((_, index) => `Survey ${index + 1}`),
      datasets: [
        {
          label: 'Calidad general',
          data: this.surveys.map((survey) => survey.overallQuality),
          backgroundColor: colors,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ],
    };

    new Chart(this.polarAreaChart.nativeElement, {
      type: 'polarArea',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }
  generateRandomColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      colors.push(`rgb(${red}, ${green}, ${blue})`);
    }
    return colors;
  }
}
