# Covid In York (Server)

This was the application that backed https://covidinyork.netlify.app until I shut it down on Oct 8 2022.

A daily job would run (`create_new_daily.js`) that scraped the day's data from York Region and inserted it into a DB.

I've now made this repo public and replaced the original seed data with all the data we had upon shutdown: `seed_data/dailies.js` for anyone that wants it.

Code for the frontend application can be found here: https://github.com/jasonflorentino/covid-in-york-region

It now relies on static data instead of this backend application.

— Jason, Oct 2022.
