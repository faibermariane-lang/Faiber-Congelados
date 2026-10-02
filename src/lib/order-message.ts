import { PRODUCTS, type ProductId } from '@/content';
import { totals } from '@/store/order';

type Customer = { nome: string; empresa: string; cidade: string };

/** Monta a mensagem do pedido no formato combinado. */
export function orderMessage(items: Partial<Record<ProductId, number>>, c: Customer) {
  const lines = PRODUCTS.filter((p) => (items[p.id] ?? 0) > 0).map((p) => {
    const q = items[p.id]!;
    return `${q}x ${p.name} (${p.units} un.)`;
  });
  const { count, units } = totals(items);
  let intro = `Olá, Faiber! Sou ${c.nome.trim() || '[Nome]'}`;
  if (c.empresa.trim()) intro += `, da ${c.empresa.trim()}`;
  if (c.cidade.trim()) intro += `, de ${c.cidade.trim()}`;
  return `${intro}. Gostaria de um orçamento: ${lines.join(', ')}. Total: ${count} ${count === 1 ? 'item' : 'itens'} (${units} unidades).`;
}
