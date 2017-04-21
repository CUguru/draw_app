# DrawApp using NodeJS and websockets

DrawApp is a simple collaborative drawing app that allows users who are connected on the same internet IP address
to draw on the same art board.

## Installation

To be able to run the program on your computer, you will need to download and install nodejs and the npm package manager.
To download node, head to the [NodeJS website](https://nodejs.org/en/download/), and download the best version for your operating system.
npm comes preinstalled with node.

## Check if npm is installed
To check if npm is intsalled, type in the command `npm -v`, this should show the latest version of npm, which at the time of writing was `4.2.0`.

## Running the DrawApp
- Download the zipped file from the [DrawApp repo](https://nodejs.org/en/download/) and unzip it.
- Navigate to the folder in your terminal and install the dependencies needed for the program to run.
```bash
cd draw_app
npm install
```
- Once we have our modules installed, run the command `node server.js`
- This will show you the port the app is running on:

```bash
Server running on 127.0.0.1:8080
```

## Collaborating with other people on the same network
- To draw with other people on the same drawing board, go into your system preferences and check your network IP address.
- Users can then navigate to their browsers and type in:
```bash
IPAddress/index.html
```
- This will take them to the art board page in their own browser and they can begin drawing as well.

Any updates each user makes will be seen by the other collaborators because the websockets functionality allows for live updates between browsers.
