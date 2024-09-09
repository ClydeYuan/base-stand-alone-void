import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async postVoidRequest(requestBody) {
    const transactionReferenceNoFromRequestBody =
      requestBody.transactionReferenceNo;
    const reasonFromRequestBody = requestBody.reason;
    const reasonCodeFromRequestBody = requestBody.reasonCode;
    const requestReferenceNumber = requestBody.requestReferenceNumber;

    console.log(transactionReferenceNoFromRequestBody);
    console.log(reasonFromRequestBody);
    console.log(reasonCodeFromRequestBody);
    console.log(requestReferenceNumber);

    const paymayaVoidRequestBody = {
      transactionReferenceNo: transactionReferenceNoFromRequestBody,
      reason: reasonFromRequestBody,
      reasonCode: reasonCodeFromRequestBody,
    };

    const paymayaSecretKey = 'sk-aXQdorOOF0zGMfyVAzTH9CbAFvqq1Oc7PAXcDlrz5zz';

    const paymayaVoidRequestHeaders = {
      'Content-Type': 'application/json',
      'Request-Reference-No': requestReferenceNumber,
      Authorization: `Basic ${btoa(paymayaSecretKey)}`,
    };
    console.log(paymayaVoidRequestBody);
    console.log(paymayaVoidRequestHeaders);

    const paymayaVoidApiUrl = 'https://pg-sandbox.paymaya.com/p3/void';

    const p3VoidRequest = this.httpService
      .post(paymayaVoidApiUrl, paymayaVoidRequestBody, {
        headers: paymayaVoidRequestHeaders,
      })
      .pipe(
        map((okRes: AxiosResponse) => {
          return okRes.data;
        }),
        catchError((errRes: AxiosError) => {
          return of(errRes.response?.data);
        }),
      );
    const p3VoidResponse = await lastValueFrom(p3VoidRequest);

    return p3VoidResponse;
  }
}
