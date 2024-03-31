interface CheckServiceUseCase {
    execute (url: string): Promise<boolean>
}

export class CheckService implements CheckServiceUseCase {
    async execute(url: string): Promise<boolean> {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error on check service ${url}`);
            console.log(`${url} is ok`);
            return response.ok;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}