const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const request = require('request');

router.post('/', function (req, res) {
    res.json({error:'error'})
});

/**************************************************************
 * @ROUTE       - /payment/pay
 * @METHOD      - POST
***************************************************************/

router.post('/pay', function (req, res) {
    if (!req.body.purpose || !req.body.amount || !req.body.email) {
        res.status(400).json({ success: false, message: 'Needed fields mismatch.', statusCode: 400 });
    } else {

        // var headers = { 'X-Api-Key': '6b3cb9aa2e2b4692f0501f3e895f8d67', 'X-Auth-Token': '2999aff050a9e7ee2db8489849427542'  }
        var headers = { 'X-Api-Key': 'test_18b9240a657a34e114e49067b6a', 'X-Auth-Token': 'test_9ae8841732856f68566624ddcc4'}
        const payload = {
            purpose: req.body.purpose,
            amount: req.body.amount,
            buyer_name: req.body.buyer_name,
            redirect_url: 'http://example.com',
            send_email: false,
            email: req.body.email,
            allow_repeatedpayload_payments: false
        }
        console.log(payload);
        request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                let data = JSON.parse(response.body)
                console.log(data.payment_request.longurl)

                res.status(200).json({ success: true, message: 'Initiating payment gateway.', statusCode: 200, url : data.payment_request.longurl});

            }else{
                console.log(error)
            }
        })
    }
});


module.exports = router;
