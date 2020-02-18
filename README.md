# Portfolio - Uw verzekeringscontracten bij de hand
## Getting started for users
For an Android [demo](https://play.google.com/store/apps/details?id=be.vsoft.portfolio)

For Web PWA version [demo](https://portfolio.rv-services.be)

Your manualy added data is stored as json files inside the localStorage of the browser you are using.

## Getting started for developers
- [Install NodeJS](https://nodejs.org/). Hint: eventually install and use [nvm](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) for easy installing and/or switching between node versions
- Install the ionic CLI globally: `npm install -g ionic`
- Clone this repository: `git clone https://github.com/openSource4Brokers/portfolio58.git`.
- Run `npm install` inside the project root.
- Run `ionic serve` in a terminal from the project root.
- You are allowed to use our dotnet core server for registering and testing.
- Profit. :tada:

## Development Tools used for this app
- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Ionic CLI](https://www.npmjs.com/package/@ionic/cli): `npm i -g @ionic/cli`
- [Angular CLI](https://www.npmjs.com/package/@angular/cli): `npm i -g @angular/cli`

## NPM packages used for this app
- [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core): `npm i @ngx-translate/core`
- [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader): `npm i @ngx-translate/http-loader`
- [vsoftvalidation](https://www.npmjs.com/package/vsoftvalidation): `npm i vsoftvalidation`

- install all packages in one commandline: `npm i @ngx-translate/core @ngx-translate/http-loader vsoftvalidation`

## web.config on older Windows IIS Hosting ONLY!
To prevent errors when the client refreshes a page, building for Microsoft IIS hosting needs installing web.config. Save a copy of this file inside your src directory:
```
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
    </staticContent>
  </system.webServer>
</configuration>
```
Do not forget to mention the location of web.config in angular.json "assets" when building: 
```
"assets": [... , "src/web.config"],
```

BUILD STEPS ANDROID:
ng build --prod
ionic capacitor sync android
ionic capacitor open android