# The New Herald Client

The New Herald is a second iteration of a previous project 'The Reactive Herald', made to function as a online news room. Users can browse short snippets of articles for free or can pay for a subscription to see full articles. Journalists can log on to create their articles and attach an image, which is stored on amazon web services. An article is not publically displayed until it is published by a publisher. Articles are grouped by category and the application's displayed language can be switched between swedish and english if the visitor/user desires.

## Deployed Site
https://the-reactive-herald.netlify.com/

## Dependencies
- React 16.12.0
- Feature/Unit tests with Cypress
- i18next
- Axios
- J-tockauth
- React Redux
- Stripe

## To run setup
#### Clone repository
```
$ git clone https://github.com/EevanR/the-new-herald-client.git
$ cd the_new_herald_client
```

#### Install dependencies
Install Cypress and dependencies
```
$ yarn
```
Install Cypress Testing
```
$ yarn add cypress --dev
```

## Run testing frameworks
In console:
Initiate and Run Cypress 
```
$ yarn cy:open
```
Select any of the test files in newly opened window to run through automated testing scenarios

## Actions available to the user

Head to the deployed address listed above and have a look around.

Log in as various roles to check functionality;

#### To review and publish articles
visit: https://the-reactive-herald-ca.netlify.com/admin  
Publisher:  
email: publisher@mail.com  
pass: password

#### To view full articles as subscriber
Subscriber:  
email: sub@mail.com  
pass: password

#### To write articles as journalist
Journalist:   
email: journo@mail.com  
pass: password 

Or create your own account.

## Updates/Improvement plans
- Introduce cloud services
- Give Publisher ability to set featured articles
- Automatic language translation

## License
Created under the <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>.
