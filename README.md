# Cashbalance

> Hosted on: https://schwertlilie.github.io/cashbalance/

Track your money flow. The app is a static webpage that can be installed as an app and connects to a WebFS backend. Your data is stored on your WebFS backend server, so you have full controll over your data.

## Setup

Install npm
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

Clone project
```bash
git clone --recurse-submodules git@github.com:Schwertlilie/cashbalance.git
```

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