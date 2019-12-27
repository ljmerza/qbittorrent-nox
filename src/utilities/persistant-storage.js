import store from 'store';


export const storeSaveSlice = (sliceName, sliceState) => {
    store.set(sliceName, sliceState);
}

export const storeGetSlice = sliceName => {
    return store.get(sliceName) || {};
}