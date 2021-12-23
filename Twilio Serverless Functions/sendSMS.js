
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {

    console.log('event', event)
    // Here's an example of setting up some TWiML to respond to with this function
    const {message, phoneNumber} = event
    const twilioNumber = context.twilioNumber

    const client = context.getTwilioClient()

    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setBody('Successfully sent SMS')

    return client.messages
        .create({body: message, from: twilioNumber, to: phoneNumber})
        .then(message => response.setBody('Success' + message.sid))
        .then(() => callback(null, response))
        .catch(e => callback(e, null))


};