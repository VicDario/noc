interface CheckServiceUseCase {
    execute (url: string): Promise<boolean>
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error on check service ${url}`);
            this.successCallback();
            return response.ok;
        } catch (error) {
            this.errorCallback(`${error}`);
            return false;
        }
    }
}