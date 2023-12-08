export interface ISendEmailUseCase {
    execute(to: string, from: string, body: string, subject: string): Promise<void>
}

export class SendEmailUseCase implements ISendEmailUseCase{
    execute(to: string, from: string, body: string, subject: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}