# Regis e-commerce

NextJS application to sell cut files

## App Architecture

### Main Framework

    For both frontend and backend is NextJS, React is on of the most popular libraries for frontend allowing to create components that represent de ui.
    React 18 introduced server components allowing the development of a whole application with react, combined with NextJS we can handle server logic though rest APIs and serverless functions.
    NextJS shines on server side rendering, allowing the development of fast, scalable and SEO optimized web applications.

### Styling

    Tailwind css for precise and fast styling with shad/cn to bootstrap custom style components

### Databases

    Expected early traffic is low, product characteristics is not very well defined at the moment of development and is subject to change in the future,
    most files will be between 10 and 20 MBs in disk size so for this reason I choose MongoDB, being NoSql allows for easy changes in the data schema.
    To start we will set up a Atlas MongoDB Cluster (cloud database), for files we will be using GridFS.

### Important Libraries

    Zustand - A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like. I felt redux even redux-toolkit was unnecessary since it adds complexity and too much boiler plate.
    TanStack React Query - gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences

### Security considerations

    We do not want to store any kind of sensitive information, in order to manage users we will use NextAuthJS and implement a 0auth service, for payments Paypal gateway was the chosen method by the client.
    Sanitize inputs with DomPurify to prevent XSS attacks
    Protect API routes with user roles and rate limiting if necessary
    Protect HTTP Request with HelmetJS library

### Testing

    Jest for unit tests, React testing library for integration and component test and postman for manual API testing

### Deployment

    Since we are expecting low traffic early on we choose vercel for the ease of deployment of NextJS application and it provides free tier to run our business while we set up.

### Budget

    Is relatively low, for hosting and databases we will start with free plans, once the site get more popularity we can upgrade to a pay plan to handle traffic.
    This stack allows for fast development, robustness and scalability.

## Getting Started

    To run the development server use the package manager of your choice, this project was bootstrap with npm

Install Node Modules

```bash
pnpm install
```

Set env file

    create a .env file at root directory, use the example template

Run Development server

```bash
pnpm dev
```

App is started at [http://localhost:3000](http://localhost:3000).
