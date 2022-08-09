enum ENV_TYPE {
    DEVELOPMENT = "development",
    TEST = "test",
    STAGING = "staging",
    PRODUCTION = "production",
}

type ENV_DEF = {
    development: boolean,
    test: boolean,
    staging: boolean,
    production: boolean,
}

const port = process.env.PORT;

// You may use this as a boolean value for different situations
const env : ENV_DEF = {
    development: process.env.NODE_ENV === ENV_TYPE.DEVELOPMENT,
    test: process.env.NODE_ENV === ENV_TYPE.TEST,
    staging: process.env.NODE_ENV === ENV_TYPE.STAGING,
    production: process.env.NODE_ENV === ENV_TYPE.PRODUCTION,
};

export {
    port,
    env,
    ENV_TYPE,
    ENV_DEF,
};