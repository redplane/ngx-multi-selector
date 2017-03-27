import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'ng2-multi-selector',
  exportAs: 'ng2-multi-selector',
  templateUrl: 'ng2-multi-selector.component.html',
  styles: ['ng2-multi-selector.component.css']
})

export class Ng2MultiSelectorComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    // Only catch the key up event of search text box if it is supported.
    if (this.isSearchBoxAvailable) {
      // Catch key up event of search box.
      const inputStream = Observable.fromEvent(this.txtSearch.nativeElement, 'keyup')
        .map(() => this.keyword.trim())
        .debounceTime(400)
        .distinctUntilChanged();
      inputStream.subscribe(x => this.search.emit(x));
    }
  }

  // Inject search box into component.
  @ViewChild("txtSearch") txtSearch: ElementRef;

  // Search key word.
  private keyword: string;

  // Property in item which should be display on search box.
  @Input('display-property')
  private displayProperty: string;

  // List of item which should be displayed on drop-down menu.
  @Input('items')
  private items: Array<any>;

  @Input('is-clear-button-available')
  private isClearButtonAvailable: boolean;

  @Input('is-search-box-available')
  private isSearchBoxAvailable: boolean;

  @Input('limit-items-number')
  private limitItemsNumber: number;

  @Input('placeholder-search-drop-down')
  private placeholderSearchDropDown: string;

  @Input('separation-character')
  private szSeparationCharacter: string;

  // Event emitter which is emitted when data should be submitted to server.
  @Output('search-items')
  private search: EventEmitter<string>;

  // Item which have been chosen.
  private chosenItems: Array<any>;

  // Initiate components with injectors (as available)
  public constructor() {
    this.chosenItems = new Array<any>();
    this.search = new EventEmitter<string>();
  }

  // This callback is fired when component has been initiated to server successfully.
  ngOnInit(): void {


  }

  // Check whether item has been chosen or not.
  private isChosen(item: any): boolean {

    // Items list is empty.
    if (this.chosenItems == null || this.chosenItems.length < 1)
      return false;

    return (this.chosenItems.indexOf(item) != -1)
  }

  // Get title which is used for being displayed on search box.
  private getChosenItemsTitle(): string {
    if (this.chosenItems == null || this.chosenItems.length < 1)
      return "";

    return this.chosenItems.map(x => {
      return x[this.displayProperty]
    }).join(',').slice(0, 255);
  }

  // Clear chosen items list.
  private clearChosenItems(): void {

    // Clear button is not supported.
    if (!this.isClearButtonAvailable)
      return;

    // Initiate new array.
    this.chosenItems = new Array<any>();
  }

  // Select an item in list.
  private selectItem(item: any): void {
    // Find item index in array.
    let itemIndex = this.chosenItems.indexOf(item);

    // Item hasn't been chosen.
    if (itemIndex == null || itemIndex < 0) {
      // Maximum selected item exceeded.
      if (this.chosenItems.length >= this.limitItemsNumber)
        return;

      this.chosenItems.push(item);
      return;
    }
    // Remove item from list.
    this.chosenItems.splice(itemIndex, 1);
  }

  // Get chosen item list.
  public getChosenItems(): Array<any> {
    return this.chosenItems;
  }
}
