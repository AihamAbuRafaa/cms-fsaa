import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { PlacesService, places } from '../../places.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styles : ['agm-map {height: 250px;}.card{height:1000px;}']
})
export class DashboardComponent implements OnInit {
  places:places[];
  constructor(private placesSvc:PlacesService)
  {    
   }
  async ngOnInit(){
    await this.placesSvc.init();
    this.places=this.placesSvc.loadPlaces();
    console.log(this.places)
  }
  deleteCard(i){
    console.log(i)
  }
  okayCard(i){
    console.log(i)
  }
}


