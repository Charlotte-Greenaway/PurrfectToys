# Purrfect Toys - E-Commerce Website for Cat Toys

This e-commerce website is built using the  combination of Next.js, NextAuth.js, Sanity CMS, and PayPal integration to provide a seamless shopping experience for both users and administrators.

<img width="946" alt="image" src="https://github.com/Charlotte-Greenaway/PurrfectToys/assets/134973389/f904945e-1b16-4769-9844-7ebd381f3bcc">

## Demo

https://purrfecttoys.charlotte-greenaway.com/


## Features

- Modern and Responsive Design
- Next.js Framework
- Authentication with NextAuth.js
- Content Management with Sanity
- Payment Processing with PayPal
- Product Listings and Details
- Shopping Cart and Checkout
- User Accounts and Order Management


## Installation

Install purrfect toys by cloning the repo
run 
```bash
    vercel link
```

```bash
  pnpm i && pnpm dev
```
    
## Environment Variables

To run this project, you will need to add your own version of the following environment variables to your .env file

```
NEXT_PUBLIC_SANITY_PROJECT_ID="project id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_SANITY_TOKEN="token"

#next auth
NEXTAUTH_SECRET="secret"
NEXTAUTH_URL="http://localhost:3000"

#zoho email credentials
EMAIL_USER="credentials"
EMAIL_PASS="password"
EMAIL_SERVER_HOST="host"
EMAIL_SERVER_PORT=465
EMAIL_FROM="credentials"

#paypal
NEXT_PUBLIC_PAYPAL_CLIENT_ID="client id"
PAYPAL_SECRET="secret"
```


## Feedback

If you have any feedback, please reach out to me me@charlotte-greenaway.com

