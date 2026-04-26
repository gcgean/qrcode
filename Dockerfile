FROM nginx:alpine

# remove config padrão
RUN rm -rf /usr/share/nginx/html/*

# copia seu projeto
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]