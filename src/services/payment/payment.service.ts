import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  // the third steps used any method payment
  async firstStepPayment(product: any, user: any) {
    console.log(product);
    console.log(user);
    const data = {
      api_key:
        'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RVNU56QXdMQ0p1WVcxbElqb2lNVGN3T1RBeU9ESXdNQzR6TVRreE56Y2lmUS5MaVFsSy1jcTRYYWVDbFlaSW9ueEUtdVZLZ2pmS1lvaDB1cFFJS2lIY2lfX3ZiV2hJbGNVWHN0d1JDcWp1WTBKSWgyS2RNeGtaS1dqbFljMnlOY1BBQQ==',
    };
    const request = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    const token = response?.token;
    return this.secondStep(token ,product ,user);
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
    const id = response?.id;
    return this.thirdStep(token, id, user, product);
  }

  async thirdStep(token: string, id: number, user: any, product: any) {
    const data = {
      auth_token: token,
      amount_cents: product.price,
      expiration: 3600,
      order_id: id,
      billing_data: {
        apartment: '803',
        email: 'claudette09@exa.com',
        floor: '42',
        first_name: user?.personalInfo.firstName,
        street: 'Ethan Land',
        building: '8028',
        phone_number: user?.personalInfo.phone,
        shipping_method: 'PKG',
        postal_code: '01898',
        city: 'Jaskolskiburgh',
        country: 'CR',
        last_name: 'Nicolas',
        state: 'Utah',
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
    return this.cardPayment(theToken);
  }

  async cardPayment(token: string) {
    const ifarmUrl = `https://accept.paymob.com/api/acceptance/iframes/824831?payment_token=${token}`;
    return ifarmUrl;
  }
}
