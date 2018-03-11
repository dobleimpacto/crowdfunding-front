'use strict';


function Schema(db){
    let Khipu = new db.Schema({
        userId:String,
        payment_id: String,
        payment_url: String,
        app_url: String,
        ready_for_terminal: Boolean,
        transfer_url: String,
        simplified_transfer_url: String,
        receiver_id: Number,
        notification_token: String,
        subject: String,
        amount: Number,
        discount: Number,
        currency: String,
        status: String,
        status_detail: String,
        body: String,
        picture_url: String,
        receipt_url: String,
        return_url: String,
        cancel_url: String,
        notify_url: String,
        notify_api_version: String,
        expires_date: Date,
        attachment_urls: [String],
        bank: String,
        bank_id: String,
        payer_name: String,
        payer_email: String,
        personal_identifier: String,
        bank_account_number: String,
        out_of_date_conciliation: Boolean,
        transaction_id: String,
        custom: String,
        responsible_user_email: String,
        send_reminders: Boolean,
        send_email: Boolean,
        payment_method: String,
        conciliation_date: Date
    });
    return {Khipu};
}

module.exports = Schema;
