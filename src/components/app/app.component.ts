import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Account";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

  private items: Array<Account>;
  private itemsSource: Array<Account>;

  public constructor(){
    this.items = new Array<Account>();
    this.itemsSource = new Array<Account>();
    for (let index = 0; index < 100; index++){
      let account = new Account();
      account.name = `This is account ${index}`;
      account.age = index;

      this.itemsSource.push(account);
    }
  }

  ngOnInit(): void {
    this.items = this.itemsSource.slice(0, 10);
  }

  public searchItem(keyword: string): void{

    this.getAccounts(keyword);
  }

  private getAccounts(name: string): void{
    this.items = this.itemsSource.filter(x => {
      if (x.name == null || x.name.length < 1) {
        console.log(x);
        return true;
      }
      return x.name.indexOf(name) != -1;
    })
      .splice(0, 10);
  }
}
