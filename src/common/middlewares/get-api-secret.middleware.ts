import { env } from "process";

// Create the collection of api keys
// const apiKeys: Map<string, { id: number, name: string, secret: string }> = new Map();

// apiKeys.set('123456789', {
//     id: 1,
//     name: 'API-KEY',
//     secret: env.API_KEY as string,
// });

// apiKeys.set('987654321', {
//     id: 2,
//     name: 'app2',
//     secret: 'secret2'
// });

// Your function to get the secret associated to the key id
export default (apiKey: string, done: (err: Error | null, user?: Object | undefined, info?: Object | undefined) => void) => {
    if (env.API_KEY === apiKey) {
        return done(null, {});
    }

    return done(null);
}
