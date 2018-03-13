import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef, TemplateRef, forwardRef
} from '@angular/core';
import {Observable} from 'rxjs/Rx'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-multi-selector',
  exportAs: 'ngx-multi-selector',
  templateUrl: 'ngx-multi-selector.component.html',
  styleUrls: ['ngx-multi-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxMultiSelectorComponent),
      multi: true
    }
  ]
})

export class NgxMultiSelectorComponent implements AfterViewInit, ControlValueAccessor {

  //#region Methods

  /*
  * This callback is fired when view has been initiated.
  * */
  public ngAfterViewInit(): void {

    // Only catch the key up event of search text box if it is supported.
    if (this.bSearchBoxAvailable) {
      // Catch key up event of search box.
      Observable.fromEvent(this.txtSearch.nativeElement, 'keyup')
        .map((x: KeyboardEvent) => {
          return x.key;
        })
        .filter((x: string) => {
          return (x != null && x.length > 0 && x != ' ');
        })
        .debounceTime(this.interval)
        .distinctUntilChanged()
        .subscribe(() => {
            // Clear previous search results.
            this.items = new Array<any>();

            // Emit the search event to outer element.
            this.search.emit(this.txtSearch.nativeElement.value)
          }
        );
    }
  }

  /*
  * Check whether item has been chosen or not.
  * */
  public getItemChosen(item: any): boolean {
    return this.getChosenItemIndex(item) != -1;
  }

  /*
  * Find chosen item index in array.
  * */
  public getChosenItemIndex(item: any): number {
    // Items list is empty.
    if (this.chosenItems == null || this.chosenItems.length < 1) {
      return -1;
    }

    const results = this.chosenItems.filter((x: any) => {
      return x[this.key] == item[this.key]
    });

    if (results == null || results.length < 1) {
      return -1;
    }

    const result = results[0];
    return this.chosenItems.indexOf(result);
  }

  /*
  * Get title which is used for being displayed on search box.
  * */
  public getChosenItemsTitle(): string {
    if (this.chosenItems == null || this.chosenItems.length < 1) {
      return '';
    }

    // Find separation character.
    let separation = this.szSeparationCharacter;
    if (separation == null || separation.length < 1) {
      separation = ',';
    }
    return this.chosenItems.map(x => {
      return x[this.displayProperty]
    }).join(separation).slice(0, 255);
  }

  /*
  * Clear chosen items list.
  * */
  public clearChosenItems(): void {

    // Initiate new array.
    this.chosenItems = new Array<any>();
    this.onChangeCallback(this.chosenItems);
  }

  /*
  * Select an item in list.
  * */
  public clickSelectItem(item: any): void {
    // Find item index in array.
    const itemIndex = this.getChosenItemIndex(item);

    // Item hasn't been chosen.
    if (itemIndex == null || itemIndex < 0) {
      // Maximum selected item exceeded.
      if (this.limitItemSelection != null && this.chosenItems.length >= this.limitItemSelection) {
        return;
      }

      this.chosenItems.push(item);
      // this.changeDetectorRef.detectChanges();

      return;
    }
    // Remove item from list.
    this.chosenItems.splice(itemIndex, 1);
    // this.changeDetectorRef.detectChanges();
  }

  /*
  * Close drop-down menu.
  * */
  public close(): void {
    // Drop-down menu is invalid.
    if (this.multiSelectorDropDown == null) {
      return;
    }

    // Find drop-down native element.
    const nativeElement = this.multiSelectorDropDown.nativeElement;
    if (nativeElement == null) {
      return;
    }

    // Remove class .open from classes list.
    nativeElement.classList.remove('open');
  }

  /*
  * Open drop-down menu.
  * */
  public open(): void {

    // Component has been disabled.
    if (this.bDisabled) {
      return;
    }

    // Drop-down menu is invalid.
    if (this.multiSelectorDropDown == null) {
      return;
    }

    // Find drop-down native element.
    const nativeElement = this.multiSelectorDropDown.nativeElement;
    if (nativeElement == null) {
      return;
    }

    // Remove class .open from classes list.
    this.multiSelectorDropDown.nativeElement.classList.add('open');
  }

  /*
  * Callback which is fired when component receives information from external source.
  * */
  public writeValue(obj: any): void {
    if (this.chosenItems != obj) {
      this.chosenItems = obj;
    }
  }

  /*
  * Callback which is fired when on-change register has been initiated.
  * */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /*
  * Callback which is fired when on-touch register has been initiated.
  * */
  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  //#endregion

  //#region Properties

  // Inject search box into component.
  @ViewChild('txtSearch')
  private txtSearch: ElementRef;

  // Key which is for recognizing whether item is in the chosen list or not.
  @Input('key')
  private key: string;

  // Property in item which should be display on search box.
  @Input('display-property')
  private displayProperty: string;

  // List of item which should be displayed on drop-down menu.
  @Input('items')
  public items: Array<any>;

  // Whether clear button should be available or not.
  @Input('is-clear-button-available')
  private bClearButtonAvailable: boolean;

  // Whether search box should be available or not.
  @Input('is-search-box-available')
  private bSearchBoxAvailable: boolean;

  // How many items should be shown to be selected.
  @Input('limit-item-amount')
  private limitItemAmount: number;

  // How many items can be selected.
  @Input('limit-item-selection')
  private limitItemSelection: number;

  // Place holder of search box in drop-down list.
  @Input('placeholder-search-drop-down')
  private placeholderSearchDropDown: string;

  // Place holder of title.
  @Input('placeholder-title-drop-down')
  private placeholderTitleDropDown: string;

  // Character which is used for dividing searched items.
  @Input('separation-character')
  private szSeparationCharacter: string;

  // Whether component is disabled or not.
  @Input('disabled')
  private bDisabled: boolean;

  // How much time should component raise another one about its changes.
  @Input('interval')
  private interval: number;

  // Event emitter which is emitted when data should be submitted to server.
  @Output('search-items')
  private search: EventEmitter<string>;

  // Item which have been chosen.
  private chosenItems: Array<any>;

  // Custom item template.
  @Input('item-template')
  private itemTemplate: TemplateRef<any>;

  // Injector of multi-selector drop-down menu.
  @ViewChild('MultiSelectorDropDown')
  private multiSelectorDropDown: ElementRef;

  /*
  * Callback which should be fired to raise on-touch event.
  * */
  private onTouchedCallback: () => void = () => {};

  /*
  * Callback which should be fired to raise on-change event.
  * */
  private onChangeCallback: (_: any) => void = () => {};

  //#endregion

  //#region Constructor

  /*
  * Initiate components with injectors (as available)
  * */
  public constructor() {
    this.chosenItems = [];
    this.search = new EventEmitter<string>();
    this.items = [];

    // By default, items amount is limited to 10.
    this.limitItemAmount = 10;

    // By default, interval should be 400ms.
    this.interval = 400;
  }

  //#endregion

}
