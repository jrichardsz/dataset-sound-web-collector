# Web Dynamify

![logo](https://raw.githubusercontent.com/wiki/rad-frameworks/web-dynamify/logo-500x214.png)

An easy way to customize your html template.

---

# Requirements

- nodejs >= 8
- Download or create some web page. https://templated.co has free templates ready to use.

---

# Run

- Copy your html template into **web** folder. Your template must have at least the classic **index.html**
- npm install
- npm run dev

Go to http://localhost:2708 and you will see your web page.

---

# Customize template

### 1. Put variables in index.html

Put the following code in any part of your index.html


```
<%= my_var %>
```
A good choice is in <title> tag to learning purposes.


```
<title><%= my_var %></title>
```

This variable syntax is the part of nodejs framework called **EJS**. [Here](https://github.com/mde/ejs/blob/master/docs/syntax.md) more examples with ejs variables.

### 2. create variables in json

**web/index.html** is default associated to **variables/index.json** in variables folder. So in this file **variables/index.json**, create a var called **my_var**

```json
{
  "my_var": "my awesome page"
}
```

If you started with **npm run dev**, just refresh the page and you will see **my awesome page** in the title of your web.

---

# More pages

If you need to add dynamic content to another pages like :

- about.html
- Blog.html
- /form/contact.html

You just need to create its twins **variables** folder but with .json extension :

```
├── web/
│   ├── index.html
│   ├── about.html
│   ├── Blog.html
│   ├── form/
│       ├── contact.html
├── variables/
│   ├── index.json
│   └── about.json
│   └── Blog.json
│   ├── form/
│       ├── contact.json
```

# Security

If you want to protect your prototype, just export these variables before the server start:

```
export ENABLE_SECURITY=true
export AUTH_USER=noelle
export AUTH_PASSWORD=changeme
```

And next time yo access to http://localhost:2708, a prompt will ask your for user and password

# Technologies

- nodejs
- ejs
- html

# Roadmap

- more examples of ejs variables
- external service instead local json

# Contributors

Thanks goes to these wonderful people :

<table>
  <tbody>
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">Richard Leon</a></label>
      <br />
    </td>    
  </tbody>
</table>

# License
Web-Dynamify is open-sourced software licensed under the [MIT license](https://choosealicense.com/licenses/mit/). Frameworks and libraries has it own licenses

Enjoy :)


https://github.com/duketemon/web-speech-recorder
https://gist.github.com/nowucca/5194018
<a href="https://www.flaticon.com/free-icons/microphone" title="microphone icons">Microphone icons created by Freepik - Flaticon</a>
