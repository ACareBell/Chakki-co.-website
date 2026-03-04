# Website deploy (GitHub → server)

Repo: **https://github.com/ACareBell/Chakki-co.-website**

## On your Mac (when you change the site)

```bash
cd /Users/rivyansinghal/graingo/website

git add .
git commit -m "Your message, e.g. Update privacy page"
git push origin main
```

## On the website server (65.2.177.134)

### First-time setup (clone)

```bash
ssh -i ~/.ssh/ChakkiWebsite.pem ubuntu@65.2.177.134

sudo rm -rf /var/www/chakki-website
sudo git clone https://github.com/ACareBell/Chakki-co.-website.git /var/www/chakki-website
sudo chown -R www-data:www-data /var/www/chakki-website
sudo nginx -t && sudo systemctl reload nginx
```

### Every time after you push (update)

```bash
ssh -i ~/.ssh/ChakkiWebsite.pem ubuntu@65.2.177.134

cd /var/www/chakki-website
sudo git pull origin main
sudo chown -R www-data:www-data /var/www/chakki-website
```

No nginx reload needed for static file changes.
