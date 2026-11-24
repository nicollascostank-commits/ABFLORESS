/**
 * Centralized WhatsApp helper for AB Flores & Decoração
 * Official verified number: (85) 99239-5959
 * International format: 5585992395959
 */

export const OFFICIAL_WHATSAPP_PHONE = '5585992395959';
export const DISPLAY_WHATSAPP_PHONE = '(85) 99239-5959';
export const OFFICIAL_INSTAGRAM = '@abfloress';
export const OFFICIAL_INSTAGRAM_URL = 'https://instagram.com/abfloress';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da AB Flores e gostaria de conhecer os arranjos disponíveis.';

/**
 * Returns a direct WhatsApp click-to-chat URL with the specified message.
 */
export function getWhatsAppUrl(message?: string): string {
  const text = message && message.trim().length > 0 ? message : DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${OFFICIAL_WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an inquiry message for a specific catalog product.
 * If price is confirmed, prepares an order inquiry; if unconfirmed (Preço sob consulta),
 * prepares a price & availability consultation inquiry as required.
 */
export function getProductWhatsAppUrl(productName: string, formattedPrice?: string): string {
  if (
    formattedPrice &&
    formattedPrice.trim() !== '' &&
    formattedPrice !== 'Preço sob consulta' &&
    formattedPrice !== 'Preço a consultar'
  ) {
    const message = `Olá! Vim pelo site da AB Flores e gostaria de encomendar o arranjo "${productName}" (${formattedPrice}). Como posso prosseguir?`;
    return getWhatsAppUrl(message);
  }
  const message = `Olá! Vim pelo site da AB Flores e gostaria de consultar o valor e a disponibilidade do arranjo "${productName}". Como posso prosseguir?`;
  return getWhatsAppUrl(message);
}

export interface CartOrderLineItem {
  name: string;
  quantity: number;
  unitPriceText: string;
  subtotalText: string;
}

/**
 * Prepares the exact requested order message template for Arley's WhatsApp:
 *
 * PEDIDO — AB FLORES
 *
 * Olá! Gostaria de fazer o seguinte pedido:
 *
 * Produto: [nome do produto]
 * Quantidade: [quantidade]
 * Valor unitário: [valor]
 * Subtotal: [subtotal]
 *
 * [Repetir para todos os produtos]
 *
 * TOTAL DO PEDIDO: R$ [total]
 *
 * Nome do cliente: [nome informado ou 'Não informado']
 *
 * Gostaria de confirmar a disponibilidade, entrega e formas de pagamento.
 *
 * Obrigado!
 */
export function generateCartWhatsAppMessage(
  items: CartOrderLineItem[],
  totalText: string,
  customerName?: string
): string {
  const productBlocks = items
    .map(
      (item) =>
        `Produto: ${item.name}\nQuantidade: ${item.quantity}\nValor unitário: ${item.unitPriceText}\nSubtotal: ${item.subtotalText}`
    )
    .join('\n\n');

  const customerLine = customerName && customerName.trim().length > 0
    ? customerName.trim()
    : 'Não informado';

  return `PEDIDO — AB FLORES\n\nOlá! Gostaria de fazer o seguinte pedido:\n\n${productBlocks}\n\nTOTAL DO PEDIDO: ${totalText}\n\nNome do cliente: ${customerLine}\n\nGostaria de confirmar a disponibilidade, entrega e formas de pagamento.\n\nObrigado!`;
}

/**
 * Returns the WhatsApp click-to-chat URL for the cart order.
 */
export function getCartWhatsAppUrl(
  items: CartOrderLineItem[],
  totalText: string,
  customerName?: string
): string {
  const message = generateCartWhatsAppMessage(items, totalText, customerName);
  return getWhatsAppUrl(message);
}

/**
 * Direct inquiry for Box Flowers para Presentes:
 * "Olá! Tenho interesse no produto [NOME DO PRODUTO] da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?"
 */
export function getBoxFlowersWhatsAppUrl(productName: string): string {
  const message = `Olá! Tenho interesse no produto ${productName} da categoria Box Flowers para Presentes. Poderia me passar mais informações e o valor, por favor?`;
  return getWhatsAppUrl(message);
}

