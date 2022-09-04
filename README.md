# dataset sound collector

Simple web to collect sounds and store them into disk and google drive

---

# Requirements

- nodejs >= 14

---

# Run

- npm install
- npm run start

Go to http://localhost:2708 and you will see your web page.

---

```
export PRIVATE_KEY_ABSOLUTE_LOCATION=$(pwd)/private.pem
export CERTIFICATE_ABSOLUTE_LOCATION=$(pwd)/cert.pem
export STORAGE_ABSOLUTE_LOCATION=/foo/bar/dataset
export GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_LOCATION='service_account_cf80c48ca6ef.json'
export ML_CLASS_ABITE_GDRIVE_FOLDER_ID=********
export ML_CLASS_DEFENDERE_GDRIVE_FOLDER_ID=*******
export ML_CLASS_IMPETUM_GDRIVE_FOLDER_ID=************
export ML_CLASS_REMEDIUM_GDRIVE_FOLDER_ID=**********
export ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID=*******
```