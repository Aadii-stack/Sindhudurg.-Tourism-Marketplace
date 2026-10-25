import initialDatabase from '../data/database.json';
import {
  Product,
  TourismListing,
  Seller,
  ProductCategory,
  Order,
  TourismEnquiry,
  UserProfile
} from '../types';

export interface LocalDatabaseSchema {
  system: {
    name: string;
    version: string;
    district: string;
    state: string;
    type: string;
    updatedAt: string;
  };
  categories: ProductCategory[];
  sellers: Seller[];
  products: Product[];
  tourismListings: TourismListing[];
  orders: Order[];
  enquiries: TourismEnquiry[];
  users: UserProfile[];
}

const STORAGE_KEY = 'sindhudurg_local_database_v1';

export class JsonDatabaseManager {
  private static instance: JsonDatabaseManager;

  private constructor() {}

  public static getInstance(): JsonDatabaseManager {
    if (!JsonDatabaseManager.instance) {
      JsonDatabaseManager.instance = new JsonDatabaseManager();
    }
    return JsonDatabaseManager.instance;
  }

  public getDatabase(): LocalDatabaseSchema {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read local database from storage:', e);
    }
    // Fall back to seed database.json
    return initialDatabase as unknown as LocalDatabaseSchema;
  }

  public saveDatabase(db: LocalDatabaseSchema): void {
    try {
      db.system.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db, null, 2));
    } catch (e) {
      console.error('Failed to persist database to storage:', e);
    }
  }

  public exportJson(): string {
    const db = this.getDatabase();
    return JSON.stringify(db, null, 2);
  }

  public importJson(jsonContent: string): { success: boolean; error?: string } {
    try {
      const parsed = JSON.parse(jsonContent);
      if (!parsed.products || !parsed.categories || !parsed.tourismListings) {
        return { success: false, error: 'Invalid database schema format: Missing core entities' };
      }
      this.saveDatabase(parsed);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Malformed JSON content' };
    }
  }

  public resetToFactory(): LocalDatabaseSchema {
    const fresh = initialDatabase as unknown as LocalDatabaseSchema;
    fresh.system.updatedAt = new Date().toISOString();
    this.saveDatabase(fresh);
    return fresh;
  }
}

export const jsonDb = JsonDatabaseManager.getInstance();
