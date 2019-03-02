import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  places:any[];
  cachedplaces:any=[];
  reports:any=[];
  constructor(private placesSvc:PlacesService) { }
  async ngOnInit(){
    try{
    this.places= await this.placesSvc.loadPlaces();
    this.cachedplaces=this.places
    this.cachedplaces.forEach(element => {
      if(element)
      {
      if(element.reports)
      {
        console.log(element.reports)
      element.reports.forEach(e=>{
        console.log(e)
      })
      }
    }
      
    });
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
