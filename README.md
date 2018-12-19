# SendIt
SendIt is a courier service that helps users deliver parcels to different destinations, SendIt provides courier quotes based on weight categories

[![Build Status](https://travis-ci.com/bobbylemm/SendIt.svg?branch=develop)](https://travis-ci.com/bobbylemm/SendIt)
[![Coverage Status](https://coveralls.io/repos/github/bobbylemm/SendIt/badge.svg?branch=ch-integrate-test-coverage-161812475)](https://coveralls.io/github/bobbylemm/SendIt?branch=ch-integrate-test-coverage-161812475)
[![Maintainability](https://api.codeclimate.com/v1/badges/068a30f75ccd73ecebd3/maintainability)](https://codeclimate.com/github/bobbylemm/SendIt/maintainability)

<h3>The UI template</h3>
<p>the template for the front end of thisapplication can be found here <a href='https://bobbylemm.github.io/SendIt/'>UI template
</a></p>

<h3>The Application</h3>
<p>The main apllication is hosted here <a href='https://fathomless-spire-38172.herokuapp.com/'>SendIt</a></p>

<h3>The Pivotal Tracker Story link can be found here <a href='https://www.pivotaltracker.com/n/projects/2213096'>PT stories</a></h3>

<h3>The API</h3>
<p>the API for this application has 12 endpoints</p>

<h2>User Roles</h2>
<hr/>
<h4>Register a user</h4>
<p>a user can register into the sendit application by just providing (email, username and password) -- the endpoint is <code> POST api/v1/auth/register</code></p>

<h4>Login a user</h4>
<p>an existing user can log into the sendit application by just providing the correct (email and password) -- the endpoint is <code> POST api/v1/auth/login</code></p>

<h4>Create a parcel</h4>
<p>an existing user can create a new parcel by providing these details(package name, dropoff location, pickup location, present location, weight, quantity) -- the endpoint is <code>POST api/v1/auth/parcel</code></p>

<h4>user view parcels created by user</h4>
<p>an existing user can view all the parcels that the the user has created -- the endpoint is <code>POST api/v1/auth/parcel</code></p>

<h4>user change dropoff location of parcel</h4>
<p>an existing user can change the dropoff location of any parcel the user has created so long as the parcel has not been delivered -- the endpoint is <code>PUT api/v1/auth/parcels/:pid/destination</code></p>

<h4>user cancel parcel order</h4>
<p>an existing user can cancel a parcel order that has been created by the user -- the endpoint is <code>PUT api/v1/auth/parcels/:pid/cancel</code></p>

<h2>Admin Roles</h2>
<hr/>
<h4>Admin can get all parcels in the application</h4>
<p>an admin can view all parcels that have been created in the application -- the endpoint is <code>GET api/v1/parcels/</code></p>