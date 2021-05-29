yarn build

# clean up www inside deploy/admin folder
rm -rf ~/development/ESM/BackEnd/esm-datastore/deploy/admin/www
# copy over new www
cp -r www ~/development/ESM/BackEnd/esm-datastore/deploy/admin/
# goto the deploy folder
cd ~/development/ESM/BackEnd/esm-datastore/deploy
git add .
git commit -m "esm-admin"
git push
ssh root@esm-api.aadi.my 'bash -s' < remote_deploy_esm_admin.sh