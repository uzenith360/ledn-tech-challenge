import fs from 'fs';

export default (filePath: string): Promise<string> =>
    new Promise(
        (resolve, reject) =>
            fs.readFile(
                filePath,
                {encoding: 'utf-8'},
                (err: NodeJS.ErrnoException | null, content: string) => {
                    if (err) {
                        reject(err);

                        return;
                    }

                    resolve(content);
                },
            ),
    );
