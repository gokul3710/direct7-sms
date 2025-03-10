import axios from 'axios';

export class Direct7SMS {

    private domain: string | null = null
    private token: string | null = null

    constructor() {
        this.domain = 'https://api.d7networks.com'
    }

    async init(client_id: string, client_secret: string) {
        try {

            if(!client_id || !client_secret){
                throw new Error('Invalid client_id or client_secret')
            }

            const data = new FormData();
            data.append('client_id', client_id);
            data.append('client_secret', client_secret);

            let response = await axios({
                method: 'POST',
                url: `${this.domain}/auth/v1/login/application`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data
            })

            this.token = response.data.access_token

            return {
                type: 'success',
            }

        } catch (error) {
            throw error
        }
    }

    async sendSms(data: {
        recipients: string[]
        content: string
        msg_type: string
        report_url: string
    }) {

        try {

            if(!Array.isArray(data.recipients) || !data.recipients.length  || !data.content || !data.msg_type || !data.report_url) {
                throw new Error('Invalid data')
            }

            const payload = {
                "messages": [
                    {
                        "channel": "sms",
                        "recipients": data.recipients,
                        "content": data.content,
                        "msg_type": data.msg_type,
                        "data_coding": "text"
                    }
                ],
                "message_globals": {
                    "originator": "SignOTP",
                    "report_url": data.report_url
                }
            }

            let response = await axios(`${this.domain}/messages/v1/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                data: payload
            })
            return response.data

        } catch (error) {
            throw error
        }
    }

    async getMessageStatus(request_id: string) {

        try {

            let response = await axios(`${this.domain}/report/v1/message-log/${request_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async countryMessagePricing(country_iso: string) {
        try {
            let response = await axios(`${this.domain}/messages/v1/sms/pricing`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                params: {
                    country_iso: country_iso
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
    }
}