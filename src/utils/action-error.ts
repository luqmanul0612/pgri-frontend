// app/errors.ts
export class ActionError<T = any> extends Error {
  status?: number;
  data?: T;
  pathname?: string;

  constructor(
    message: string,
    options?: { pathname?: string; status?: number; data?: T },
  ) {
    super(message);
    this.name = "ActionError";
    this.status = options?.status;
    this.pathname = options?.pathname;
    this.data = options?.data;
  }
}

export const getLogActionServer = (vari: any = "", res: any, err: any) => {
  if (res) {
    console.log("\x1b[34m%s\x1b[0m", `REQUEST: ${(res as any).pathname}`, vari);
    console.log("\x1b[32m%s\x1b[0m", `RESPONSE: ${(res as any).pathname}`, res);
  } else {
    console.log("\x1b[34m%s\x1b[0m", `REQUEST: ${(err as any).pathname}`, vari);
    console.log("\x1b[31m%s\x1b[0m", `Error: ${(err as any).pathname}`, {
      ...err,
      message: err.message,
    });
  }
};
