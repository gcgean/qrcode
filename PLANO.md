# Plano do Projeto — QR Grátis

## Visão geral
Site **100% gratuito** de geração de QR Codes, com todos os 15 tipos presentes na referência (Link, Texto, E-mail, Chamada, SMS, V-card, WhatsApp, WI-FI, PDF, App, Imagens, Vídeo, Redes Sociais, Evento, Código 2D) e monetização agressiva via **Google AdSense** (Publisher ID: `ca-pub-2969341599167186`).

## Decisões técnicas
| Item | Decisão | Motivo |
| --- | --- | --- |
| Stack | HTML + CSS + JavaScript puro | Simples, rápido, hospedagem grátis em GitHub Pages / Netlify / Vercel |
| Backend | Não há. 100% client-side | Custo zero, escalabilidade infinita, sem LGPD sobre dados de usuário |
| Biblioteca QR | [qrcode.js](https://github.com/soldair/node-qrcode) via CDN (`qrcode@1.5.3`) | Leve, suporta customização de cores, tamanhos e níveis de correção |
| Framework CSS | CSS próprio com variáveis (custom properties) | Sem bloat, carrega em <30kb, ajuda CLS/LCP (critério AdSense) |
| Tema | Moderno azul/verde (como a referência) | Profissional, alta confiança |
| Idioma | Português (pt-BR) | Público alvo brasileiro |
| Cookies / LGPD | Banner de consentimento simples antes de carregar AdSense | Exigência LGPD + boa prática AdSense |

## Estrutura de pastas
```
qrcode/
├── index.html                 # Página principal (gerador)
├── css/
│   └── style.css              # Estilos globais + componentes
├── js/
│   ├── main.js                # Inicialização, tabs, roteamento de tipos
│   ├── qrcode-core.js         # Chama a lib e aplica customizações
│   ├── customization.js       # Moldura, Forma e Logo
│   ├── ads-consent.js         # Banner LGPD + carregamento condicional do AdSense
│   └── generators/            # Um arquivo por tipo de QR
│       ├── link.js
│       ├── texto.js
│       ├── email.js
│       ├── chamada.js
│       ├── sms.js
│       ├── vcard.js
│       ├── whatsapp.js
│       ├── wifi.js
│       ├── pdf.js
│       ├── app.js
│       ├── imagens.js
│       ├── video.js
│       ├── redes-sociais.js
│       ├── evento.js
│       └── codigo2d.js
├── pages/
│   ├── sobre.html
│   ├── politica-privacidade.html
│   ├── termos-uso.html
│   └── contato.html
├── images/
│   └── logo.svg
├── ads.txt                    # Verificação AdSense
├── robots.txt
├── sitemap.xml
└── README.md
```

## Os 15 tipos de QR code
| # | Tipo | Campos | Payload gerado |
| --- | --- | --- | --- |
| 1 | Link | URL | `https://...` direto |
| 2 | Texto | Mensagem | Texto cru |
| 3 | E-mail | Destino, assunto, corpo | `mailto:dest?subject=...&body=...` |
| 4 | Chamada | Código país, número | `tel:+55...` |
| 5 | SMS | Número, mensagem | `SMSTO:+55...:msg` |
| 6 | V-card | Nome, empresa, telefone, e-mail, site, endereço | `BEGIN:VCARD...END:VCARD` |
| 7 | WhatsApp | Código país, telefone, mensagem | `https://wa.me/55...?text=...` |
| 8 | WI-FI | SSID, criptografia, senha, oculta | `WIFI:T:WPA;S:...;P:...;H:true;;` |
| 9 | PDF | Upload + página de hospedagem simples | Base64 data URL curta ou link externo (placeholder no MVP) |
| 10 | App | Link App Store / Google Play | URL universal detectando plataforma |
| 11 | Imagens | Galeria (placeholder externo) | URL hospedagem externa |
| 12 | Vídeo | URL YouTube/Vimeo | URL direto |
| 13 | Redes Sociais | Seleciona rede + usuário | `https://instagram.com/@usuario` etc. |
| 14 | Evento | Título, local, início, fim, descrição | `BEGIN:VEVENT...END:VEVENT` |
| 15 | Código 2D | Dados brutos (Code128, EAN, etc.) | Renderiza 2D arbitrário usando `bwip-js` |

> Obs.: Tipos que exigem hospedagem real de arquivos (PDF, Imagens, Vídeo upload) ficam com **link externo** no MVP — o usuário fornece o URL do arquivo. Upload real exigiria backend e armazenamento, o que foi descartado.

## Customizações (Desenhe seu QR Code)
Três abas, espelhando a referência:
1. **Moldura** — 9+ templates em SVG (sem frame, "SCAN ME" texto, moldura redonda, moldura com celular, etc.). Cada template recebe o QR inserido no lugar certo.
2. **Forma** — cor dos pontos (foreground), cor de fundo (background), estilo dos pontos (quadrado, arredondado, ponto), nível de correção de erro (L/M/Q/H).
3. **Logo** — upload de imagem que é sobreposta no centro do QR com fundo branco arredondado.

## Estratégia de monetização (AdSense máximo permitido)
Publisher ID: **ca-pub-2969341599167186**

Blocos previstos (7 slots, respeitando políticas AdSense):
1. **Header banner** (responsivo, logo abaixo do menu) — `slot-header`
2. **Sidebar sticky desktop** (lateral direita do gerador) — `slot-sidebar`
3. **Entre tipos e customização** (in-feed horizontal) — `slot-middle`
4. **Abaixo do botão Gerar/Baixar** (in-article) — `slot-below-action`
5. **Entre seções Forma e Logo** — `slot-between-sections`
6. **Rodapé banner** — `slot-footer`
7. **Sticky mobile bottom** — `slot-sticky-mobile` (oculto em desktop)

Todos marcados como `data-full-width-responsive="true"` e adaptativos. Script carregado de forma **assíncrona** após consentimento LGPD.

## Checklist para aprovação AdSense
- [x] Política de Privacidade (/pages/politica-privacidade.html)
- [x] Termos de Uso (/pages/termos-uso.html)
- [x] Sobre (/pages/sobre.html)
- [x] Contato (/pages/contato.html)
- [x] ads.txt com `google.com, pub-2969341599167186, DIRECT, f08c47fec0942fa0`
- [x] Banner de consentimento LGPD
- [x] Conteúdo original, útil e funcional (o gerador em si é o valor principal)
- [x] Navegação clara, menu em todas as páginas
- [x] Design responsivo
- [x] Tempo de carregamento rápido
- [x] Meta tags, Open Graph, favicon

## SEO essencial
- Title, description, keywords em cada página
- URLs limpas
- Sitemap.xml + robots.txt
- Schema.org WebApplication
- Open Graph + Twitter Card
- H1 único por página, hierarquia correta
- Alt em todas as imagens

## Roadmap de execução
1. Criar HTML principal com estrutura e tabs dos 15 tipos
2. CSS global com tema moderno azul/verde + responsividade
3. Lib QRCode via CDN + módulo `qrcode-core.js`
4. 15 arquivos de generator, um por tipo
5. Módulo `customization.js` (Moldura, Forma, Logo)
6. AdSense: script + 7 blocos + banner LGPD
7. Páginas institucionais (4 HTMLs)
8. ads.txt, robots.txt, sitemap.xml
9. README com instruções de deploy
10. Teste manual: gerar um QR de cada tipo, customizar e baixar
