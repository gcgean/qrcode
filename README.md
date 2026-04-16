# QR Grátis

Gerador de QR Code online 100% gratuito, com 15 tipos de QR Code, personalização completa (moldura, forma e logo) e monetização via Google AdSense.

## Stack
- HTML5 + CSS3 puro
- JavaScript vanilla
- [qrcode@1.5.3](https://www.npmjs.com/package/qrcode) via CDN
- Google AdSense

## Estrutura
```
qrcode/
├── index.html                 # Página principal (gerador)
├── css/style.css              # Estilos
├── js/
│   ├── main.js                # Orquestração
│   ├── qrcode-core.js         # Chama a lib + estilos/logo
│   ├── customization.js       # Molduras
│   ├── ads-consent.js         # LGPD + AdSense
│   └── generators/            # Um .js por tipo de QR
├── pages/                     # Sobre, Política, Termos, Contato
├── images/logo.svg
├── ads.txt
├── robots.txt
├── sitemap.xml
└── PLANO.md
```

## Como rodar localmente

### Opção 1: Abrir diretamente
Abra `index.html` no navegador (clique duplo no arquivo). Funciona offline.

### Opção 2: Servidor local (recomendado, necessário para AdSense)
```bash
# Python 3
python -m http.server 8000

# Node (http-server)
npx http-server -p 8000
```

Acesse `http://localhost:8000`.

## Deploy

### GitHub Pages (recomendado, grátis)
1. Crie um repositório no GitHub (ex.: `qrgratis`).
2. Faça push do conteúdo desta pasta.
3. Vá em Settings → Pages → Source: `main / root`.
4. Site disponível em `https://seuusuario.github.io/qrgratis/`.
5. Opcional: configure um domínio próprio (`qrgratis.com.br`).

### Netlify / Vercel
Arraste a pasta no dashboard ou conecte o repositório. Sem build step, detecção automática como site estático.

## AdSense

O Publisher ID já está configurado: `ca-pub-2969341599167186`.

Após subir o site:
1. Entre na sua conta do Google AdSense.
2. Adicione o site `qrgratis.com.br` (ou o domínio que você escolher).
3. Aguarde a aprovação.
4. Depois de aprovado, **substitua os `data-ad-slot` fictícios** (`1111111111`, `2222222222` etc.) pelos IDs reais dos blocos que você criar no painel AdSense.

### Localização dos slots
| Slot | Arquivo | data-ad-slot | Tipo |
| --- | --- | --- | --- |
| Header | `index.html` linha ~55 | 1111111111 | display responsivo |
| Entre tipos e forma | `index.html` linha ~86 | 2222222222 | in-feed |
| Entre customizações | `index.html` linha ~136 | 3333333333 | display |
| Abaixo do botão | `index.html` linha ~190 | 4444444444 | display |
| Sidebar sticky | `index.html` linha ~205 | 5555555555 | display vertical |
| Footer | `index.html` linha ~236 | 6666666666 | display |
| Sticky mobile | `index.html` linha ~268 | 7777777777 | anchor/overlay |

## Variantes de tipos implementados
| # | Tipo | Notas |
| --- | --- | --- |
| 1 | Link | `https://...` direto |
| 2 | Texto | Texto livre |
| 3 | E-mail | `mailto:` com subject/body |
| 4 | Chamada | `tel:+55...` |
| 5 | SMS | `SMSTO:` |
| 6 | V-card | VCARD 3.0 |
| 7 | WhatsApp | `wa.me/...` |
| 8 | Wi-Fi | `WIFI:T:WPA;S:...;P:...;;` |
| 9 | PDF | Link para PDF hospedado |
| 10 | App | Android / iOS / fallback |
| 11 | Imagens | Link externo |
| 12 | Vídeo | YouTube / Vimeo / etc |
| 13 | Redes Sociais | 8 redes pré-configuradas |
| 14 | Evento | VEVENT de calendário |
| 15 | Código 2D | Dados brutos |

## Próximos passos sugeridos
- Substituir o e-mail de contato real (`contato@qrgratis.com.br`) pelo seu.
- Substituir domínio canônico (`qrgratis.com.br`) nos `<link rel="canonical">`, `sitemap.xml`, `robots.txt`.
- Adicionar Google Analytics 4 (GA4) para métricas.
- Depois de publicar, pedir revisão AdSense (requer ~100+ visitas/dia e conteúdo original).
- Adicionar mais molduras, estilos de pontos e animações.
- Implementar histórico local (localStorage) de QR codes gerados.

## Licença
Projeto privado. © QR Grátis.
