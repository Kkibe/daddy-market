import { supabase } from './supabaseClient';

/**
 * Create an order with its line items in Supabase.
 * @param {Object} order - order record (without id/created_at)
 * @param {Array} items - line items [{ product_id, title, description, price, quantity, image }]
 * @returns {Promise<{ order: Object, items: Array }>}
 */
export async function createOrderWithItems(order, items) {
  const { data: orderRow, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_email: order.user_email || null,
      user_id: order.user_id || null,
      customer_name: order.customer_name || null,
      customer_phone: order.customer_phone,
      customer_email: order.customer_email || null,
      street: order.street || null,
      city: order.city || null,
      zip: order.zip || null,
      payment_method: order.payment_method,
      payment_option: order.payment_option || null,
      subtotal: order.subtotal,
      shipping: order.shipping || 0,
      discount: order.discount || 0,
      total: order.total,
      currency: order.currency || 'KES',
      status: order.status || 'pending',
      checkout_id: order.checkout_id || null,
      tx_ref: order.tx_ref || null,
      transaction_id: order.transaction_id || null,
      items_count: items.length,
    })
    .select()
    .single();

  if (orderError) throw new Error(`Failed to create order: ${orderError.message}`);

  const itemRows = items.map((item) => ({
    order_id: orderRow.id,
    product_id: String(item.id || item.product_id),
    title: item.title || item.description || 'Item',
    description: item.description || null,
    price: item.price,
    quantity: item.quantity,
    image: item.image || null,
  }));

  const { data: insertedItems, error: itemsError } = await supabase
    .from('order_items')
    .insert(itemRows)
    .select();

  if (itemsError) throw new Error(`Failed to create order items: ${itemsError.message}`);

  return { order: orderRow, items: insertedItems || [] };
}

/**
 * Update an order's payment status and transaction references.
 */
export async function updateOrderStatus(orderId, updates) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: updates.status,
      checkout_id: updates.checkout_id ?? undefined,
      tx_ref: updates.tx_ref ?? undefined,
      transaction_id: updates.transaction_id ?? undefined,
    })
    .eq('id', orderId)
    .select()
    .single();
  if (error) throw new Error(`Failed to update order: ${error.message}`);
  return data;
}

/**
 * Fetch a single order by id with its items.
 */
export async function fetchOrderById(orderId) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .maybeSingle();
  if (orderError) throw new Error(orderError.message);
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  if (itemsError) throw new Error(itemsError.message);

  return { ...order, items: items || [] };
}

/**
 * Fetch recent orders (for display / history).
 */
export async function fetchRecentOrders(limit = 20) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}
