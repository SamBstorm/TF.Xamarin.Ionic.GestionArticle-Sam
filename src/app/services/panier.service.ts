import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from '../models/iarticle';
import { IArticlePanier } from '../models/iarticle-panier';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _panier : IArticlePanier[] = [];
  private _newItem : number = 0;
  public newItem : BehaviorSubject<number> = new BehaviorSubject(0);
  public price: BehaviorSubject<number> = new BehaviorSubject(this.getPrice());

  constructor(
    private articleSrv : ArticleService
  ) { }

  public get():IArticlePanier[]{
    return this._panier;
  }

  public getById(id: number):IArticlePanier{
    return this._panier[this._panier.findIndex(a => a.article.id === id)];
  }

  public delete(id: number){
    this._panier.splice(this._panier.findIndex(a => a.article.id === id), 1);
  }

  public addArticle(id: number, qty: number){
    if (qty < 1) throw new Error("Quantité non recevable");
    const article = this.articleSrv.getById(id);
    const index = this._panier.findIndex(a => a.article.id == article.id)
    if(index < 0) this._panier.push({
      article : article,
      quantity : qty
    });
    else{
      this.addQuantity(id, qty);
    }
    this._newItem += qty;
    this.newItem.next(this._newItem);
    this.price.next(this.getPrice());
  }

  public addQuantity(id: number, qty:number){    
    if (qty < 1) throw new Error("Quantité non recevable");
    const index=this._panier.findIndex(a=> a.article.id == id);
    this._panier[index].quantity += qty;
    this.price.next(this.getPrice());
  }

  public removeQuantity(id: number, qty:number){
    if (qty < 1) throw new Error("Quantité non recevable");
    const index=this._panier.findIndex(a=> a.article.id == id);
    this._panier[index].quantity -= qty;
    if(this._panier[index].quantity <= 0) this.delete(id);
    this.price.next(this.getPrice());
  }

  public resetNewItem(){
    this._newItem = 0;
    this.newItem.next(this._newItem);
  }

  public getNewItem(): number{
    return this._newItem;
  }
  public getPrice():number{
    let price = 0
    this._panier.forEach(a => {
      price += (a.article.price * a.quantity)
    });
    return price;
  }
}
