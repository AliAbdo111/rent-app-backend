import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  // the third steps used any method payment
  async firstStepPayment(product: any, user: any) {
    console.log(product);
    console.log(user);
    const data = {
      api_key: process.env.API_KEY_PAYMENT,
    };
    const request = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    const token = response?.token;
    return this.secondStep(token, product, user);
  }

  async secondStep(token: string, product: any, user: any) {
    const data = {
      auth_token: token,
      delivery_needed: 'false',
      amount_cents: product?.price,
      currency: 'EGP',
      items: [],
    };
    const request = await fetch(
      'https://accept.paymob.com/api/ecommerce/orders',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const response = await request.json();
    console.log(response);
    const id = response?.id;
    return this.thirdStep(token, id, product, user);
  }

  async thirdStep(token: string, id: number, product: any, user: any) {
    console.log(user);
    const data = {
      auth_token: token,
      amount_cents: product?.price,
      expiration: 3600,
      order_id: id,
      billing_data: {
        apartment: '',
        email: user.email,
        floor: '42',
        first_name: user.firstName,
        street: '',
        building: '',
        phone_number: user.phone,
        shipping_method: '',
        postal_code: '',
        city: '',
        country: '',
        last_name: user.lastName,
        state: '',
      },
      currency: 'EGP',
      integration_id: 4486052, ////integration id
    };
    const request = await fetch(
      ' https://accept.paymob.com/api/acceptance/payment_keys',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    const responce = await request.json();

    const theToken = responce.token;
    return this.cardPayment(theToken, id);
  }

  async cardPayment(token: string, _id: any) {
    const ifarmUrl = `https://accept.paymob.com/api/acceptance/iframes/824831?payment_token=${token}`;
    return { ifarmUrl, _id };
  }
}
