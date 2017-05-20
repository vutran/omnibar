/**
 * Filter your extension through a command prefix. (eg: 'user')
 *
 * @param {Omnibar.Extension} extension
 * @param {string} command
 * @return {Omnibar.Results}
 */
export function command<T>(extension: Omnibar.Extension<T>, command: string): Omnibar.Extension<T> {
    const prefix = new RegExp(`^${command}\\s`, 'i');

    return (query: string) => {
        // down-case for comparison
        const lc = command.toLowerCase();
        const lq = query.toLowerCase();

        if (lc === lq) {
            return [];
        }

        if (!lq.startsWith(lc + ' ')) {
            return [];
        }

        return extension(query.replace(prefix, '').trim());
    };
}
