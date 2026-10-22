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

## Visual

Tema claro areia + oceano, tirado da logo (`public/brand`, fundo transparente e versão branca). Títulos em Fraunces,
texto em Manrope. Paleta em `src/app/globals.css` (`sand`, `ocean`, `sail`, `sun`).

## Como conecta ao DunasTour

Só o servidor fala com a API (`DUNASTOUR_API_URL`) — libere o IP do servidor no backend. Leituras em
`src/lib/dunastour/server.ts` (cache 5 min); calendário de vagas pelo proxy `src/app/api/dunas/[...path]/route.ts`.
