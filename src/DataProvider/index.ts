import { DataProvider } from "react-admin";
import { restDataProviderFactory } from "./rest";
import { fetchUtils } from "ra-core";

const httpClient = fetchUtils.fetchJson;

export const dataProviderFactory = (serverURL: string) => {
  // The fake servers require to generate data, which can take some time.
  // Here we start the server initialization but we don't wait for it to finish
  let dataProviderPromise = getDataProvider(serverURL);

  // Instead we return this proxy which may be called immediately by react-admin if the
  // user is already signed-in. In this case, we simply wait for the dataProvider promise
  // to complete before requesting it the data.
  // If the user isn't signed in, we already started the server initialization while they see
  // the login page. By the time they come back to the admin as a signed-in user,
  // the fake server will be initialized.
  const dataProviderWithGeneratedData = new Proxy(defaultDataProvider, {
    get(_, name) {
      return (resource: string, params: any) => {
        return dataProviderPromise.then((dataProvider) => {
          return dataProvider[name.toString()](resource, params);
        });
      };
    },
  });

  return dataProviderWithGeneratedData;
};

const getDataProvider = async (serverURL: string): Promise<DataProvider> => {
  if (process.env.NODE_ENV === "development") {
    const fakeServerFactory = await import("../fakeServer/index");
    await fakeServerFactory.fakeServerFactory(serverURL);
  }

  return restDataProviderFactory(serverURL);
};

const defaultDataProvider: DataProvider = {
  // @ts-ignore
  create: () => Promise.resolve({ data: { id: 0 } }),
  // @ts-ignore
  delete: () => Promise.resolve({ data: {} }),
  deleteMany: () => Promise.resolve({}),
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getMany: (resource, params) => {
    return httpClient("https://voipapi.comm100dev.io", {
      headers: new Headers({
        "Access-Control-Allow-Origin": "https://voipdash.comm100dev.io",
      }),
    }).then(({ json }) => ({ data: json }));
  },
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  // @ts-ignore
  getOne: () => Promise.resolve({ data: {} }),
  // @ts-ignore
  update: () => Promise.resolve({ data: {} }),
  updateMany: () => Promise.resolve({}),
};
