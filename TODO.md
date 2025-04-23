# TODO: JOIN Angular Frontend

## 📋 Allgemein

- [x] Projektstruktur anlegen (Modules, Components, Services)
- [ ] GitHub Issues für größere Tasks anlegen

## 🔐 Authentifizierung

- [x] Login/Register-Component erstellen
- [x] AuthService implementieren
  - [x] Methoden für `login(credentials)` und `register(data)`
  - [x] Token im LocalStorage speichern und auslesen
  - [ ] HTTP Interceptor für das Hinzufügen des Tokens zu Requests

## 🎯 Summary-Bereich

- [x] SummaryComponent erstellen
- [ ] Service-Methoden: Anzahl der Tasks pro Rubric abfragen
- [ ] Anzeige der Zähler in Kacheln (To Do, In Progress, Await Feedback, Done)

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
- [ ] POST-Request an Backend senden

## 🗂️ Kanban-Board

- [x] BoardComponent erstellen
- [x] Vier Spalten anlegen:
  - To Do
  - In Progress
  - Await Feedback
  - Done
- [ ] Tasks als kleine Karten rendern
- [ ] Klick auf Karte:
  - Overlay/Modal öffnen mit Task-Details
  - Bearbeiten (PUT)
  - Löschen (DELETE)
- [ ] Overlay mit Add - Task zum task erstellen , mit verschiedenen Categorien

## 📇 Contact-Bereich

- [ ] ContactsComponent erstellen
- [ ] Links: Liste aller Contacts alphabetisch
- [ ] Rechts: Detailansicht des ausgewählten Contact
- [ ] CRUD-Funktionen:
  - Create Contact
  - Update Contact
  - Delete Contact
- [ ] Contact-Felder:
  - `name: string`
  - `email: string`
  - `phone: string`

## 🔗 Services & Endpunkte

### AuthService
- [x] `POST /api/auth/login` → Login
- [x] `POST /api/auth/regestration` → Registrierung

### UserService
- [ ] `GET /api/users` → Liste aller User

### ContactService
- [ ] `GET /api/contacts` → Alle Contacts
- [ ] `GET /api/contacts/:id` → Einzelner Contact
- [ ] `POST /api/contacts` → Neuen Contact anlegen
- [ ] `PUT /api/contacts/:id` → Contact bearbeiten
- [ ] `DELETE /api/contacts/:id` → Contact löschen

### TaskService
- [ ] `GET /api/tasks` → Alle Tasks inkl. Subtasks
- [ ] `GET /api/tasks/:id` → Einzelne Task
- [ ] `POST /api/tasks` → Neue Task anlegen
- [ ] `PUT /api/tasks/:id` → Task bearbeiten
- [ ] `DELETE /api/tasks/:id` → Task löschen
