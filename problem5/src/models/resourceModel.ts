import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export interface Resource {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string
}

export async function initializeDb() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    )
  `);
}

export async function createResource(resource: Omit<Resource, 'id'>) {
  const db = await dbPromise;
  const result = await db.run(
    `INSERT INTO resources (name, description, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))`,
    resource.name,
    resource.description
  );
  return { id: result.lastID, ...resource };
}

export async function getAllResources() {
  const db = await dbPromise;
  return db.all<Resource[]>('SELECT id, name, description FROM resources WHERE deleted_at IS NULL');
}

export async function getResourceById(id: number) {
  const db = await dbPromise;
  return db.get<Resource>('SELECT id, name, description FROM resources WHERE id = ? AND deleted_at IS NULL', id);
}

export async function updateResource(id: number, resource: Omit<Resource, 'id'>) {
    const db = await dbPromise;
    await db.run(
      `UPDATE resources SET name = ?, description = ?, updated_at = datetime('now') WHERE id = ?`,
      resource.name,
      resource.description,
      id
    );
    return db.get<{name: string, description: string}>('SELECT id, name, description FROM resources WHERE id = ? AND deleted_at IS NULL', id);
}

export async function deleteResource(id: number) {
    const db = await dbPromise;
    await db.run(`UPDATE resources SET deleted_at = datetime('now') WHERE id = ?`, id);
    return db.get<{name: string, description: string}>('SELECT id, name, description FROM resources WHERE id = ? AND deleted_at IS NULL', id);    
}
