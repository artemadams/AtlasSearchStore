## MongoStore Sample Application

<h3>MongoStore Hackathon</h3>

Hello! 👋 This e-commerce application allows you to search lightning fast through a wide variety of data types through a dataset of Amazon products.

<br/>
<div align="center">
<img src="ECommerce.png" width="450"  />
</div>
<br/>

<p>MongoStore implements many Atlas Search features from autocomplete to custom function scoring. Using the $search operator in a MongoDB aggregation pipeline, we can build fine-grained searches across text, numerics, and geospatial data.</p>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

Current features implemented in this e-commerce application include:

-   **authentication and authorization**
-   fuzzy matching
-   highlighting
-   autocomplete
-   relevance-based scoring
-   custom function scoring

Future Atlas Search features to implement can include:

-   [ ] range queries
-   [ ] facets
-   [ ] synonyms

<h2 align="center"><a href="https://mongostoreapp-dnerj.mongodbstitch.com">https://mongostoreapp-dnerj.mongodbstitch.com</a></h2>

<p>This application was created using:</p>

-   React
-   Tailwind CSS
-   MongoDB Realm for backend HTTPs endpoints and webhooks
-   A sample dataset of Amazon products

<h3>API Points of Integration</h3>
This application is hosted entirely on Realm and calls 2 API endpoints:
 
 * getProductsEndpoint in the Home.js page on line 24
 * Suggestions_AC_Endpoint, used for autocompleted product names, in the Header.js component on line 17.

<h3>Prerequisites</h3>

-   A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
-   A recent version of Node.js and npm.
-   Amazon product sample dataset
-   (Recommended) <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass - GUI</a>

<h3>Instructions</h3>

In the project directory, you can run:

#### `npm install`

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Authentication and Authorization

Steps to reproduce the funcationality with Atlas App Services:

### Activate email password authentication provider

![1](/docs/1.png?raw=true "1")

### Activate custom user data

![2](/docs/2.png?raw=true "2")

### Define the interceptor function condition

![9](/docs/9.png?raw=true "9")

### Create custom data interceptor function

![5](/docs/5.png?raw=true "5")

### Verify custom user data in the collection

![4](/docs/4.png?raw=true "4")

### Use Application Authentication for Functions modifying the collection data

![6](/docs/6.png?raw=true "6")

### Setup Rules for Functions modifying the collection data

![8](/docs/8.png?raw=true "8")
![7](/docs/7.png?raw=true "7")

## GraphQL and MongoDB Atlas Search

Trigger Search queries with GraphQL:

### Create a custom GraphQL resolver

![1](/docs/g1.png?raw=true "1")

### Setup input and return types for GraphQL

![1](/docs/g2.png?raw=true "1")

### Create a custom function for the GraphQL resolver

![1](/docs/g3.png?raw=true "1")
