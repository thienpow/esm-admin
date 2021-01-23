# ESM Admin


### RENEW CERT
sudo certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns -d *.aadi.my

### REBUILD WEB
docker-compose up --detach --build esmadmin