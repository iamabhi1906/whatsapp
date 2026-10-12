import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// 2. Safely choose between real localStorage or the fallback
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
