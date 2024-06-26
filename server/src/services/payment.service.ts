import { Injectable } from '@nestjs/common';
import axios from 'axios'; // npm install axios
import * as CryptoJS from 'crypto-js'; // npm install crypto-js
import * as moment from 'moment'; // npm install moment
import * as crypto from 'crypto';
import Stripe from 'stripe';
import RequestWithRawBody from 'src/interfaces/requestWithRawBody.interface';
import * as zlib from 'zlib';
import { promisify } from 'util';
const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);
const accessKey = 'F8BBA842ECF85';
const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
@Injectable()
export class PaymentService {
  async getMomo(body) {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    const partnerCode = 'MOMO';
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'pay with MoMo';
    const redirectUrl = `${process.env.CLIENT_ENDPOINT}/user?slt=1`;
    const ipnUrl =
      'https://192f-171-252-188-218.ngrok-free.app/payment/successMomo';
    // const ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    const amount = '2000';
    const requestType = 'captureWallet';
    // should i provide my data here
    const extraData = Buffer.from(JSON.stringify(body)).toString('base64'); //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'vi',
    });
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };
    const result = await axios(options);
    return result.data;
  }
  async successMomo(body) {
    if (body.resultCode === 0) {
      const data = JSON.parse(
        Buffer.from(body.extraData, 'base64').toString('utf8'),
      );
      return data;
    }
  }
  async checkMomo(body: { orderId: string }) {
    const rawSignature = `accessKey=${accessKey}&orderId=${body.orderId}&partnerCode=MOMO&requestId=${body.orderId}`;
    const signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    const requestBody = JSON.stringify({
      partnerCode: 'MOMO',
      requestId: body.orderId,
      orderId: body.orderId,
      signature: signature,
      lang: 'vi',
    });
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/query',
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };
    const result = await axios(options);
    return result.data;
  }
  async getZaloPay(body) {
    console.log(body);
    const config = {
      app_id: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order: any = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
      app_user: 'user123',
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 5000,
      description: `ZaloPay - Payment for the order #${transID}`,
      bank_code: 'zalopayapp',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    try {
      const response = await axios.post(config.endpoint, null, {
        params: order,
      });

      return response.data;
    } catch (error) {}
  }
  async getStripe(body) {
    // Compress the metadata
    const compressedMetadata = await gzip(JSON.stringify(body));

    // Encode the compressed metadata in Base64
    const encodedMetadata = compressedMetadata.toString('base64');
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'vnd', // Adjust currency as needed
              product_data: {
                name: 'SunTravel thanh toán đặt vé.',
                description: 'Thanh toán đặt vé du lịch tại SunTravel.',
                images: [
                  'https://shopcartimg2.blob.core.windows.net/shopcartctn/halong.jpg',
                ],
              },
              unit_amount: body.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_ENDPOINT}/user?slt=1`,
        cancel_url: `${process.env.CLIENT_ENDPOINT}`,
        customer_email: 'vudinhan000@gmail.com',
        metadata: {
          data: encodedMetadata,
        },
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      },
    );
    return session;
  }
  async successStripe(req: RequestWithRawBody, sig: string) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_KEY,
      );
    } catch (err) {
      //console.log(`Webhook Error: ${err.message}`);
      return { status: 'error' };
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const encodedMetadata = session.metadata.data;
        const metadataBuffer = Buffer.from(encodedMetadata, 'base64');
        const compressedMetadata = await gunzip(metadataBuffer);
        const decodedMetadata = JSON.parse(compressedMetadata.toString());
        // how i can decode and return here
        return { status: 'success', data: decodedMetadata };
      case 'checkout.session.failed':
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return { status: 'error' };
  }
}
