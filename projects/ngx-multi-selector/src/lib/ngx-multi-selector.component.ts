import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  TemplateRef, forwardRef, OnDestroy, OnInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AsyncSubject, BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators'

@Component({
  selector: 'ngx-multi-selector',
  exportAs: 'ngx-multi-selector',
  templateUrl: 'ngx-multi-selector.component.html',
  styleUrls: ['ngx-multi-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxMultiSelectorComponent),
      multi: true
    }
  ]
})

export class NgxMultiSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  //#region Properties

  /*
  * List of items which have been selected.
  * */
  private _selectedItems: Array<any>;

  /*
  * Character which is used for separating selected items.
  * Default: ,
  * */
  private _separationCharacter = ',';

  /*
  * Keyword which is for searching for available items.
  * Default: null.
  * */
  private _keyword: string;

  /*
  * List of items that originally set.
  * */
  private _originalItems: any[];

  /*
  * List of item which should be displayed on drop-down menu.
  * */
  private _availableItems: any[];

  /*
  * Maximum items that can be displayed in context menu.
  * */
  private _maximumContextItems = 0;

  /*
  * How many items can be selected.
  * */
  private _maximumSelectableItems = 0;

  /*
  * Handle for loading available items asynchronously.
  * */
  @Input('load-available-items-handler')
  public readonly loadAvailableItemsAsyncHandler: (keyword: string) => Observable<any[]>;

  /*
  * Emit a keyword for updating available items.
  * */
  private _updateAvailableItemsSubject: Subject<string>;

  /*
  * Subscription about control update management.
  * */
  private _updateAvailableItemsSubscription: Subscription;

  /*
  * Injector of multi-selector drop-down menu.
  * */
  @ViewChild('multiSelectorDropdownMenu', {static: false})
  private multiSelectorDropDown: ElementRef;

  /*
  * Key which is for recognizing whether item is in the chosen list or not.
  * */
  @Input('key')
  protected key: string;

  /*
  * Property in item which should be display on search box.
  * */
  @Input('display-property')
  protected displayProperty: string;

  /*
  * Whether clear button should be available or not.
  * */
  @Input('is-clear-button-available')
  private shouldClearButtonAvailable: boolean;

  /*
  * Whether search box should be available or not.
  * */
  @Input('is-search-box-available')
  private shouldSearchBoxAvailable: boolean;

  /*
  * Place holder of search box in drop-down list.
  * */
  @Input('placeholder-search-drop-down')
  private placeholderSearchDropDown: string;

  /*
  * Place holder of title.
  * */
  @Input('placeholder-title-drop-down')
  private placeholderTitleDropDown: string;

  /*
  *  Whether component is disabled or not.
  * */
  @Input('disabled')
  protected disabled: boolean;

  /*
  * Event emitter which is emitted when data should be submitted to server.
  * */
  @Output('search-items')
  public search: EventEmitter<string>;

  /*
  * Custom item template.
  * */
  @Input('item-template')
  public itemTemplate: TemplateRef<any>;

  /*
  * Callback which is for raising touched event from the current component.
  * */
  protected ngOnTouchedCallback: () => void;

  /*
  * Callback which is for raising model change event from the current component.
  * */
  protected ngOnChangeCallback: (_: any) => void;

  /*
  * How much time should component raise another one about its changes.
  * */
  private _loadItemsInterval = 150;

  //#endregion

  //#region Accessors

  /*
  * Keyword is used for searching for items.
  * */
  public get keyword(): string {
    return this._keyword;
  }

  /*
  * Keyword is used for searching for items.
  * */
  public set keyword(value: string) {
    this._keyword = value;

    this._updateAvailableItemsSubject
      .next(value);
  }

  /*
  * Character which is used for dividing searched items.
  * */
  @Input('separation-character')
  public set separationCharacter(value: string) {
    if (!value || !value.length) {
      this._separationCharacter = ',';
      return;
    }

    this._separationCharacter = value[0];
  }

  /*
  * Character which is used for dividing searched items.
  * */
  public get separationCharacter(): string {
    return this._separationCharacter;
  }

  /*
  * Items which have been selected.
  * */
  public get selectedItems(): any[] {
    return this._selectedItems;
  }

  /*
  * Get selected items.
  * */
  public set selectedItems(values: any[]) {
    if (!values || values.length < 0) {
      this._selectedItems = [];
      return;
    }

    this._selectedItems = values;
  }

  /*
  * How much time should component raise another one about its changes.
  * */
  @Input('interval')
  public set interval(value: number) {

    if (value < 150) {
      this._loadItemsInterval = 150;
      return;
    }

    this._loadItemsInterval = value;
  }

  /*
  * List of item which should be displayed on drop-down menu.
  * */
  @Input('items')
  public set items(values: Array<any>) {

    if (this.loadAvailableItemsAsyncHandler && this._updateAvailableItemsSubject) {
      this._updateAvailableItemsSubject.next(null);
      return;
    }
    if (!values || !values.length || !(values instanceof Array)) {
      this._originalItems = [];
      this._availableItems = [];
      return;
    }

    this._originalItems = values;
    this._availableItems = values;
  }

  /*
  * Get available items for displaying in drop-down list.
  * */
  public get items(): any[] {
    return this._availableItems;
  }

  /*
  * Get the maximum items that can be displayed in context menu.
  * */
  public get maximumContextItem(): number {
    return this._maximumContextItems;
  }

  /*
  * How many items should be shown to be selected.
  * */
  @Input('limit-item-amount')
  public set maximumContextItems(maximumItems: number) {
    if (maximumItems < 0) {
      maximumItems = 0;
    }

    this._maximumContextItems = maximumItems;
  }

  /*
  * Get maximum selectable items.
  * */
  public get maximumSelectableItems(): number {
    return this._maximumSelectableItems;
  }

  /*
  * Update the maximum selectable items.
  * */
  @Input('limit-item-selection')
  public set maximumSelectableItems(value: number) {
    if (value < 0 || isNaN(value)) {
      this._maximumSelectableItems = 0;
      return;
    }

    this._maximumSelectableItems = value;
  }

  //#endregion

  //#region Constructor

  /*
  * Initiate components with injectors (as available)
  * */
  public constructor() {
    this._selectedItems = [];
    this.search = new EventEmitter<string>();
    this.items = [];

    // By default, items amount is limited to 10.
    this._maximumSelectableItems = 10;

    this._updateAvailableItemsSubject = new BehaviorSubject(null);
    this._updateAvailableItemsSubscription = this._updateAvailableItemsSubject
      .pipe(
        map((keyword: string) => {
          if (!keyword) {
            return null;
          }

          return keyword.trim();
        }),
        distinctUntilChanged(),
        switchMap((keyword: string) => {
          return this.loadAvailableItemsAsync(keyword);
        })
      )
      .subscribe(availableItems => {
        this._availableItems = availableItems;
      }, error => console.log(error));
  }

  //#endregion

  //#region Methods

  public ngOnDestroy(): void {
    if (this._updateAvailableItemsSubscription && !this._updateAvailableItemsSubscription.closed) {
      this._updateAvailableItemsSubscription.unsubscribe();
    }
  }

  /*
  * Check whether item has been chosen or not.
  * */
  protected hasItemSelected(item: any): boolean {
    return this.loadSelectedItemIndex(item) != -1;
  }

  /*
  * Find chosen item index in array.
  * */
  protected loadSelectedItemIndex(item: any): number {
    // Items list is empty.
    if (this.selectedItems == null || this.selectedItems.length < 1) {
      return -1;
    }

    // Get item index.
    return this.selectedItems.indexOf(item);
  }

  /*
  * Get title which is used for being displayed on search box.
  * */
  protected loadSelectedItemsTitle(): string {
    if (this.selectedItems == null || this.selectedItems.length < 1) {
      return '';
    }

    // Find separation character.
    let separationCharacter = this.separationCharacter;
    if (!separationCharacter) {
      separationCharacter = ',';
    }

    // Get the property which is for displaying purpose.
    const displayProperty = this.displayProperty;

    return this.selectedItems
      .map(selectedItem => {

        // There is no display property.
        if (!displayProperty || !displayProperty.length) {
          return selectedItem;
        }

        return selectedItem[displayProperty]
      })
      .join(separationCharacter)
      .slice(0, 255);
  }

  /*
  * Clear chosen items list.
  * */
  public deleteSelectedItems(shouldRaiseOnChangeCallback?: boolean): void {

    // Initiate new array.
    this.selectedItems = new Array<any>();

    if (shouldRaiseOnChangeCallback) {
      this.ngOnChangeCallback(this.selectedItems);
    }
  }

  /*
  * Find selected value and delete it.
  * */
  public deleteSelectedValue(value: any): void {

    // Get index of value.
    if (!this.selectedItems || !this.selectedItems.length) {
      return;
    }

    const itemIndex = this.selectedItems.findIndex(selectedItem => this.loadItemValue(selectedItem) == value);
    if (itemIndex < 0) {
      return;
    }

    // Remove item from list.
    const selectedValues = [...this.selectedItems];
    selectedValues.splice(itemIndex, 1);

    if (!selectedValues || !selectedValues.length) {
      this.selectedItems = null;
      this.ngOnChangeCallback(null);
    } else {
      this.selectedItems = selectedValues;
      this.ngOnChangeCallback(this.selectedItems.map(selectedItem => this.loadItemValue(selectedItem)));
    }
  }

  /*
  * Select an item in list.
  * */
  protected clickSelectItem(item: any): void {

    // Enlist of selected items.
    let selectedItems: any[];

    if (!this.selectedItems) {
      selectedItems = [];
    } else {
      selectedItems = [...this.selectedItems];
    }

    // Get item in the selected value.
    const itemIndex = selectedItems.indexOf(item);

    // Item hasn't been chosen.
    if (itemIndex == null || itemIndex < 0) {
      // Maximum selected item exceeded.
      if (this.maximumSelectableItems != null && (this.maximumSelectableItems > 0 && selectedItems.length >= this.maximumSelectableItems)) {
        return;
      }

      // Get item value.
      selectedItems.push(item);
      this.selectedItems = selectedItems;
      this.ngOnChangeCallback(selectedItems.map(selectedItem => this.loadItemValue(selectedItem)));

      return;
    }

    selectedItems.splice(itemIndex, 1);

    if (!selectedItems || !selectedItems.length) {
      this.selectedItems = null;
      this.ngOnChangeCallback(this.selectedItems);
    } else {
      this.selectedItems = selectedItems;
      this.ngOnChangeCallback(this.selectedItems);
    }

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
    if (this.disabled) {
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
  public writeValue(selectedValues: any[]): void {

    // No value has been selected.
    if (!selectedValues || !selectedValues.length) {
      this.selectedItems = null;
      return;
    }

    this.selectedItems = selectedValues;
  }

  /*
  * Callback which is fired when on-change register has been initiated.
  * */
  public registerOnChange(fn: any): void {
    this.ngOnChangeCallback = fn;
  }

  /*
  * Callback which is fired when on-touch register has been initiated.
  * */
  public registerOnTouched(fn: any): void {
    this.ngOnTouchedCallback = fn;
  }

  /*
  * Set item to be disabled | enabled.
  * */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /*
  * Load available items asynchronously.
  * This function will be used in offline mode.
  * */
  protected loadAvailableItemsAsync(keyword: string): Observable<any[]> {

    // Make the keyword to be upper cased.
    const upperCasedKeyword = (keyword == null) ? null : keyword.toUpperCase();

    // Get the handler.
    const loadAvailableItemsAsyncHandler = this.loadAvailableItemsAsyncHandler;

    // No handler is defined for remote data loading.
    if (!loadAvailableItemsAsyncHandler) {
      // Load available items locally.
      return of([...this._originalItems])
        .pipe(
          map((items: any[]) => {

            if (!items || !items.length) {
              return [];
            }

            return items
              .filter(item => {

                // Get the display property.
                const displayProperty = this.displayProperty;
                if (displayProperty && displayProperty.length > 0) {
                  const itemProperty = item[displayProperty];
                  if (!itemProperty) {
                    return false;
                  }

                  if (!upperCasedKeyword) {
                    return items;
                  }

                  return itemProperty.toString().toUpperCase().indexOf(upperCasedKeyword) !== -1;
                }
              })
          })
        );
    }

    // Load available items remotely.
    return this.loadAvailableItemsAsyncHandler(keyword);
  }

  /*
  * Load item display.
  * */
  protected loadItemDisplay(item: any): string {

    // Get the display property.
    const displayProperty = this.displayProperty;
    if (!displayProperty || !displayProperty.length) {
      return item;
    }

    return item[displayProperty];
  }

  /*
  * Load item value.
  * */
  protected loadItemValue(item: any): string {

    // Get defined key.
    const key = this.key;
    if (!key || !key.length) {
      return item;
    }

    return item[key];
  }

  public ngOnInit(): void {

    if (!this.loadAvailableItemsAsyncHandler) {
      return;
    }

    if (!this._updateAvailableItemsSubject) {
      return;
    }

    return this._updateAvailableItemsSubject.next(' ');
  }

  //#endregion

}
