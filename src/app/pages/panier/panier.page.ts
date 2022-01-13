import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IArticlePanier } from 'src/app/models/iarticle-panier';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit, ViewDidEnter, OnDestroy {

  public listPanier : IArticlePanier[];
  public price : number;
  public subPanierPrice : Subscription;
  constructor(
    private panierSrv : PanierService
  ) { }

  ngOnDestroy(): void {
    this.subPanierPrice.unsubscribe();
  }

  ionViewDidEnter(): void {
    this.panierSrv.resetNewItem();
  }
  
  ngOnInit() {
    this.listPanier = this.panierSrv.get();
    this.price = this.panierSrv.getPrice();
    this.subPanierPrice = this.panierSrv.price.subscribe(d => this.price = d);
  }

  public substractOne(id, qty){
    this.panierSrv.removeQuantity(id, qty);
    this.listPanier = this.panierSrv.get();
  }

  public plusOne(id, qty){
    this.panierSrv.addQuantity(id, qty);
    this.listPanier = this.panierSrv.get();
  }
}
