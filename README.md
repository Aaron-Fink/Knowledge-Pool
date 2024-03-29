# The Knowledge Pool #  

As an <em>avid</em> Magic the Gathering player and a Software Engineer I wanted to combine my these two parts of my life. This application is meant to make finding specific cards incredibly easy. This repository is part of my journey in the Hack Reactor bootcamp given a time period of 24 hours to complete which is an incredibly daunting task by itself. I had so much fun working on this application under the time constraint.

In order to complete work on the project I had to gather all of the information about magic cards from somewhere. Initially I was using the official [Magic the Gathering API](https://docs.magicthegathering.io/) however I quickly realized that the image quality was not great when rendered. Due to this, I decided to utilize the [Scryfall API](https://scryfall.com/docs/api) instead as they have various sized images for each card.

# Walkthrough #

To start off the applicaiton I wanted to ensure that the user interface was easy to use. Utilizing [Material UI](https://material-ui.com/) allowed me to leveraged pre-created components saving time in this 24 hour window. In combination with [ReactJS](https://reactjs.org/) I created this basic UI.

![Main Page](https://raw.githubusercontent.com/Aaron-Fink/The-Knowldege-Pool/main/misc/theknowledgepoolhome.png)
<h6 align="center">Card: Frantic Search | Artist: Mitchell Malloy</h6>



Clicking through the dropdowns allow a user to specify what kinds of cards a user would like to display. Then a request will be made to the Scryfall API fetching the all cards that match the users query 200 at a time.

![Search Results](https://raw.githubusercontent.com/Aaron-Fink/The-Knowldege-Pool/main/misc/theknowledgepoolsearch.png)


Additionally clicking on the card will expand the card making it easier to see. Should there be more than 200 cards that match the query an infinite scrolling feature allows a seamless transition to load the next batch of cards onto the page.

![Expanded Card](https://raw.githubusercontent.com/Aaron-Fink/The-Knowldege-Pool/main/misc/theknowledgepoolexpand.png)


Below is a gif featuring the infinite scroll used. For this search it is simply showing all blue cards as the search showed above did not provided enough results.

![Infinite Scroll](https://raw.githubusercontent.com/Aaron-Fink/The-Knowldege-Pool/main/misc/theknowledgepoolscroll.gif)


# Built With #

<ul>
  <li>ReactJS</li>
  <li>Material UI</li>
  <li>Node.js + Express</li>
  <li>Scryfall API</li>
</ul>
