// Payment service for the Rise Payment API
// Base URL: https://powerful-flexibility-production-989e.up.railway.app
// Endpoints discovered from the live API documentation.

const API_BASE_URL = 'https://powerful-flexibility-production-989e.up.railway.app';

async function parseResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Unexpected response from payment server: ${text.slice(0, 200)}`);
  }
  if (!response.ok) {
    const message = data?.message || data?.error || `Payment request failed (${response.status})`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Initiate an M-Pesa payment. Customer receives an STK push prompt on their phone.
 * @param {{ amount: string|number, currency?: string, phone: string, email?: string, fullname?: string }} payload
 */
export async function initiateMpesaPayment(payload) {
  const body = {
    amount: String(payload.amount),
    currency: payload.currency || 'KES',
    phone: payload.phone,
    email: payload.email || '',
    fullname: payload.fullname || '',
  };
  const res = await fetch(`${API_BASE_URL}/api/flow/initiate/mpesa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

/**
 * Initiate a card payment with 3D Secure.
 * @param {{ amount: string|number, currency?: string, card_number: string, exp_month: string, exp_year: string, cvv: string, email?: string }} payload
 */
export async function initiateCardPayment(payload) {
  const body = {
    amount: String(payload.amount),
    currency: payload.currency || 'USD',
    card_number: payload.card_number,
    exp_month: payload.exp_month,
    exp_year: payload.exp_year,
    cvv: payload.cvv,
    email: payload.email || '',
  };
  const res = await fetch(`${API_BASE_URL}/api/flow/initiate/card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

/**
 * Initiate a bank transfer payment. Returns virtual account details for the customer.
 * @param {{ amount: string|number, currency?: string, email: string }} payload
 */
export async function initiateBankTransferPayment(payload) {
  const body = {
    amount: String(payload.amount),
    currency: payload.currency || 'NGN',
    email: payload.email,
  };
  const res = await fetch(`${API_BASE_URL}/api/flow/initiate/bank-transfer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

/**
 * Check the status of a payment by checkoutId / tx_ref.
 * @param {{ checkoutId: string, tx_ref?: string }} payload
 * @returns {Promise<{ success: boolean, status: string, transactionId: string|null, amount: string, reference: string, completedAt: string|null }>}
 */
export async function checkPaymentStatus(payload) {
  const body = {
    checkoutId: payload.checkoutId,
    tx_ref: payload.tx_ref,
  };
  const res = await fetch(`${API_BASE_URL}/api/flow/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

/**
 * Verify a transaction by its Flutterwave id.
 * @param {{ id: number|string }} payload
 */
export async function verifyTransaction(payload) {
  const res = await fetch(`${API_BASE_URL}/api/transactions/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: payload.id }),
  });
  return parseResponse(res);
}

/**
 * Poll payment status until it is no longer "pending", or until maxAttempts.
 * @param {{ checkoutId: string, tx_ref?: string, onUpdate?: (status) => void, intervalMs?: number, maxAttempts?: number }} opts
 * @returns {Promise<{ status: string, success: boolean }>}
 */
export async function pollPaymentStatus(opts) {
  const { checkoutId, tx_ref, onUpdate, intervalMs = 4000, maxAttempts = 30 } = opts;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = await checkPaymentStatus({ checkoutId, tx_ref });
      const status = result.status || 'pending';
      onUpdate?.(status, result);
      if (status === 'success' || status === 'successful') {
        return { status: 'success', success: true, data: result };
      }
      if (status === 'failed' || status === 'cancelled' || status === 'cancelled') {
        return { status, success: false, data: result };
      }
    } catch (err) {
      onUpdate?.('error', { error: err.message });
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return { status: 'timeout', success: false };
}

export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  CARD: 'card',
  BANK_TRANSFER: 'bank-transfer',
};

export const PAYMENT_API_BASE = API_BASE_URL;
