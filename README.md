# vincall.portal

vincall.portal is a frontend project mainly using react-admin and TypeScript. It builds the frontend of Vincall Portal. To customize it for your own use, you can refer to the following information and the documentation of react-admin.

Here is a brief description of the project directory:

```bash
src
  ├─Assets # images and icons
  ├─AuthProvider # authProvider of react-admin
  ├─Components # components
  ├─Components # dataProvider of react-admin
  ├─Runtime # runtime
  ├─Helpers # helpers, permissions and context providers
  ├─Layout # layout of UI
  ├─Pages # all pages of the project
  └─StyledComponents # styled React UI component.
```

# Initializing
To install dependencies, run below command in powershell:
  - npm install

By default, we use `frontend.comm100dev.io` as host and `80` as port. So you need to modify your hosts file(C:\Windows\System32\drivers\etc), add `127.0.0.1 frontend.comm100dev.io` in hosts file. You can modify file `.env.development` to set up any host you want. Or just delete the custom configuration, react app will use `localhost:3000` by default.

# Running
To run project in local, run below command in powershell:
  - npm run start

# Modifying configuration
1. Setting Up Proxy
  - You can modify file `setupProxy.js` to set up proxy.

2. Setting Up Domains For APIs
  - You can modify file `EnvConfig.js` to set up custom domain names.

3. Modifying APIs
  There are two recommended ways to modify APIs in vincall.portal. 
  - Modify `dataProvider.ts`, which is the way how you modify APIs in react-admin.
  - Use `customHttpClient` (path: src/DataProvider/customHttpClient.ts) to call APIs.