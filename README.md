# Basic Node JS project with GraphQL and Typescript support

## Project initialization

The project has been initialized as a blank Node.js project using `yarn`:

```sh
mkdir <project-name> #create project folder
cd <project-name>
yarn init - y
```

After that it has been configured to support Typescript:

```sh
npx tsc --init --rootDir app --outDir dist --esModuleInterop --resolveJsonModule --lib ES2019 --module commonjs --allowJs true --noImplicitAny true
mkdir app dist #our main code folder and compiling folder.
```

The project uses the following dev dependencies:

```sh
yarn add -D @types/express @types/node dotenv nodemon ts-node typescript
```

The project uses the following dependencies:

```sh
yarn add @graphql-tools/schema express express-graphql graphql
```

To run the project use:

```sh
yarn dev
```

## GraphQL Resolvers

This project automatically resolve and import all the resolvers that matches the following requirements:

* All the files must placed into `graphql/resolvers` folder.
* Resolver types accepted are `mutation` and `query`.
* The path of the resolvers must be like `graphql/resolvers/*/<resolver_type>/<resolver_type>.<resolver_name>`
  * The resolver can be placed into a folder named `<resolver_type>`
  * The resolver can be named with the prefix `<resolver_type>.`
* The resolver function must be exported using `module.exports = <resolver_name>`

## GraphQL Definitions

This project automatically resolve and import all the types definitions that matches the following requirements:

* All the files must placed into `graphql/defs` folder.
* Definition files must have the `.graphql` extension.
