# Übungen



Diese Übung konzentriert sich auf die Migration von RxJS Observables zu Angular Signals, um die Vorteile des neuen Signals-APIs zu nutzen.


## Observable zu Signal Migration

### Aufgabe 2

- Analysiere die bestehende `workshop-task.component.ts`, die RxJS Observables verwendet.
- Erstelle eine neue Komponente `workshop-task-signal`, die die gleiche Funktionalität mit Angular Signals implementiert.
- Beachte besonders die Umsetzung der folgenden RxJS-Operatoren mit Signals:
  - distinctUntilChanged
  - map
  - combineLatest

### Hinweise zur Implementierung

- Verwende `signal()` anstelle von BehaviorSubject
- Verwende `computed()` für abgeleitete Werte
- Verwende `effect()` für Seiteneffekte


<div style="page-break-after: always;"></div>