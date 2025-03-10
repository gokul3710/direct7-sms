# Direct7SMS

Direct7SMS is a simple Node.js wrapper for the D7 Networks SMS API. It allows you to authenticate, send SMS messages, retrieve message statuses, and check country-specific pricing.

## Installation

```sh
npm install gokul-direct7-sms
```

## Usage

### Import the module

```javascript
const Direct7SMS = require('gokul-direct7-sms');
```

### Initialize the client

```javascript
const smsClient = new Direct7SMS();
```

### Authenticate with API

```javascript
(async () => {
    try {
        await smsClient.init('your_client_id', 'your_client_secret');
        console.log('Authenticated successfully');
    } catch (error) {
        console.error('Authentication failed:', error);
    }
})();
```

### Send an SMS

```javascript
(async () => {
    try {
        const response = await smsClient.sendSms({
            recipients: ['+1234567890'],
            content: 'Hello, this is a test message.',
            msg_type: 'text',
            report_url: 'https://your-callback-url.com/report'
        });
        console.log('Message sent successfully:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
})();
```

### Get Message Status

```javascript
(async () => {
    try {
        const status = await smsClient.getMessageStatus('request_id_here');
        console.log('Message Status:', status);
    } catch (error) {
        console.error('Error fetching message status:', error);
    }
})();
```

### Get Country-specific Pricing

```javascript
(async () => {
    try {
        const pricing = await smsClient.countryMessagePricing('US');
        console.log('Pricing Information:', pricing);
    } catch (error) {
        console.error('Error fetching pricing information:', error);
    }
})();
```

## Error Handling
All methods throw errors if something goes wrong, so ensure you handle exceptions properly using `try-catch` blocks.

## Dependencies
- [axios](https://www.npmjs.com/package/axios): For making HTTP requests.

## License
This project is licensed under the MIT License.