import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy{

  public newItem: number;
  private subPanierNewItem : Subscription

  constructor(
    private panierSrv : PanierService
  ) {}
  ngOnDestroy(): void {
    this.subPanierNewItem.unsubscribe();
  }

  ngOnInit(){
    this.newItem = this.panierSrv.getNewItem();
    this.subPanierNewItem = this.panierSrv.newItem.subscribe(d => this.newItem=d);
  }



}
