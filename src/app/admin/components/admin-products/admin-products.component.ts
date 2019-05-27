import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  subscription: Subscription;
  displayedColumns = ['title', 'price', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.dataSource.data = this.products = products;
    });
    this.dataSource.sortingDataAccessor = (item: AngularFireAction<DatabaseSnapshot<Product>>, property) => {
      return item.payload.val()[property];
    };
   }

   filter(query: string) {
    this.dataSource.data = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
