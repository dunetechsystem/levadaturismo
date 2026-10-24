# Levada Turismo — site

Next.js 16 + Tailwind 4. Passeios, preços, fotos, vagas, telefone, Instagram e Cadastur vêm do **DunasTour**
(slug `levada-turismo`, mesmo contrato de `dunastour.com.br/levada-turismo`). Mesma camada de dados da RS Adventure /
Mister K (`src/lib`), interface própria.

## Rodar

```bash
cp .env.example .env.local
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## O que é da Levada (fora do DunasTour)

Vindo do site antigo (`levada_turismo2`), editável em `src/config`:

- `site.ts` — transfer (trechos, fotos, diferenciais), hospedagem (pousada/hostel/hotel), destinos (com `match` que liga
  ao passeio do DunasTour pelo título), estações, história do nome, endereço/horários, FAQ.
- `roteiros.ts` — roteiros de 6 a 9 dias (Rota das Emoções etc.), dia a dia, com orçamento pelo WhatsApp.

Pacotes cadastrados no DunasTour (combos) aparecem sozinhos em `/pacotes/[id]` e na home.

## "Minha viagem"

Carrinho que junta passeios (com data e vagas do DunasTour) + transfer + hospedagem e manda **uma** mensagem
pro WhatsApp. Compra online (`onlineBooking`) vem desligada.

## Tráfego pago e vendas

IDs no `.env` (ver `.env.example`): Meta Pixel, GA4, Google Ads (+ rótulo da conversão) e/ou GTM. Sem ID, nada carrega.
Tudo em `src/lib/track.ts` + `src/components/layout/Analytics.tsx`.

| Evento (Meta / GA4) | Quando |
| --- | --- |
| `ViewContent` / `view_item` | Abriu a página de um passeio ou pacote |
| `AddToCart` / `add_to_cart` | Adicionou à viagem/roteiro |
| `InitiateCheckout` / `begin_checkout` | Abriu o carrinho com itens |
| `Lead` / `generate_lead` (+ conversão do Google Ads) | **Qualquer** clique num link do WhatsApp |

O `Lead` sai de um ouvinte único em todo link `api.whatsapp.com`, então botão novo de WhatsApp já entra no
rastreio; `data-lead` (o que é) e `data-value` (valor em R$) no link enriquecem o evento.

**Origem da conversa:** UTM, `gclid` e `fbclid` da visita ficam guardados por 30 dias e vão no fim da mensagem do
WhatsApp (`_ref: google/cpc/lagoa-azul_`). Use UTMs nos anúncios
(`?utm_source=meta&utm_medium=paid&utm_campaign=lagoa-azul`) pra saber qual campanha vendeu.

**A venda (Purchase):** fecha no link de checkout do DunasTour que vai pelo WhatsApp. Cadastre **o mesmo ID do pixel**
no painel do DunasTour (Link de checkout → Pixel do Meta) — de preferência com o token da API de Conversões. Aí o pedido
enviado no link vira `Purchase` no mesmo pixel, ligado ao anúncio pelo telefone/e-mail do cliente.

Para anúncio, mande o tráfego pra página do passeio (`/passeios/<slug>`), não pra home.

## Visual

Tema claro areia + oceano, tirado da logo (`public/brand`, fundo transparente e versão branca). Títulos em Fraunces,
texto em Manrope. Paleta em `src/app/globals.css` (`sand`, `ocean`, `sail`, `sun`).

## Como conecta ao DunasTour

Só o servidor fala com a API (`DUNASTOUR_API_URL`) — libere o IP do servidor no backend. Leituras em
`src/lib/dunastour/server.ts` (cache 5 min); calendário de vagas pelo proxy `src/app/api/dunas/[...path]/route.ts`.
