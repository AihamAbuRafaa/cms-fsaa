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
  cachedplaces:any=[];
  constructor(private placesSvc:PlacesService)
  {    
   }
  async ngOnInit(){
    try{
    this.places= await this.placesSvc.loadPlaces();
    this.cachedplaces=this.places
    // this.places.forEach(i=>{
    //   let a:any=i;
    //   console.log(a )
    //   if(a.place.isApproved==false)
    //   {
    //     this.cachedplaces.push(i);
    //   }
    // })
    console.log(this.places)
    }catch(err)
    {
      console.log(err)
    }
  }
  deleteCard(i){
    this.placesSvc.deletePlace(i)
    this.cachedplaces=this.placesSvc.loadPlaces();
    window.location.reload();
  }
  okayCard(i){
    this.placesSvc.updatePlace(i)
    this.cachedplaces=this.placesSvc.loadPlaces();
    window.location.reload();
  }
}


