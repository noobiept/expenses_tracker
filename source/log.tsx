import config from "./config.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shouldLog(fn: (...args: any) => any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any) {
        if (!config.log) {
            return;
        }

        return fn(...args);
    };
}

function _logError(message: string) {
    console.error(message);
}

function _logMessage(message: string) {
    console.log(message);
}

export const logError = shouldLog(_logError);
export const logMessage = shouldLog(_logMessage);
