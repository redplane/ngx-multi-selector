### ngx-multi-drop-down-selector

Description:

 * This component provides a control which helps user to find records in service using keyword.
 * More than one item can be selected.
 * Angular >= 4 support.

Online demo can be found [here](http://ng2-multi-drop-down-selector.getforge.io/):

```javascript
<ngx-multi-selector #multiselector="ng2-multi-selector"
					[items]="customers"
                    [display-property]="'ContactName'"
                    [is-search-box-available]="true"
                    [is-clear-button-available]="true"
                    [placeholder-search-drop-down]="'Please select an item'"
                    [separation-character]="' - '"
                    [key]="'Id'"
                    (search-items)="searchItem($event)"
                    (update-items)="updateCustomers($event)">
</ngx-multi-selector>
```

### Options:
 * ```key``` (string): Property of object which determines whether item has been selected or not.
 * ```display-property``` (string): Property which should be used for item display.
 * ```items``` (Array<any>): List of items which should be displayed inside drop-down menu.
 * ```is-clear-button-available``` (boolean): Whether clear button is available or not. This button is for cleaning chosen items list.
 * ```is-search-box-available``` (boolean): Whether search box is available or not. The search box is for typing keyword to search.
 * ```limit-item-amount``` (number): Number of items which can be displayed inside drop-down menu.
 * ```limit-item-selection``` (number): Maximum number of items which can be selected
 * ```placeholder-search-drop-down``` (string): Place holder text of search box inside drop-down list.
 * ```placeholder-title-drop-down``` (string): Pleace holder text of title box.
 * ```separation-character``` (string): Character which is used for separating items and items.
 * ```disabled``` (boolean): Whether multi drop-down selector control is disabled or not.
 * ```interval``` (number): Time between 2 times of emitting search event to another component to do the search.
 * ```item-template``` (string): Template of item displayed in drop-down list.
 
### Events:
 * ```search-items (keyword: string)```: This event is fired when component detects value changed. This event is fired with keyword, another component can use that keyword to search records in data source.
 * ```update-items(items: Array<any>)```: This event is fired when chosen items list is modified. This event can be used for handling changes in chosen items list.
