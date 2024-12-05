import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = SQLite.openDatabaseSync('shopping_list.db');
    this.initDatabase();
  }

  initDatabase() {
    this.db.execSync(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        purchased INTEGER DEFAULT 0
      );`
    );
  }

  getItems() {
    const rows = this.db.getAllSync('SELECT * FROM items;');
    return rows;
  }

  addItem(name, quantity, purchased = 0) {
    const result = this.db.runSync(
      'INSERT INTO items (name, quantity, purchased) VALUES (?, ?, ?);',
      [name, quantity, purchased ? 1 : 0]
    );
    return result.lastInsertRowid;
  }

  editItem(id, name, quantity, purchased) {
    this.db.runSync(
      'UPDATE items SET name = ?, quantity = ?, purchased = ? WHERE id = ?;',
      [name, quantity, purchased ? 1 : 0, id]
    );
  }

  deleteItem(id) {
    this.db.runSync('DELETE FROM items WHERE id = ?;', [id]);
  }
}

export default new DatabaseService();