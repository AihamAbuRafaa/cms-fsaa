import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: any[] = [];
  constructor(private db: AngularFireDatabase,
    private dbstor: AngularFirestore) {
  }

  getPlaces() {
    return new Promise((resolve, reject) => {
      this.db.list('cards').snapshotChanges(['child_changed']).subscribe(data => {
        let actions = data;
        actions.forEach(action => {
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
        firebase.storage().ref('image228').getDownloadURL().then(url => {
         p.place.image = url;
     })
   })
      console.log(this.places)

    } catch (err) {
      console.log(err)
    }
  }

  async  init() {
    await this.getPlaces();
    await this.getImages();
  }
  async updatePlace() {

  }

  loadPlaces() {
    this.places = this.places.filter(i => i.place.isApproved == false);
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
