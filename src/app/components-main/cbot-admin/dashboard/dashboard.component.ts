import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label, ChartsModule } from 'ng2-charts';
import { trigger, state, transition, style, animate, stagger } from '@angular/animations';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export interface PeriodicElement {
  name: string;
  sno: number;
  billNo: string;
  mobile: string;
  billDate:string;
  totalAmount:string;
  source:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, name: 'Aadhi',mobile: '9632587412',billNo:'1725',billDate:'10/08/2019',totalAmount:'1,500.00',source:'Direct-walkin'},
  {sno: 2, name: 'Devi', mobile: '7946132541',billNo:'1825',billDate:'20/07/2019',totalAmount:'800.00',source:'Phone'},
  {sno: 3, name: 'Nivetha', mobile: '8293714612',billNo:'1828',billDate:'20/07/2019',totalAmount:'250.00',source:'Direct-walkin'},
  {sno: 4, name: 'Jeya', mobile: '7391827391',billNo:'1927',billDate:'20/07/2019',totalAmount:'4,500.00',source:'Direct-walkin'},
  {sno: 5, name: 'Latha', mobile: '9685741245',billNo:'1936',billDate:'20/07/2019',totalAmount:'650.00',source:'Phone'}
];

export interface topStaff {
  staffName: string;
  curMonth: string;
  lastMonth: string;
}

const STAFF_DATA: topStaff[] = [
  {staffName: 'Devi', curMonth: '7400',lastMonth: '8500'},
  {staffName: 'Jai', curMonth: '7000', lastMonth: '8000'},
  {staffName: 'Usha', curMonth: '6500', lastMonth: '7500'},
  {staffName: 'Ravi', curMonth: '6200', lastMonth: '6800'},
  {staffName: 'Raja', curMonth: '5700', lastMonth: '6300'}
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          // style({transform: 'translateY(100%)', opacity: 0}),
          style({transform: 'scale3d(0.3, 0.3, 0.3)', opacity: 0}),
          animate('2500ms ease-out', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(10%)', opacity: 1}),
          animate('2500ms ease-out', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ],
    ),
    trigger("zoom", [
      state("rightTop", style({transform: 'scale(0.5)', transformOrigin: 'right top', opacity: '0'})),
      state("rightBottom", style({transform: 'scale(0.3)', transformOrigin: 'right bottom', opacity: '0'})),
      state("leftTop", style({transform: 'scale(0.3)', transformOrigin: 'left top', opacity: '0'})),
      state("leftBottom", style({transform: 'scale(0.3)', transformOrigin: 'left bottom', opacity: '0'})),
      state("default", style({transform: 'scale(1)', opacity: '1'})),
      transition("* <=> default", animate( "2000ms cubic-bezier(0.25,1,.25,1)" ))
    ]),
    trigger("fadeInOut", [
      state("rightTop", style({ opacity: '1'})),
      state("default", style({opacity: '0'})),
      transition("* <=> default", animate( "2000ms cubic-bezier(0.25,1,.25,1)" ))
    ])
  ],
})
export class DashboardComponent implements OnInit {  
  displayedColumns: string[] = ['billNo','billDate', 'name', 'mobile','totalAmount'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedStaffColumns: string[] = ['staffName','curMonth', 'lastMonth'];
  dataSourceStaff = new MatTableDataSource(STAFF_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  billDetail: any;
  origin = "default";
  calString:string;
  details: boolean = false;
  contentDiv: boolean = true;
  showPatient: boolean = false;
  public lineChartData: ChartDataSets[] = [
    // { data: [20000, 30000, 55000, 43000, 80000, 62000, 80000, 60000, 75000, 65000, 58000, 72000, 79000, 85000], label: 'Facebook' }
   
    //{ data: [1000, 1700, 2600, 3500, 3200, 5000, 7500,1000, 1700, 2600, 3500, 3200, 5000, 7500], label: 'Last Year' }
    { data: [5, 12, 6, 18, 24, 13, 39, 18, 59, 20, 58, 62], label: 'Facebook', borderColor:'#3B5998', backgroundColor:'#E8F0D3' },
    // { data: [8, 11, 30, 14, 43, 21, 47, 52, 55, 34, 50, 72], label: 'Instagram', borderColor:'#F86C6B' },
    { data: [12, 28, 17, 33, 54, 45, 36, 48, 51, 60, 34, 67], label: 'Twitter', borderColor:'#00ACED' },
  ];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
     // display: false,
      labels: {
        fontColor: '#222222'
    }
  },
  plugins:{     
    datalabels: {
      color: 'transparent',
      labels: {
         
      }
  },
},
  scales: {
    xAxes: [{
        barPercentage: 0.2,
        gridLines: {
          //color: 'rgba(255,255,255,1)',
         // lineWidth: 0,
          display: false,
        }
    },      
  ],
  yAxes: [{
    gridLines: {
     // lineWidth: 0,
      //color:'rgba(255,255,255,1)',
      drawBorder: false,
    },
  //   ticks: {
  //     display: false,
  // }
},
]
}
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      //backgroundColor: 'rgba(53,64,82,0.5)',
      //backgroundColor: '#fff'
      
    },
  ];
  
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public barStockChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top', 
     labels: {
      fontColor: '#222222'
  }
  },
  plugins:{     
    datalabels: {
      color: 'transparent',
      labels: {
         
      }
  },
},
    scales: {
      xAxes: [{
          barPercentage: 0.7,
          gridLines: {
            lineWidth: 0,
          }
      },      
    ],
    yAxes: [{
      gridLines: {
      },
  },
]
  }
  };
  public barStockChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];
  public barStockChartType = 'bar';
  public barStockChartLegend = true;
  public barStockChartPlugins = [];

    public barStockChartData: ChartDataSets[] = [
      { data: [650, 590, 800, 810, 560, 552, 400, 500, 300, 250, 455, 560], label: 'Last Year', stack: 'a', backgroundColor:'#70B922', hoverBackgroundColor:'#56990f' },
      { data: [280, 480, 300, 390, 860, 358, 900, 670, 720, 700, 830, 560], label: 'This Year', stack: 'a', backgroundColor:'#D6D6D6', hoverBackgroundColor:'#2e2d2d' }
    ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top', 
     // display: false
     labels: {
      fontColor: '#222222'
  }
  },
  plugins:{     
    datalabels: {
      color: 'transparent',
      labels: {
         
      }
  },
},
  // animation: {
  //   onComplete: function () {
  //     var ctx = this.chart.ctx;
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     var chart = this;
  //     var datasets = this.config.data.datasets;

  //     datasets.forEach(function (dataset: Array<any>, i: number) {
  //       ctx.font = "10px Arial";


  //       ctx.fillStyle = "Black";
  //       chart.getDatasetMeta(i).data.forEach(function (p: any, j: any) {
  //         ctx.fillText(datasets[i].data[j], p._model.x, p._model.y - 20);
  //       });

  //     });
  //   }
  // },
    scales: {
      xAxes: [{
          barPercentage: 1,
          gridLines: {
          //  color: 'rgba(171,171,171,1)',
            lineWidth: 0,
        //    display:false,
          }
      },      
    ],
    yAxes: [{
      gridLines: {
       // lineWidth: 0,
       // color:'rgba(255,255,255,1)',
      //  drawBorder: false,
     //   display: false
      },
    //   ticks: {
    //     display: false //this will remove only the label
    // }
  },
]
  }
  };
  // public barChartLabels: Label[] = ['08:00AM','09:00AM','10:00AM','11:00AM', '12:00PM', '01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM','06:00PM','07:00PM','08:00PM'];
  // public barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    { data: [35000, 69000, 36500, 60000, 50000, 50000, 30000,50000,42000,60000,37000,30005], label: 'Last Year', backgroundColor:'#D7F0FF' },
    { data: [45000, 72000, 35000, 93000, 71000, 89000, 49000, 56000,70200,78000,31000,40500], label: 'This Year', backgroundColor:'#2C80BF' }
  ];
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#D7F0FF',
    },
  ];
  
  // public barChartData: ChartDataSets[] = [
  //   { data: [160000, 170000, 180000, 185000, 200000, 210000, 220000], label: ''},
    
  // ];
  public barTopChartData: ChartDataSets[] = [
    { data: [35000, 69000, 22500, 50000, 50000, 30000,80000,70000,60000,20000,30005], label: 'Last Year' },
    { data: [45000, 82000, 3500, 71000, 89000, 49000, 91000,80200,86000,30000,40500], label: 'This Year' }
  ];
  // top bar chart
  public barTopChartLabels: Label[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  public barTopChartType = 'bar';
  public barTopChartLegend = true;
  public barTopChartPlugins = [];
  public barTopChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#222',
    },
  ];
  public barTopChartOptions: ChartOptions = {
    responsive: true,
    legend: {
     display: false,
     labels: {
      fontColor: '#222222'
  }
  },
 
  animation: {
    onComplete: function () {
      var ctx = this.chart.ctx;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var chart = this;
      var datasets = this.config.data.datasets;

      datasets.forEach(function (dataset: Array<any>, i: number) {
        ctx.font = "10px Arial";


        ctx.fillStyle = "Black";
        chart.getDatasetMeta(i).data.forEach(function (p: any, j: any) {
          ctx.fillText(datasets[i].data[j], p._model.x, p._model.y - 20);
        });

      });
    }
  },
  scales: {
    xAxes: [{
        barPercentage: 0.4,
        gridLines: {
        //  color: 'rgba(171,171,171,1)',
         // lineWidth: 0,
      //    display:false,
        }
    },      
  ],
  yAxes: [{
    gridLines: {
      lineWidth: 0,
     // color:'rgba(255,255,255,1)',
    //  drawBorder: false,
      display: false
    },
    ticks: {
      display: false //this will remove only the label
  }
},
]
}
//     scales: {
//       xAxes: [{
//           barPercentage: 2,
//           gridLines: {
//             lineWidth: 0,
//             display:false,
//           }
//       },      
//     ],
//     yAxes: [{
//       gridLines: {
//         lineWidth: 0,
//        // color:'rgba(255,255,255,1)',
//          drawBorder: false,
//         // display: false
//       },
//       ticks: {
//         display: false //this will remove only the label
//     }
//   },
// ]
//   }
  };
  // public barChartData: ChartDataSets[] = [
  //   { data: [160000, 170000, 180000, 185000, 200000, 210000, 220000], label: ''},
    
  // ];
 
  public pieChartLabels:string[] = ['2014', '2015', '2016', '2017', '2018','2019'];  
  //public pieChartData:number[] = [50000, 60000, 90000, 80000, 85000, 98000];
  public pieChartData: ChartDataSets[] = [
    { data: [50000, 60000, 90000, 80000, 85000, 98000], label: 'Last Year' },
  ];
  public pieChartType:string = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['#04B9FF','#C13018','#F36D12','#B0CB71','#FFDF3C','#0EA2CE'],    
    }
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      reverse: true,
      position: 'bottom',
      labels: {
        fontFamily: "Roboto",
        boxWidth: 15,
        fontColor:"#000",
      },
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data[tooltipItem[0]['index']];
        },     
      },
      backgroundColor: '#FFF',
      titleFontSize: 16,
      titleFontColor: '#0066ff',
      bodyFontColor: '#000',
      bodyFontSize: 14,
      displayColors: false,     
      
    },
   
   // rotation: -0.5
  };
  public pieChartLegend = true;


  //Country Revenue Pie Chart
  public pieRevenueChartLabels:string[] = ['Chennai', 'Coimbatore', 'Erode', 'Trichy', 'Salem','Karur'];  
  public pieRevenueChartData:number[] = [50000, 60000, 90000, 80000, 85000, 98000];
  public pieRevenueChartType:string = 'pie';
  public pieRevenueChartColors: Color[] = [
    {
      backgroundColor: ['#04B9FF','#B0CB71','#eb5256','#70B922','#FFDF3C','#F36D12'],   
      // hoverBackgroundColor: ['#00c3ff', '#ff6600', '#FFC870', '#A8B3C5', '#616774', '#FF5A5E'], 
      pointRadius:0,
      // hoverBorderWidth:5,
      // hoverBorderColor:"#ccc",
       borderColor:"transparent",
       borderWidth:0
      // pointRadius: 2,
      // pointHoverRadius: 15,
      // pointHoverBackgroundColor: 'black'
    },
    
  ];
  public pieChartPlugins = [pluginDataLabels];
  public pieRevenueChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: 
    { 
        point: 
        {
            radius: 0,
            hitRadius: 0,            
            hoverRadius: 0,
            hoverBorderWidth: 0,
            
        }
    },
    legend: {
      reverse: true,
      position: 'bottom',
      labels: {
        fontFamily: "Roboto",
        boxWidth: 15,
        fontColor:"#000",
      },

    },  
    plugins:{
     animationEnabled: true,   
     easing:'easeOutBounce',  
     innerRadius: 0,
     outerRadius: 0,
    //  hoverRadius:20,
    //  hitRadius:10,
    //  pointHoverRadius:30,
    //  pointRadius:20,
      datalabels: {        
        color:'black',
        labels: {
            title: {
                font: {
                    weight: 'normal',
                    size:10,
                }
            },
            value: {
                color: 'black',
                font: {
                  size:10
                }
            }
        }
    },
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    },   
},  
     
    animation: {
      duration: 500,
      easing: "linear",
      animateScale: true,
      animateRotate: true,      
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data[tooltipItem[0]['index']];
        },         
      },
      // backgroundColor: '#FFF',
      titleFontSize: 12,
      titleFontColor: '#fff',
      bodyFontColor: '#fff',
      bodyFontSize: 12,
      displayColors: false,           
    },    
  };
  public pieRevenueChartLegend = true;
  // events
  public chartClicked(e:any):void {
    console.log(e);
    e[0]['_model'].innerRadius = e[0]['_model'].innerRadius + '10px';    
    e[0]['_model'].outerRadius = e[0]['_model'].outerRadius + '10px';

  }
 public chartRevenueHovered(e:any):void {
   
    console.log(e.active[0]);
    e.active[0]['_model'].outerRadius += 0.8;
    setTimeout(()=>{
      e.active[0]['_model'].outerRadius -= 0.8;
  },500);
    e.active[0]['_model'].duration = 500;
    // e.active[0]['_model'].innerRadius += 1;
 }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceStaff.sort = this.sort;
    this.billDetail = this.dataSource;
  }
  selectNew() { 
   this.calString = "List";      
  }
  showDetails() {
    this.contentDiv = false;
    this.details = true;
    setTimeout(() => {
      this.origin = "default";
    });
  }
  hideDetails() {
    this.contentDiv = true;
    this.details = false;
  }
}
