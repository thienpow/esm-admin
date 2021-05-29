yarn build
rm -rf ~/development/ESM/BackEnd/esm-datastore/deploy/admin/www
cp -r www ~/development/ESM/BackEnd/esm-datastore/deploy/admin/
cd ~/development/ESM/BackEnd/esm-datastore/
git add .
git commit -m "esm-admin"
git push
ssh root@esm-api.aadi.my 'bash -s' < restart_esm_admin.sh