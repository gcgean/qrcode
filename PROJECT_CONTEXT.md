Leia e siga este arquivo antes de alterar qualquer código deste projeto.

Entenda que este projeto é um frontend estático de gerador de QR Code, feito com HTML, CSS e JavaScript puro, servido por Nginx via Docker. Não use Node.js, não crie backend, não crie banco de dados e não altere a porta 8081 sem necessidade.

O deploy roda com Docker Compose e o acesso público é feito pelo Cloudflare Tunnel em `https://qrcode.gestorfacil.ia.br` apontando para `http://localhost:8081`.

Antes de programar, analise a estrutura do projeto, preserve `Dockerfile` e `docker-compose.yml`, mantenha compatibilidade com produção e explique qualquer alteração importante.

Após modificar, informe quais arquivos foram alterados e quais comandos devo rodar para testar e subir em produção.
