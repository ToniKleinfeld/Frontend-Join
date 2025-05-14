# TODO: JOIN Angular Frontend

## 📋 Allgemein

- [x] Projektstruktur anlegen (Modules, Components, Services)
- [ ] GitHub Issues für größere Tasks anlegen
- [x] environment.ts / environment.prod.ts anlegen!

## 🔐 Authentifizierung

- [x] Login/Register-Component erstellen
- [x] AuthService implementieren
  - [x] Methoden für `login(credentials)` und `register(data)`
  - [x] Token im LocalStorage speichern und auslesen
  - [x] HTTP Interceptor für das Hinzufügen des Tokens zu Requests

## 🎯 Summary-Bereich

- [x] SummaryComponent erstellen
- [x] Service-Methoden: Anzahl der Tasks pro Rubric abfragen
- [x] Anzeige der Zähler in Kacheln (To Do, In Progress, Await Feedback, Done)

## ➕ Add Task Bereich

- [x] AddTaskComponent erstellen
- [x] FormGroup mit Feldern:
  - `title: string`
  - `description: string`
  - `rubric: string`
  - `category: string`
  - `prio: string`
  - `due_date: Date`
  - `assigned_users: User[]`
  - `subtasks: Subtask[]`
- [x] Dynamische Subtask-Felder
- [x] Dropdown für Assigned-Auswahl
- [x] Datepicker für `due_date`
- [x] POST-Request an Backend senden
- [x] Assigned to Suche nach user funktion

## 🗂️ Kanban-Board

- [x] BoardComponent erstellen
- [x] Vier Spalten anlegen:
  - To Do
  - In Progress
  - Await Feedback
  - Done
- [x] Tasks als kleine Karten rendern
- [x] Drag and Drop kleine Karten
- [ ] Klick auf Karte:
  - Overlay/Modal öffnen mit Task-Details
  - Bearbeiten (PUT)
  - Löschen (DELETE)
- [x] Overlay mit Add - Task zum task erstellen , mit verschiedenen Categorien

## 📇 Contact-Bereich

- [x] ContactsComponent erstellen
- [x] Links: Liste aller Contacts alphabetisch
- [x] Rechts: Detailansicht des ausgewählten Contact
- [x] CRUD-Funktionen:
  - Create Contact
  - Update Contact
  - Delete Contact
- [x] Contact-Felder:
  - `name: string`
  - `email: string`
  - `phone: string`
  - `bgcolor: string`

## 🔗 Services & Endpunkte

### AuthService

- [x] `POST /api/auth/login` → Login
- [x] `POST /api/auth/regestration` → Registrierung

### BackendService

- [x] `GET /api/users` → Liste aller User
- [x] `GET /api/users/me` → Welcher User ist eingelogt / bin ich?

- [x] `GET /api/tasks` → Alle Tasks inkl. Subtasks
- [ ] `GET /api/tasks/:id` → Einzelne Task
- [x] `POST /api/tasks` → Neue Task anlegen
- [x] `PUT /api/tasks/:id` → Task bearbeiten
- [ ] `DELETE /api/tasks/:id` → Task löschen

- [x] `GET /api/contacts` → Alle Contacts
- [x] `POST /api/contacts` → Neuen Contact anlegen
- [x] `PUT /api/contacts/:id` → Contact bearbeiten
- [x] `DELETE /api/contacts/:id` → Contact löschen
