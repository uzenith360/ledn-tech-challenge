import { env } from "process";

export default (
    apiKey: string, 
    done: (err: Error | null, user?: Object | undefined, info?: Object | undefined) => void,
    ) => {
    if (env.API_KEY === apiKey) {
        return done(null, {});
    }

    return done(null);
}
