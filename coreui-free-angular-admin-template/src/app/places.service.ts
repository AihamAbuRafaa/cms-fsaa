import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: any[] = [];
  constructor(private db: AngularFireDatabase,
    private dbstor: AngularFirestore) {
  }

  async getPlaces() {
    await this.db.list('cards').snapshotChanges(['child_changed'])
      .subscribe(actions => {
        actions.forEach(action => {
          this.places.push(action.payload.val());
        });
      });
    this.places=this.places.filter(i=>i.place.isApproved==false);
  }

  async getImages() {
    try {
      console.log(this.places)
      await this.places.forEach(p => {
        const st = p.place.imageUrl
        console.log(p.place.imageUrl)
        firebase.storage().ref('image228').getDownloadURL().then(url => {
          p.image = url;
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  async  init(){
    try{
    await this.getPlaces();
    await this.getImages();
  }catch(err)
  {
    console.log(err)
  }
  }
  async updatePlace() {

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
