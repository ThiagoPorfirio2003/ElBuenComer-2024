import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { enumCollectionNames } from 'src/app/enums/collectionNames';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent {
  
  @ViewChild('barChart', { static: true })
  barChart!: ElementRef<HTMLCanvasElement>;
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
    const colors = this.generateRandomColors(5);
    const labels = ["Muy mala", "Mala", "Decente", "Buena", "Muy buena"];
    const counts = [0, 0, 0, 0, 0];
    
    this.surveys.forEach(survey => {
      counts[survey.customerService]++;
    });

    const filteredLabels = labels.filter((_, index) => counts[index] > 0);
    const filteredCounts = counts.filter(count => count > 0);

    const data = {
      labels: filteredLabels,
      datasets: [
        {
          data: filteredCounts,
          backgroundColor: colors,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    new Chart(this.barChart.nativeElement, {
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
            display:false,
          },
        },
      },
    });
  }

  createFoodTemperatureChart() {
    const colors = this.generateRandomColors(3);
    const labels = ["Frío", "Correcto", "Caliente"];
    const counts = [0, 0, 0];
    
    this.surveys.forEach(survey => {
      counts[survey.foodTemperature]++;
    });

    const filteredLabels = labels.filter((_, index) => counts[index] > 0);
    const filteredCounts = counts.filter(count => count > 0);

    const data = {
      labels: filteredLabels,
      datasets: [
        {
          data: filteredCounts,
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
    const labels: string[] = [];
    const counts: number[] = [];
    
    this.surveys.forEach((survey, index) => {
      labels.push((index + 1).toString());
      counts.push(survey.overallQuality);
    });

    const data = {
      labels: labels,
      datasets: [
        {
          data: counts,
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
            display:false,
          },
        },
      },
    });
  }

  createMostLikedAspectsChart() {
    const colors = this.generateRandomColors(5);
    const labels = ["Tiempo de espera para la comida", "Tiempo de espera para obtener la tabla", "Calidad de la comida", "Decoración", "Música"];
    const counts = [0, 0, 0, 0, 0];
    
    this.surveys.forEach(survey => {
      survey.mostLikedAspects.forEach((item:any) => {
        counts[item]++;
      });
    });

    const filteredLabels = labels.filter((_, index) => counts[index] > 0);
    const filteredCounts = counts.filter(count => count > 0);
    
    const data = {
      labels: filteredLabels,
      datasets: [
        {
          data: filteredCounts,
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
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          r: {
            pointLabels: {
              display: false, 
            },
            ticks: {
              display: false, 
            },
          },
        }
      }
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
