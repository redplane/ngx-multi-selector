### ngx-multi-selector

Description:

 * This component provides a control which helps user to find records in service using keyword.
 * More than one item can be selected.
 * Angular **>= 6** support.

Online demo can be found [here](http://ngx-multi-selector.bitballoon.com/):

```
<ngx-multi-selector #selector="ngx-multi-selector" 
                    [items]="customers"
                    [(ngModel)]="chosenCustomers"
                    [display-property]="'ContactName'"
                    [is-search-box-available]="true"
                    [is-clear-button-available]="true"
                    [placeholder-search-drop-down]="'Please select an item'"
                    [separation-character]="' - '"
                    [key-property]="'Id'" 
                    [value-property]="'Id'">
</ngx-multi-selector>
```

### Template selector:

 * `#selector="ngx-multi-selector"`: Get instance of `ngx-multi-selector` in component file. In component file, please use `@ViewChild('selector', {static: false}) public ngxSelector: NgxMultiSelectorComponent` to access to multi items selector functions.

### Properties:

 * ```key``` (string): Property of object which determines whether item has been selected or not.
 
 * ```ngModel``` (string): An array which is for storing chosen items.
 
 * ```display-property``` (string): Property which should be used for item display.
 
 * ```value-property``` (string): Property which is used as value property.
 
 * ```key (depreated)``` (string): Property which is used for determining whether item is selected or not. If your selected value is object, this is very useful.
 
 * ```key-property``` (string): This property is a replacement ```key``` property. Please consider using this property, the deprecated one will be removed in future version.
 
 * ```items``` (Array<any>): List of items which should be displayed inside drop-down menu.
 
 * ```is-clear-button-available``` (boolean): Whether clear button is available or not. This button is for cleaning chosen items list.
 
 * ```is-search-box-available``` (boolean): Whether search box is available or not. The search box is for typing keyword to search.
 
 * ```limit-item-amount``` (number): Number of items which can be displayed inside drop-down menu (**Minimum**: 1. **Default**: 1).
 
 * ```limit-item-selection``` (number): Maximum number of items which can be selected
 
 * ```placeholder-search-drop-down``` (string): Place holder text of search box inside drop-down list.
 
 * ```placeholder-title-drop-down``` (string): Pleace holder text of title box.
 
 * ```separation-character``` (string): Character which is used for separating items and items.
 
 * ```disabled``` (boolean): Whether multi drop-down selector control is disabled or not.
 
 * ```interval``` (number): Time between 2 times of emitting search event to another component to do the search.
 
 * ```item-template``` (string): Template of item displayed in drop-down list. Please see this [example](https://ngx-multi-selector.netlify.com/advanced-demo/custom-item-template) for more information.
 

### Handlers:

 * `load-available-items-handler(keyword: string) => Observable<any[]>`: Load items asynchronously by using keyword. Observable of items should be returned, searched items will be listed in dropdown menu.
 
### Events:

 * ~~search-items (keyword: string): This event is fired when component detects value changed. This event is fired with keyword, another component can use that keyword to search records in data source.~~. **Please use `load-available-items-handler` instead**.
 
 * ~~update-items(items: Array<any>): This event is fired when chosen items list is modified. This event can be used for handling changes in chosen items list.~~
