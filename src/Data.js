const Airtable = require('airtable');
const qs = require('querystring');
const api_key = 'keyYhqt8vTxg3TZUk'

const base = new Airtable({apiKey: api_key}).base('appPA2dwz8Oxqsp9F');

// export const CreateNewCustomer = ({firstName, lastName, phoneNumber, email}) => console.log(firstName, lastName, phoneNumber, email)

const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g,'')
    if (cleaned.length === 10)
        return `+1${cleaned}`
    else if(cleaned.length ===11)
        return `+${cleaned}`
    else
        return phoneNumber
}

export const CreateNewCustomer = ({firstName, lastName, phoneNumber, email}) => base('Customer').create([
    {
        "fields": {
            "First Name": firstName,
            "Last Name": lastName,
            "Email": email,
            "Phone Number": formatPhoneNumber(phoneNumber),
            "Status": "Unregistered",
        }
    }
]).then(records => records[0])
    .then(newCustomer => acceptApplication(newCustomer))
    .catch(e => console.log(e))


const fetchRecord = (memberId) => {
    base.select({filterByFormula: `FIND(Member ID = '${memberId}')`})
        .then(records => console.log(records.length))
}

const acceptApplication = (newCustomer) => {
    const phoneNumber = newCustomer.get('Phone Number')
    const memberId = newCustomer.get('Member ID')
    const memberPortalUrl = 'okta.com'
    const message = `Congratulations!  Your application to Acme Financial has been approved.  Your Member ID is ${memberId}.
    Please keep this for your records, you will need it to access the member portal for the first time.  
    You can register for the member portal here. ${memberPortalUrl}`
    console.log('sms',phoneNumber,message)
    sendSMS(phoneNumber, message).catch(e => console.log(e))
}

const sendSMS = (phoneNumber, message) => {
    const data = {phoneNumber, message}
    const url = 'https://acmefinancial-9223.twil.io/sendSMS'
    const config ={
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        body: qs.stringify(data)
    }
    fetch(url, config)
        .then(res => console.log(res))
        .catch(e => console.log(e))
}


