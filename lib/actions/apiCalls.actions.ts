import { ApiMethod } from "@prisma/client";
import prismadb from "../prismadb";

interface ApiCallParams {
  req: Request;
}

export const createApiCall = async ({ req }: ApiCallParams) => {
  const url = new URL(req.url);
  try {
    const apiCall = await prismadb.apiCall.create({
      data: {
        method: req.method as ApiMethod,
        origin: req.headers.get("referer") || req.headers.get("origin") || "",
        url: req.url,
        mode: req.mode,
        credentials: req.credentials,
        header_date: req.headers.get("date") || "",
        connection: req.headers.get("connection") || "",
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        port: url.port,
        searchParams: url.searchParams.toString(),
      },
    });
    return apiCall;
  } catch (error: any) {
    throw new Error(`Failed to create apiCall: ${error.message}`);
  }
};
