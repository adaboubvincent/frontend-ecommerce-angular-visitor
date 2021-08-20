import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/Produit';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from '../models/Categorie';
import { Fournisseur } from '../models/Fournisseur';
import { CategoryService } from '../services/category/category.service';
import { ImageService } from '../services/image/image.service';
import { FournisseurUser } from '../models/FournisseurUser';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';

import { Image } from '../models/Image';
import { ProduitImage } from '../models/ProduitImage';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-fornisseur-list-produit',
  templateUrl: './fornisseur-list-produit.component.html',
  styleUrls: ['./fornisseur-list-produit.component.css']
})
export class FornisseurListProduitComponent implements OnInit {

  produits: ProduitImage[] = [];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, 
    private fournisseurUserService: FournisseurUserService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.fournisseurUserService.getProduitFournisseurUser().subscribe((pds: Produit[]) => {
      this.produits = pds;
      for(let i = 0; i < this.produits.length; i++){
        this.imageService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
          this.produits[i].image = res;
          this.produits[i].categorie = 	this.produits[i].categories?.find((item, index) => index === 0) ||  new Categorie();
        })
      }
     

    });
  }

}
