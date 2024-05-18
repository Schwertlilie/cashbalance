# Cashbalance

> Hosted on: https://schwertlilie.github.io/cashbalance/

Track your money flow. The app is a static webpage that can be installed as an app and connects to a WebFS backend. Your data is stored on your WebFS backend server, so you have full controll over your data.

## Setup

Install npm
```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y
```

Clone project
```bash
git clone --recurse-submodules git@github.com:Schwertlilie/cashbalance.git
```
> Use git ui of visual studio code to pull changes to make sure you are not in detached head and can commit changes.

Setup vite project
```bash
npm install
```

## Start APP Development Server

Simply start the lightning dev server using:
```bash
npm run dev
```

## Start WebFS Test Server

Start a PHP server within the `src/WebFS` folder.
```bash
cd src/WebFS
php -S localhost:8080
```

## Build the app for release

Run the build command, add and commit the dist folder and then push this folger to gh-pages.
```bash
npm run build
# rm dist/favicon.kra
git add -f dist
git commit -m "Build gh-pages."
git push
git subtree push --prefix dist origin gh-pages
```
