import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: any[] = [];
  keys :any[]=[];
  constructor(private db: AngularFireDatabase,
    private dbstor: AngularFirestore) {
  }

  getPlaces() {
    return new Promise((resolve, reject) => {
      this.db.list('cards').snapshotChanges(['child_changed']).subscribe(data => {
        let actions = data;
        actions.forEach(action => {
          this.keys.push(action.key)
          this.places.push(action.payload.val());
        });
        resolve(this.places);
      });
    })
  }

  async getImages() {
    try {
      this.places = this.places.filter(i => i.place.isApproved == false);
      console.log(this.places)
      /*
      await Promise.all(this.places.map(async p => {
        let i =await firebase.storage().ref(p.place.imageUrl).getDownloadURL().then(url => {
          p.image = url;
      });
      }))*/
      this.places.map(p=>{
        let pa:any=p.place;
        if(pa.imageUrl)
        {
        firebase.storage().ref(pa.imageUrl).getDownloadURL().then(url => {
         p.place.image = url;
     })
    }
   })

    } catch (err) {
      console.log(err)
    }
  }

  async  init() {
    await this.getPlaces();
    await this.getImages();
  }
  async updatePlace(i) {
    return new Promise((resolve,reject)=>{
      firebase.database().ref('cards').child(this.keys[i]).child("place").update({
        
        isApproved:true
      });
      this.places.splice(i,1);
      resolve(this.places)
     })
  }

  async deletePlace(i){
    return new Promise((resolve,reject)=>{
      console.log(i)
      firebase.database().ref('cards').child(this.keys[i]).remove();
      let a:any=this.places[i].place.imageUrl
      firebase.storage().ref(a).delete()
      this.places.splice(i,1);
      resolve(this.places)
     })
  }

  loadPlaces() {

    return this.places;
  }
}

export interface places {
  description: string
  image: string
  imageUrl: string
  isApproved: boolean
  location: {
    lat: number
    lng: number
  }
  title: string
}
