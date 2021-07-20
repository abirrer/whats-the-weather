# Whats the Weather App

## Overview

<p>A simple weather app using the OpenWeatherMap Api.  Users can search the weather & details of a specific city or click to see the details of cities already on the dashboard. </p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

<p>HTML, CSS modules, Javascript, React, Next</p>

## Details

Completed:
<ul>
    <li>App features 2 main pages: a dashboard and a detail page. On the dashboard, a user can search for/add additional cities to their dashboard. On the detail page, the application fetches weather details of the specific city selected.
    <li>Conversion/formatting of the weather data into a consumable format for the user.
    <li>Loading message is shown when the application is fetching data.
    <li>Error message is shown if there was a problem with fetching data. 
    <li>Response to different device sizes.
</ul>

Improvements:
<ul>
    <li>Passing of the location value from homepage to detail page is easily tampered with (currently using router/params but could have also used some type of state mgmt with redux, also context api).
    <li>Consider another location to make API request and store the data so that different pages can access data (like city name and temp on the dashboard and all details in the detail page).
    <li>Maintain updated city list after user addition (on refresh and back/forth navigation).
    <li>Input validation at the time of submit re: is duplicate, is an acceptable location/spelled correctly, etc.
    <li>Input validation error message to appear with specific, helpful context.
    <li>Back arrow for user to navigate to the homepage within the application.
    <li>Allow user to click enter key to submit input.
    <li>User selection of units (metric vs imperial, etc.).
    <li>Break up css module into css modules for each respective page/component. Currently using a single css module.
    <li>Further componentize the two parts of the main pages (for example, the dashboard could separate out the input form into a component, the data boxes on the detail page could also be their own components).
    <li>Unit & integration tests needed.
</ul>

Known Issues:
<ul>
    <li>Hide my API key!
    <li>Input validation with the default list of cities needs to check for capitalizations, special characters, etc.
    <li>Detail page refresh results in error every single time > want this to make a proper API request upon refresh.
    <li>Sunset/sunrise timing is not location specific, it is provided in UTC across the board.
</ul>
