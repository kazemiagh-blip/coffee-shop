import { supabase, isSupabaseConfigured } from './supabase';
import { Product, sampleProducts } from '@/data/products';

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return sampleProducts;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase query error, falling back to local products:', error.message);
      return sampleProducts;
    }

    if (data && data.length > 0) {
      return data as Product[];
    }

    return sampleProducts;
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return sampleProducts;
  }
}

export interface SaveOrderPayload {
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  emirate: string;
  area?: string;
  street: string;
  building: string;
  notes?: string;
  payment_method: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total: number;
}

export async function saveOrderToSupabase(order: SaveOrderPayload) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, savedToDb: false, message: 'Saved locally (Supabase not yet configured)' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select();

    if (error) {
      console.error('Error saving order to Supabase:', error);
      return { success: false, savedToDb: false, error: error.message };
    }

    return { success: true, savedToDb: true, data };
  } catch (err: any) {
    console.error('Unexpected error inserting order:', err);
    return { success: false, savedToDb: false, error: err.message };
  }
}
