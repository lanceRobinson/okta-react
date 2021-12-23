const Airtable = require('airtable')
const qs = require('querystring');

exports.handler = function (context, event, callback) {

    // console.log('event', event)
    // console.log('event.data',event.data)

    const response = new Twilio.Response();

    response.appendHeader('Access-Control-Allow-Origin', '*');
    // response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    // response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    // response.appendHeader('content-type','application/x-www-form-urlencoded')
    //  response.appendHeader('content-type','application/json')

    const base = new Airtable({apiKey: context.airtable_api_key}).base(context.airtable_base_id)

    const {memberId, email, lastName, phoneNumber} = event.data.userProfile

    console.log('From Okta', {memberId, email, lastName, phoneNumber})

    const filter = `{Member ID} = '${memberId}'`

    const fetchRecord = async (memberId) => base('Customers')
        .select({filterByFormula: filter})
        .firstPage()
        .then(records => records[0].fields)
        .catch(e => console.log(e))

    const validateRegistration = async (memberId) => {
        const customer = await fetchRecord(memberId)
        const accountManagerId = customer['Account Manager ID']
        console.log('from Airtable', customer)
        const phone_number = formatPhoneNumber(phoneNumber)
        if (customer['Last Name'] === lastName && customer['Phone Number'] === phone_number && customer['Email'] === email)
            return successValue(accountManagerId)
            // else
        // return simpleErrorValue
        else if (customer['Last Name'] != lastName)
            return errorValue('Last name does not match last name from application')
        else if (customer['Phone Number'] != phone_number)
            return errorValue('Phone number does not match phone number from application')
        else if (customer['Email'] != email)
            return errorValue('Email does not match email from application')
        else
            return errorValue('Unable to locate your Member Record, please try again later')
    }

    validateRegistration(memberId).then(responseValue => {
        const responseJson = JSON.stringify(responseValue)
        console.log('responseJson', responseJson)
        response.setBody(responseJson)
        return callback(null, responseValue)
    })
        .catch(e => {
            console.log(e)
            response.setBody(errorValue('Unable to locate your Member Record, please try again later'))
            return callback(null, response)
        })

}

const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.length === 10)
        return `+1${cleaned}`
    else if (cleaned.length === 11)
        return `+${cleaned}`
    else
        return phoneNumber
}

const successValue = (managerId) => {
    return {
        "commands": [
            {
                "type": "com.okta.action.update",
                "value": {"registration": "ALLOW"}
            },
            {
                "type": "com.okta.user.profile.update",
                "value": {
                    "accountManagerId": managerId
                }
            }
        ]
    }
}

const errorValue = (errorSummary) => {
    return {
        "commands": [
            {
                "type": "com.okta.action.update",
                "value": {"registration": "DENY"}
            }
        ],
        "error": {
            "errorSummary": errorSummary,
            "errorCauses": [
                {
                    "errorSummary": errorSummary,
                    "reason": "INVALID_INFORMATION",
                    "locationType": "body",
                    "location": "data.userProfile.login",
                    "domain": "end-user"
                }
            ]
        }

    }
}

const simpleErrorValue = {
    "commands": [
        {
            "type": "com.okta.action.update",
            "value": {"registration": "DENY"}
        }
    ],
    "error": {
        "errorSummary": "Information does not match application information.  Check your last name, email and phone number.",
        "errorCauses": [
            {
                "errorSummary": "Check your last name, email and phone number.",
                "reason": "INVALID_EMAIL_DOMAIN",
                "locationType": "body",
                "location": "data.userProfile.login",
                "domain": "end-user"
            }
        ]
    }

}