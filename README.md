<h1 align="center">dataset sound web collector</h1>

<p align="center">Simple web to collect sounds and store them into disk and google drive</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/3322836/229368014-6e42de35-31e6-45f7-99a7-4ef5970d83ca.png" width=400>
</p>

---

## Requirements

- nodejs >= 14
- google drive account

## Preparation

To run the hello world sample, follow these steps:

- create a folder in your gdrive account to receive the voice uploads
- inside of this folder create 4 folders with these names:
  - affirmative
  - add_on_complete
  - battle_cruiser_operational
  - goliath_online
- get the id of each these 4 folders and set them into the settings.yaml like this

```
gdriveIdByMlClass:
  affirmative: 70c4c835-d260-4c61-ba77-5774bf2c63a8
  add_on_complete: ebead4a5-e231-479f-a39c-da50451d52fb
  battle_cruiser_operational: 8993f26c-b0da-4d77-9b04-0db213a37657
  goliath_online: d37706fd-b6fc-45fa-9cef-af671505af00
```
- create a project in google cloud web console: https://console.cloud.google.com/apis
- create a service account file in your google account to be able the gdrive api invocations. Follow this https://developers.google.com/workspace/guides/create-credentials#create_a_service_account
- share your 04 folders add created with the service account

<img src=https://user-images.githubusercontent.com/3322836/229037140-e5fcfbdc-78cb-4608-a53a-4877ef526cfb.png width=300>

- store this file somewhere in your machine (not in the git repository)

---

## Start it to be used in a laptop/pc browser

```
npm install
npm run start
```

---

## Start it to be used in a mobile browser

Mobiles browsers needs https. Create the required certificates following this: https://github.com/jrichardsz/dataset-sound-collector/wiki/Create-self-signed-certs-for-https

Export these variables with the location of required files

```
export PRIVATE_KEY_ABSOLUTE_LOCATION=/foo/private.pem
export CERTIFICATE_ABSOLUTE_LOCATION=/foo/cert.pem
export GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_LOCATION=/foo/service_account_cf80c48ca6ef.json
```

> Optional: Follow this https://github.com/jrichardsz/dataset-sound-collector/wiki/Use-files-as-base64 to use string instead file paths


Finally execute

```
npm install
npm run start
```

> Note: To use docker follow this https://github.com/jrichardsz/dataset-sound-collector/wiki/Start-it-with-docker-to-be-used-in-a-mobile-browser

---

## Open the web sound collector

Go to your web browser and open this:

http://localhost:2708/?uuidCampaign=9cb90dfe-1acc-4adc-8857-44f3a9e0f038

You should look something like this:

![image](https://user-images.githubusercontent.com/3322836/229034186-4aca61bd-f959-4842-ac58-d14c3c36607b.png)

Ready to listen the demo and send the recording to your google drive

---

## Technologies & assets

- nodejs
- google drive
- https://github.com/finnhvman/matter
- https://www.fonts4free.net/sword-art-online-font.html

---
## Roadmap

- refactor
- unit tests

---
## Contributors

Thanks goes to these wonderful people :

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>    
  </tbody>
</table>

