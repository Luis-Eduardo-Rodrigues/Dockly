# 🐳 Dockly

**Dockly** é um gerador de ambientes Docker que cria automaticamente seu `docker-compose.yml` a partir de um simples prompt de texto.  
Escreva o stack que você deseja e o Dockly monta o ambiente completo pra você em segundos. 

> 🚀 *Pare de decorar configurações. Comece a gerar ambientes.*

---

## ✨ Funcionalidades

- 🧠 **Geração automática de docker-compose.yml** com base em prompts de texto.
- ⚙️ **Stacks populares** prontas para uso: Node.js, React, Python, Redis, etc.
---

## Exemplo de Uso

- " Preciso de um ambiente React + Node.js + MongoDB"
- O Dockly retorna
- version: "3.8"
\n
services: \n
  app: \n
    image: node:18 \n
    working_dir: /app \n
    volumes: \n
      - .:/app \n
    ports: \n
      - "3000:3000" \n
    command: npm start \n
\n
  mongo: \n
    image: mongo \n
    restart: always
    ports:
      - "27017:27017"

## Simples assim.

## ⚡ Tecnologias Utilizadas

| Camada | Tecnologias |
|---------|--------------|
| **Frontend** | React, Tailwind CSS, Lucide Icons |
| **Backend (opcional)** | Node.js + Express + Prisma e Docker |

---
