import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import toast, { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
