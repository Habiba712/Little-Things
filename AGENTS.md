#Little Things


## Project overview
Little things is a mobile application for collecting meaningful everyday experiences.

## Description
Little things is a mobile app, built with react native. It's designed to be for persoanl journal enties, like recipes, coffee, books and special moments. But te main reason behind it is testing the securoty of a react native app, its deployment and CI/CD cycle

## Tech stack
-React Native
-Expo
-MongoDB
-Mongoose
-Node.js
-Express


## Architecture
little-things is the frontend of the application.
server is the backend of the application.
little-things: src/ contains screens and components.
server: routes/ contains routes for the server.


## Important conventions
-Preserve exisiting navigation behaviour
-Avoid introducig unecessary dependencies
-Only use StoreSecure or LocalStorage for session token, username, and onboaring state, any other dat ashould come form the database
-Preserve the personal humain touch of the existing code and use the same level of reasoning and expertise level for futur code

## Commands
-<code-test> Test the existing code for any potential vulnerabilities and errors 
-<commit-changes> commit the tested and fixed changed to the local depo