![logo](logo2.png)
## Inspiration
When you think back to the earliest forms of communication— people would send out messages in bottles just for the sake of potentially reaching someone on a completely different walk of life than them. 
Taking this concept as inspiration, our team wanted to go back to these roots of social connection. 

In many ways, conventional social media can be isolating: we all know the dread of not being validated by likes or comments on something we have posted. On these platforms, the focus becomes gaining engagement rather than writing meaningful or honest content.

CastAway is our way of providing a space for people to indulge in a purer form of human connection during this age of complicated and combative social networks.

## What it does
CastAway lets you geocache your post anywhere in the world in the form of a bottled message. You can discover hidden messages written by other users across the globe - when you find one, you have the option to reply once to simulate a fleeting connection with someone new. Whether you find the same person again is up to fate! 

When you create a new message, you have the option of specifying how long your message takes to arrive, whether your message is sent directly to a specific user, or even if you want to hide money in the bottle.

Once sent, users can check the status of their messages and see where in the world their message ended up. Users that open bottles can read messages and reply.

We want to move the conversation around social media away from engagement to dialogue: with no retweets or favorites, CastAway allows users to focus on crafting meaningful and personal messages.

Our platform leverages the truly global scale of social media - allowing users to literally broadcast their message to anywhere in the world - while fostering real, intimate connections.

## How we built it
Our platform is powered by several great technologies:

- A React.js frontend app provides a clean interface that negotiates interactions between our users and the backend.
- A Django codebase serves a RESTful API to manage data storage, including user accounts, bottles, and payments.
- Google Cloud Platform w/ Google App Engine provides hosting for both our frontend and backend.
- The Google Maps Javascript API allows us to display bottles in a fun and informative way.
- The Checkbook.io API enables users to hide money in bottles and send directly to their contacts.

We designed our platform in Figma.

## Challenges we ran into
Initially, we wanted to simulate the movements of bottles in the ocean using surface speed current data. We soon realized that this idea was very challenging, and it prompted us to consider what other features users would value more. In the end, we decided that integrating the Checkbook API instead would provide more functionality to our platform. We learned that feature creep can severely hinder development speed if left unchecked.

No members of our team had ever deployed an app on Google Cloud Platform before, and so we encountered a steep learning curve on that front. Some challenges included syncing our local and remote databases through the Cloud SQL Proxy and safely storing environment variables. Eventually, we were able to fix these problems and our app is fully running in the cloud.

Integrating our frontend with our backend through a RESTful API was an uphill battle: we had to make sure that we could securely talk to our Django app and not needlessly expose information that bad actors could exploit. This involved setting up a token system that kept the user authenticated between page requests. In addition, we had to debug errors that arised between the frontend and the backend, such as form data not being encoded properly.

## Accomplishments that we're proud of
Part of what makes us so proud of CastAway is its seamless integration with other powerful services. Integrating the Checkbook.io and Google Maps API are two examples of great technologies we are glad we had the chance to incorporate into our platform to better it.

In terms of the product itself, we’re extremely happy with the completed social network that we’re putting forward in this project. We’ve created an end to end network built for the conveniences of our users.

## What we learned
We learned more about react and how to actually run an app on GCP. Another huge moment of learning was our progress in interacting with external APIs, namely Checkbook.io and preliminary work with ArcGIS. 

This was also one of our team member’s first hackathons so they learned about the entire process of developing a web app, frontend and backend, and how hackathons run in general! 

## What's next for CastAway
While we have the Checkbook.io API integrated, we currently do not have a way to securely collect and store banking information. This would be our immediate next step in improving the functionality of our platform.

We also see that CastAway has the potential to be educational - teaching students about different parts of the world through bottles hidden around the globe. Developing this side of the platform would be beneficial as an interactive tool for learning.
