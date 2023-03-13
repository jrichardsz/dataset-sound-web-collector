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

# Settings

Required files should exist before the startup

```
export PRIVATE_KEY_ABSOLUTE_LOCATION=/foo/private.pem
export CERTIFICATE_ABSOLUTE_LOCATION=/foo/cert.pem
export GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_LOCATION=/foo/service_account_cf80c48ca6ef.json
export STORAGE_ABSOLUTE_LOCATION=/foo/dataset
export ML_CLASS_ABITE_GDRIVE_FOLDER_ID=********
export ML_CLASS_DEFENDERE_GDRIVE_FOLDER_ID=*******
export ML_CLASS_IMPETUM_GDRIVE_FOLDER_ID=************
export ML_CLASS_REMEDIUM_GDRIVE_FOLDER_ID=**********
export ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID=*******
```

Files are configured as env variables using base 64:


```
cat /foo/private.pem | base64 -w 0
```

```
export PRIVATE_KEY_ABSOLUTE_CONTENT=****
export CERTIFICATE_ABSOLUTE_CONTENT=****
export GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_CONTENT=****
export STORAGE_ABSOLUTE_LOCATION=/foo/bar/dataset
export ML_CLASS_ABITE_GDRIVE_FOLDER_ID=********
export ML_CLASS_DEFENDERE_GDRIVE_FOLDER_ID=*******
export ML_CLASS_IMPETUM_GDRIVE_FOLDER_ID=************
export ML_CLASS_REMEDIUM_GDRIVE_FOLDER_ID=**********
export ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID=*******
```



```

docker build -t sound-collector .

docker run -d -p 80:80 \
-e PRIVATE_KEY_ABSOLUTE_CONTENT="$PRIVATE_KEY_ABSOLUTE_CONTENT"  \
-e CERTIFICATE_ABSOLUTE_CONTENT="$CERTIFICATE_ABSOLUTE_CONTENT"  \
-e GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_CONTENT="$GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_CONTENT"  \
-e ML_CLASS_ABITE_GDRIVE_FOLDER_ID=******** \
-e ML_CLASS_DEFENDERE_GDRIVE_FOLDER_ID=******* \
-e ML_CLASS_IMPETUM_GDRIVE_FOLDER_ID=************ \
-e ML_CLASS_REMEDIUM_GDRIVE_FOLDER_ID=********** \
-e ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID=******* \
sound-collector

```


https://github.com/finnhvman/matter