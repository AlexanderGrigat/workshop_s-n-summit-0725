# Übungen

## Signals in der Praxis

#### Aufgabe 3 
Die _product-table_ soll auf Signals umgstellt werden.
##### _product.service.ts_:
- Baue die __getListFiltered__-Funktion so um, das sie mit der __httpResource__ arbeitet. Der Übergabeparameter soll ein Signal sein.
##### _product-table.component.ts_ & _product-table.component.html_:
- Verwende Template-Driven Forms (FormsModule) in kombination mit einem Signal (__nameFilterCtrl__ -> __nameFilter__)
- Baue die _product-table_ so um, das sie mit dem neuen Rückgabewert der __getListFiltered__-Funktion umgehen kann
- Baue _totalPrice_ in ein Computed Signal um
- Entferne den OnInit-Block
- Baue die __onSaveProduct()__ Funktion so um, das sie ein neuladen der httpResource auslöst
- Sorge dafür das ein Progressbare angezeigt wird, während die Produkte geladen werden


<div style="page-break-after: always;"></div>
