# Storefront Backend API
## Project two of my Udacity nano degree

To use the API, follow the steps below.
## **Step 1 -- Setup and configuration**

1. Run the command below to install `node_modules`.
    ```bash
    npm i
    ```
1. After the `node_modules` folder has been installed, check the `package.json` file for the dependencies and devDependencies and install them as follows.
    * You can use either `npm` or `yarn` for installation.
    * If you use `yarn` as your package installer, follow **step 1**, if you use `npm`, follow **step 2**:
        1. ### **YARN**
            Installing the dependencies
            ```bash
            yarn add bcrypt body-parser cors jasmine jasmine-spec-reporter jsonwebtoken morgan nodemon pg express dotenv db-migrate db-migrate-pg
            ```
            Installing the devDependencies

            ```bash
            yarn add --dev typescript ts-node tsc-watch prettier jasmine-ts eslint-plugin-prettier eslint-config-prettier eslint @types/node @types/bcrypt @types/body-parser @types/cors @types/express @types/jasmine @types/jsonwebtoken @types/morgan @types/nodemon @types/pg @typescript-eslint/eslint-plugin @typescript-eslint/parser
            ```
        1. ### **NPM**
            Installing the dependencies
            ```bash
            npm i bcrypt body-parser cors jasmine jasmine-spec-reporter jsonwebtoken morgan nodemon pg express dotenv db-migrate db-migrate-pg
            ```

            Installing the devDependencies
            ```bash
            npm i -D typescript ts-node tsc-watch prettier jasmine-ts eslint-plugin-prettier eslint-config-prettier eslint @types/node @types/bcrypt @types/body-parser @types/cors @types/express @types/jasmine @types/jsonwebtoken @types/morgan @types/nodemon @types/pg @typescript-eslint/eslint-plugin @typescript-eslint/parser
            ```
1. The `tsconfig.json`, `eslint.json` and `.prettierrc` are already configured for you. Don't worry about that.

1. >>**THE Server IS RUNNING ON `http://localhost:5000`**

1. **Creating user**
    ```postgres
    CREATE USER store_manager WITH PASSWORD 'password123';
    ```
    **Creating databases**
    ```postgres
    CREATE DATABASE store;
    CREATE DATABASE store_test;
    ```
    **Granting privileges to user**
    ```postgres
    GRANT ALL PRIVILEGES ON DATABASE store TO store_manager;
    GRANT ALL PRIVILEGES ON DATABASE store_test TO store_manager;
    ```
## **Step 2 - Running the tests**
* This will be simple, simply run the command below and watch.
    ```bash
    npm run test
    ```
* You should see this as the results.
    ![Tests successful](images/tests.PNG)

## **The endpoints are listed in** [Requirements.md](Requirements.md)