<template>
  <!-- <div>Landing {{ result }} {{ loading }} {{ error }}</div> -->
  <div>
    <a v-for="(res, i) in result?.getAllUsers" href="#">
      {{ i + 1 }} META_ID: {{ res.metaMaskId }}</a
    >

    <p v-if="!metaMaskInstalled">HEY INSTALL META MASK!</p>
    <p v-else-if="metaMaskInstalled && currentUser.length > 0">
      {{ currentUser }}
    </p>
    <p v-else>MetaMask installed but your are not signed in</p>
    <!-- <ConnectWalletButton :dark="false" class="btn" /> -->
    <button
      @click="
        async () => {
          await wallet.switchAccounts();
        }
      "
    >
      SWITCH
    </button>
    {{ foundResult }}
    {{ err }}
  </div>
</template>

<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "vue";
import "vue-connect-wallet/dist/style.css";
import { ConnectWalletButton, useMetaMaskWallet } from "vue-connect-wallet";

// check if meta mask is installed
let err = ref("");
const wallet = useMetaMaskWallet();

let currentUser = ref("");
const metaMaskInstalled = computed(() => wallet.isMetaMask);
const USER_INFO = gql`
  query GetAllUsers {
    getAllUsers {
      metaMaskId
      id
    }
  }
`;
const foundUser = gql`
  query GetUser($metaMaskId: String!) {
    getUser(metaMaskId: $metaMaskId) {
      id
      metaMaskId
    }
  }
`;
const {
  result: foundResult,
  loading: foundLoading,
  error: foundError,
} = useQuery(foundUser, {
  metaMaskId: currentUser.value,
});

// id - 0xa89651128d2d584b617cf453ae73b18d4839227c
// id - 0xa89651128d2d584b617Cf453AE73b18d4839227C
const { result, loading, error } = useQuery(USER_INFO);

defineComponent({
  components: { ConnectWalletButton },
});
// const data = reactive({ result, loading, error });
const getMetaUser = async () => {
  let currentUserPromise = await wallet.connect();

  currentUser.value = currentUserPromise[0];
};
onBeforeMount(() => {
  if (!wallet.isMetaMask) {
  } else {
  }
  getMetaUser();
});
</script>

<style>
.btn {
  background-color: rgb(215, 74, 243) !important;
  border-radius: 5px !important;
  width: 250px;
  margin: 0 auto;
  font-size: 24px;
}
div {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
a {
  color: black;
  text-decoration: none;
}
</style>
