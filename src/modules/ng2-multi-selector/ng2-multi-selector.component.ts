import {AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef} from "@angular/core";
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'ng2-multi-selector',
  exportAs: 'ng2-multi-selector',
  templateUrl: 'ng2-multi-selector.component.html',
  styles: ['ng2-multi-selector.component.css']
})

export class Ng2MultiSelectorComponent implements AfterViewInit {

  //#region Methods

  // This callback is fired when view has been initiated.
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

  // Check whether item has been chosen or not.
  private getItemChosen(item: any): boolean {
    if (this.getChosenItemIndex(item) != -1)
      return true;

    return false;
  }

  // Find chosen item index in array.
  private getChosenItemIndex(item: any): number{
    // Items list is empty.
    if (this.chosenItems == null || this.chosenItems.length < 1)
      return -1;

    let results = this.chosenItems.filter((x: any) => {
      return x[this.key] == item[this.key]
    });

    if (results == null || results.length < 1)
      return -1;

    let result = results[0];
    return this.chosenItems.indexOf(result);
  }

  // Get title which is used for being displayed on search box.
  private getChosenItemsTitle(): string {
    if (this.chosenItems == null || this.chosenItems.length < 1)
      return "";

    // Find separation character.
    let separation = this.szSeparationCharacter;
    if (separation == null || separation.length < 1)
      separation = ',';
    return this.chosenItems.map(x => {
      return x[this.displayProperty]
    }).join(separation).slice(0, 255);
  }

  // Clear chosen items list.
  private clearChosenItems(): void {

    // Clear button is not supported.
    if (!this.isClearButtonAvailable)
      return;

    // Initiate new array.
    this.chosenItems = new Array<any>();
    this.changeDetectorRef.detectChanges();
  }

  // Select an item in list.
  private clickSelectItem(item: any): void {
    // Find item index in array.
    let itemIndex = this.getChosenItemIndex(item);

    // Item hasn't been chosen.
    if (itemIndex == null || itemIndex < 0) {
      // Maximum selected item exceeded.
      if (this.chosenItems.length >= this.limitItemsNumber)
        return;

      this.chosenItems.push(item);
      this.updateItemEventEmitter.emit(this.chosenItems);
      this.changeDetectorRef.detectChanges();

      return;
    }
    // Remove item from list.
    this.chosenItems.splice(itemIndex, 1);
    this.updateItemEventEmitter.emit(this.chosenItems);
    this.changeDetectorRef.detectChanges();
  }

  // Get chosen item list.
  public getChosenItems(): Array<any> {
    return this.chosenItems;
  }

  //#endregion

  //#region Properties

  // Inject search box into component.
  @ViewChild("txtSearch") txtSearch: ElementRef;

  // Search key word.
  private keyword: string;

  // Key which is for recognizing whether item is in the chosen list or not.
  @Input("key")
  private key: string;

  // Property in item which should be display on search box.
  @Input('display-property')
  private displayProperty: string;

  // List of item which should be displayed on drop-down menu.
  @Input('items')
  public items: Array<any>;

  @Input('is-clear-button-available')
  private isClearButtonAvailable: boolean;

  @Input('is-search-box-available')
  private isSearchBoxAvailable: boolean;

  @Input('limit-items-number')
  private limitItemsNumber: number;

  @Input('placeholder-search-drop-down')
  private placeholderSearchDropDown: string;

  @Input('placeholder-title-drop-down')
  private placeholderTitleDropDown: string;

  @Input('separation-character')
  private szSeparationCharacter: string;

  // Event emitter which is emitted when data should be submitted to server.
  @Output('search-items')
  private search: EventEmitter<string>;

  // This event emitter is emitted when item in list is selected.
  @Output('update-items')
  private updateItemEventEmitter: EventEmitter<Array<any>>;

  // Item which have been chosen.
  private chosenItems: Array<any>;

  //#endregion

  //#region Constructor

  // Initiate components with injectors (as available)
  public constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.chosenItems = new Array<any>();
    this.search = new EventEmitter<string>();
    this.updateItemEventEmitter = new EventEmitter<Array<any>>();
    this.items = new Array<any>();
  }

  //#endregion
}
