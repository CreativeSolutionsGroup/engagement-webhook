# Deployment

Currently, deployment is a manual process. The express server maps port 3000 to port 80 (standard HTTP) using Nginx.

1. SSH into AWS EC2 instance
2. Navigate into the `engagement-webhook` directory
3. Pull in newest version of master
    - `git remote update`
    - `git pull`
    - Check status from pm2 with `pm2 ls`, status for `EngagementWebhook` should be `online`

## pm2
The API uses [pm2](https://www.npmjs.com/package/pm2), a Node JS production process manager, in its deployment server. pm2 load balances the server and restarts the node app.js should the server crash.
- Use `pm2 ls` to see the list of active processes

## Nginx
[Nginx](https://www.nginx.com) is a reverse proxy server which ports requests at the server root port to our port. Requests made to port 80 (standard HTTP) are forwarded to port 3000 (what Express is listening to).

After installing nginx with yum, a config file is created. The following was added to the default config file `/etc/nginx/nginx.conf`:
```
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
**To make changes:**
- Edit the config file: `sudo vi /etc/nginx/nginx.conf`
- ALWAYS check the syntax `sudo nginx -t`
- Restart the nginx reverse proxy `sudo systemctl restart nginx`
- Check status `sudo systemctl status nginx`

