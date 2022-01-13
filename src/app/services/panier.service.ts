import { Injectable } from '@angular/core';
import { IArticle } from '../models/iarticle';
import { IArticlePanier } from '../models/iarticle-panier';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _panier : IArticlePanier[] = [];
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
  }

  public addQuantity(id: number, qty:number){    
    if (qty < 1) throw new Error("Quantité non recevable");
    this.getById(id).quantity += qty;
  }

  public removeQuantity(id: number, qty:number){
    if (qty < 1) throw new Error("Quantité non recevable");
    this.getById(id).quantity -= qty;
    if(this.getById(id).quantity <= 0) this.delete(id);
  }
}
