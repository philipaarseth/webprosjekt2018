# webprosjekt2018


## How to get started

1. Install a local server such as Mamp, Xampp etc

2. Put latest wordpress files on in your local server folder

3. Install Divi theme

  1. Download Divi files at  [this link](https://ln.sync.com/dl/2ef1e4c20/3pkaz7x3-gjgbyugh-gckgu94y-wcyg2jj2)

  2. Put Divi files in your wp-content/themes/ folder

4. Create directory divichild in your wp-content/themes/ folder

5. Git clone in the files from this repo into "divichild"

6. Start making changes!




## WordPress-Git Red Flags
### Somethings to think about
There are a few problems endemic to using Git and WordPress together:

* How do you handle wp-config.php since it will be different on the local and production servers and you don’t want it exposed in a public repository?

* How do you deal with media files? Does it make sense to copy them all from the production server to your local development environment on a periodic basis?

* Does it make sense to include the entire WordPress core and third-party themes and plugins in your Git repository, or should you limit Git’s tracking to custom plugins and custom theme modifications?

* How do you keep the database updated between the local and production servers?
