import "./assets/main.css";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import VueConnectWallet from "vue-connect-wallet";
import App from "./App.vue";
import router from "./router";
import { DefaultApolloClient } from "@vue/apollo-composable";
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});
app.use(createPinia());
app.use(router);
app.use(VueConnectWallet);
app.mount("#app");
