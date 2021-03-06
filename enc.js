var CryptoJS = require("crypto-js");



let decrypt = (req) => {
		try{
		const SECRET = "000";
		const { Data } = req.body;
		const key = CryptoJS.enc.Utf8.parse(SECRET);
		const iv = CryptoJS.enc.Utf8.parse(SECRET);
		const decrypted = CryptoJS.AES.decrypt(Data, key, {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
	
	}catch(err){
        console.log(err)
		throw err
	}

};
let encrypt = (req) => {
		const encryptedData = encryptCustom(JSON.stringify(req.body));
		const jsString = JSON.stringify({ Data: encryptedData });
	   return jsString ;
};

	let encryptCustom =  (text) => {
		const SECRET = "000";
		const key = CryptoJS.enc.Utf8.parse(SECRET);
		const iv = CryptoJS.enc.Utf8.parse(SECRET);

		const encryptedlogin = CryptoJS.AES.encrypt(
			CryptoJS.enc.Utf8.parse(text),
			key,
			{
				keySize: 128 / 8,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			}
		);

		return encryptedlogin.toString();
};
module.exports = {
    encryptCustom,
    encrypt,
    decrypt
};

