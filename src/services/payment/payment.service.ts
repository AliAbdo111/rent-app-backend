import fetch from 'node-fetch';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async paymentByCard(product: any, user: any) {
    try {
      const token = await this.getTokenFromAPI();
      const orderId = await this.createOrder(token, product);
      return this.generatePaymentUrlCard(token, orderId, product, user);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from Payment Service: ${error}`,
      );
    }
  }
  async paymentBySouhoola(product: any, user: any) {
    try {
      const token = await this.getTokenFromAPI();
      const orderId = await this.createOrder(token, product);
      return this.generatePaymentUrlSOUHOOLA(token, orderId, product, user);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from Payment Service: ${error}`,
      );
    }
  }
  async paymentByValu(product: any, user: any) {
    try {
      const token = await this.getTokenFromAPI();
      const orderId = await this.createOrder(token, product);
      return this.generatePaymentUrlValu(token, orderId, product, user);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from Payment Service: ${error}`,
      );
    }
  }
  async paymentByMobileWallet(product: any, user: any) {
    try {
      const token = await this.getTokenFromAPI();
      console.log(`Token Is :${token}`);
      const orderId = await this.createOrder(token, product);
      console.log(`orderId Is :${orderId}`);
      return await this.generatePaymentUrlMobileWallet(
        token,
        orderId,
        product,
        user,
      );
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error from Payment Service: ${error}`,
      );
    }
  }

  private async getTokenFromAPI(): Promise<string> {
    const data = {
      api_key: process.env.API_KEY_PAYMENT,
    };
    const response = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const { token } = await response.json();
    return token;
  }
  private async createOrder(token: string, product: any): Promise<number> {
    const data = {
      auth_token: token,
      delivery_needed: false,
      amount_cents: product?.price,
      currency: 'EGP',
      items: [],
    };
    const response = await fetch(
      'https://accept.paymob.com/api/ecommerce/orders',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const { id } = await response.json();
    return id;
  }

  private async generatePaymentUrlCard(
    token: string,
    orderId: number,
    product: any,
    user: any,
  ): Promise<{ ifarmUrl: string; _id: number }> {
    const price = product?.price * 100;
    const data = {
      auth_token: token,
      amount_cents: price,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: 'NA',
        email: user.email,
        floor: 'NA',
        first_name: user.firstName,
        street: 'NA',
        building: 'NA',
        phone_number: user.phone,
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'NA',
        last_name: user.lastName,
        state: 'NA',
      },
      currency: 'EGP',
      integration_id: 4486052, // integration id
    };
    const response = await fetch(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    //four step send request with type method payment used
    const { token: paymentToken } = await response.json();
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/824831?payment_token=${paymentToken}`;
    return { ifarmUrl: iframeUrl, _id: orderId };
  }
  private async generatePaymentUrlSOUHOOLA(
    token: string,
    orderId: number,
    product: any,
    user: any,
  ): Promise<{ ifarmUrl: string; _id: number }> {
    const price = product?.price * 100;
    const data = {
      auth_token: token,
      amount_cents: price,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: 'NA',
        email: user.email,
        floor: 'NA',
        first_name: user.firstName,
        street: 'NA',
        building: 'NA',
        phone_number: user.phone,
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'NA',
        last_name: user.lastName,
        state: 'NA',
      },
      currency: 'EGP',
      integration_id: 4486052, // integration id
    };
    const response = await fetch(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const { token: paymentToken } = await response.json();
    const iframeUrl = `https://accept.paymobsolutions.com/iframe/${paymentToken}`;
    return { ifarmUrl: iframeUrl, _id: orderId };
  }
  private async generatePaymentUrlMobileWallet(
    token: string,
    orderId: number,
    product: any,
    user: any,
  ): Promise<{ ifarmUrl: string; _id: number }> {
    const price = product?.price * 100;
    const data = {
      auth_token: token,
      amount_cents: price,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: 'NA',
        email: user.email,
        floor: 'NA',
        first_name: user.firstName,
        street: 'NA',
        building: 'NA',
        phone_number: 'user.phone',
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'NA',
        last_name: user.lastName,
        state: 'NA',
      },
      currency: 'EGP',
      integration_id: 4543688, // integration id
    };
    const response = await fetch(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    //four step send request with type method payment used
    const { token: paymentToken } = await response.json();
    const result = await fetch(
      'https://accept.paymob.com/api/acceptance/payments/pay',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          source: {
            identifier: '01010101010',
            subtype: 'WALLET',
          },
          payment_token: paymentToken, // token obtained in step 3
        },
      },
    );
    return result;
  }
  private async generatePaymentUrlValu(
    token: string,
    orderId: number,
    product: any,
    user: any,
  ): Promise<{ ifarmUrl: string; _id: number }> {
    const price = product?.price * 100;
    const data = {
      source: {
        identifier: '01010101010',
        subtype: 'WALLET',
      },
      payment_token: token,
    };
    const response = await fetch(
      'https://accept.paymob.com/api/acceptance/payments/pay',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          identifier: 'wallet mobile number',
          subtype: 'WALLET',
        },
        payment_token: token, // token obtained in step 3
      },
    );
    return response;
  }
}
