export class Log {
    static info(message: string) {
        console.log(`${this.getTimestamp()} [INFO] ${message}`);
    }

    static warn(message: string) {
        console.log(`${this.getTimestamp()} [WARN] ${message}`);
    }

    static error(error?: unknown) {
        console.error(
            `${this.getTimestamp()} [ERROR] ${this.getErrorMessage(error)}`
        );
    }

    private static getErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }

    private static getTimestamp() {
        const d = new Date();
        return (
            toPaddedString(d.getDate()) +
            "-" +
            toPaddedString(d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            toPaddedString(d.getHours()) +
            ":" +
            toPaddedString(d.getMinutes()) +
            ":" +
            toPaddedString(d.getSeconds())
        );
    }
}

function toPaddedString(input: number) {
    return input.toString().padStart(2, "0");
}
